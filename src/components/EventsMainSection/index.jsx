import React, { useEffect, useState } from "react";
import s from "./index.module.scss";
import EventService from "../../http/EventService";
import EventModal from "../EventModal";
import { toast } from "react-toastify";
import { concatAddress, formatDate } from "../../util/UtilService";
import EventMap from "../EventMap";

const EventsMainSection = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalEventActive, setModalEventActive] = useState(false);
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem("viewMode") || "list";
  });

  const fetchEvents = async () => {
    try {
      const response = await EventService.getAllEvents();
      setEvents(response.data.data);
    } catch (error) {
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
      console.error("Ошибка при отправке задания:", error);
    }
  };
  const refreshEvents = async () => {
    await fetchEvents();
  };
  useEffect(() => {
    refreshEvents();
  }, []);

  return (
    <>
      <EventModal
        event={selectedEvent}
        modalEventActive={modalEventActive}
        setModalEventActive={setModalEventActive}
        refreshEvents={refreshEvents}
      />
      <div className={s["events-main-wrapper"]}>
        <div className="container">
          <div className={s["view-buttons-container"]}>
            <button
              className={`${s["view-button"]} ${
                viewMode === "list" ? s["active"] : ""
              }`}
              onClick={() => {
                setViewMode("list");
                localStorage.setItem("viewMode", "list");
              }}
            >
              Список
            </button>
            <button
              className={`${s["view-button"]} ${
                viewMode === "map" ? s["active"] : ""
              }`}
              onClick={() => {
                setViewMode("map");
                localStorage.setItem("viewMode", "map");
              }}
            >
              Карта
            </button>
          </div>
          {viewMode === "list" ? (
            <div className={s["event-cards-container"]}>
              {events.map((event) => (
                <div
                  key={event.id}
                  className={s["event-card"]}
                  onClick={() => console.log("Открыть подробнее", event.id)}
                >
                  <h3 className={s["event-card__title"]}>{event.title}</h3>
                  <div
                    className={`${s["event-card__mark"]} ${
                      event.status === "SCHEDULED" ? s["sheduled"] : ""
                    }`}
                  />
                  <p className={s["event-card__address"]}>
                    {concatAddress(event)}
                  </p>
                  <p className={s["event-card__date"]}> {formatDate(event)}</p>
                  <button
                    className={s["event-card__details-button"]}
                    onClick={() => {
                      setSelectedEvent(event);
                      setModalEventActive(true);
                    }}
                  >
                    Подробнее
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <>
              <EventMap events={events} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EventsMainSection;
