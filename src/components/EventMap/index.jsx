import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { concatAddress, formatDate } from "../../util/UtilService";
import s from "./index.module.scss";
import { toast } from "react-toastify";
import CityService from "../../http/CityService";
import MapSerivce from "../../http/MapService";

const EventMap = ({ events }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [route, setRoute] = useState([]);
  const [center, setCenter] = useState(null);
  const [profile, setProfile] = useState("foot");
  const [defaultCity, setDefaultCity] = useState(null);

  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  const getCenter = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = [latitude, longitude];
          setUserLocation(location);
        },
        async (error) => {
          console.error("Ошибка получения местоположения:", error);
          try {
            const response = await CityService.getCities();
            const cityList = response.data.data;
            if (cityList.length > 0) {
              const defaultCity = cityList[0];
              setDefaultCity(defaultCity);
            }
          } catch (error) {
            toast.error("Не удается подключиться к серверу. Попробуйте позже.");
            console.error("Ошибка при получении списка городов:", error);
          }
        }
      );
    } else {
      try {
        const response = await CityService.getCities();
        const cityList = response.data.data;
        if (cityList.length > 0) {
          const defaultCity = cityList[0];
          setDefaultCity(defaultCity);
        }
      } catch (error) {
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
        console.error("Ошибка при получении списка городов:", error);
      }
    }
  };

  const fetchRoute = async (start, end) => {
    try {
      const response = await MapSerivce.getRoute(profile, start, end);
      if (response.data.routes.length > 0) {
        setRoute(
          response.data.routes[0].geometry.coordinates.map(([lng, lat]) => [
            lat,
            lng,
          ])
        );
      } else {
        console.log("Маршрут не найден.");
        toast.error("Маршрут не найден.");
      }
    } catch (error) {
      console.error("Ошибка при построении маршрута:", error);
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
    }
  };

  const handleRouteButtonClick = (eventLocation) => {
    if (!userLocation) {
      toast.error(
        "Чтобы построить маршрут, нужно разрешить определение местоположения."
      );
      return;
    }
    fetchRoute(userLocation, eventLocation);
  };

  useEffect(() => {
    getCenter();
  }, []);

  useEffect(() => {
    if (userLocation) {
      setCenter(userLocation);
    } else if (defaultCity) {
      setCenter([defaultCity.latitude, defaultCity.longitude]);
    }
  }, [userLocation, defaultCity]);

  if (!center) return <div>Загрузка карты...</div>;

  return (
    <div>
      <MapContainer
        className={s["map-container"]}
        center={center}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {userLocation && (
          <Marker position={userLocation} icon={redIcon}>
            <Popup>Вы находитесь здесь!</Popup>
          </Marker>
        )}

        {events.map((event) => (
          <Marker key={event.id} position={[event.latitude, event.longitude]}>
            <Popup>
              <div className={s.popup}>
                <h3>{event.title}</h3>
                <p>
                  <strong>Дата:</strong> {formatDate(event)}
                </p>
                <p>
                  <strong>Место:</strong> {concatAddress(event)}
                </p>
                <p>
                  <strong>Организатор:</strong> {event.organiser_name}
                </p>
                <p>
                  <strong>Описание:</strong> {event.description}
                </p>
                <select
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  className={s["select-profile"]}
                >
                  <option value="foot">Пешком</option>
                  <option value="driving">На машине</option>
                </select>
                <button
                  className={s.routeBtn}
                  onClick={() =>
                    handleRouteButtonClick([event.latitude, event.longitude])
                  }
                >
                  Построить маршрут
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default EventMap;
