import React, { useEffect, useState } from "react";
import s from "./index.module.scss";
import EventService from "../../http/EventService";
import { toast } from "react-toastify";
import EventMap from "../EventMap";
import Events from "../Events";

const EventsMainSection = () => {
  const [events, setEvents] = useState([]);
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
            <>
              <Events events={events} refreshEvents={refreshEvents} />
            </>
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
