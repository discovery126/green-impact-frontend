import { useState } from "react";
import { concatAddress, formatDate } from "../../util/UtilService";
import EventModal from "../EventModal";
import s from "./index.module.scss";
const Events = ({ events, refreshEvents = () => {}}) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalEventActive, setModalEventActive] = useState(false);
  return (
    <>
      <EventModal
        event={selectedEvent}
        modalEventActive={modalEventActive}
        setModalEventActive={setModalEventActive}
        refreshEvents={refreshEvents}
      />
      <div className={s["event-main-container"]}>
        <div className={s["event-cards-container"]}>
          {events.map((event) => (
            <div key={event.id} className={s["event-card"]}>
              <div className={s["event-card__header"]}>
                <h3 className={s["event-card__title"]}>{event.title}</h3>
                <div
                  className={`${s["event-card__mark"]} ${
                    event.status === "SCHEDULED"
                      ? s["sheduled"]
                      : event.status === "ACTIVE"
                      ? s["active"]
                      : s["completed"]
                  }`}
                />
              </div>
              <p className={s["event-card__address"]}>{concatAddress(event)}</p>
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
      </div>
    </>
  );
};
export default Events;
