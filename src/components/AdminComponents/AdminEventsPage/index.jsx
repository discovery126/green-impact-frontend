import { useState, useEffect } from "react";
import s from "./index.module.scss";
import AdminEventService from "../../../http/AdminEventService";
import CityService from "../../../http/CityService";
import { toast } from "react-toastify";

const AdminEventsPage = () => {
  const defaultEvent = {
    id: null,
    title: "",
    description: "",
    event_points: 0,
    start_date: "",
    end_date: "",
    organiser_name: "",
    organiser_phone: "",
    street: "",
    event_code: "",
    house_number: null,
    city_id: null,
  };

  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(defaultEvent);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [cities, setCities] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await AdminEventService.getAllEvents();
      setEvents(response.data.data);
    } catch (error) {
      console.error("Ошибка при загрузке мероприятий:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await CityService.getCities();
      setCities(response.data.data);
    } catch (error) {
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
      console.error("Ошибка при загрузке городов:", error);
    }
  };

  const createEvent = async (event) => {
    try {
      const response = await AdminEventService.createEvent(event);
      if (response.status === 201) {
        toast.success("Мероприятие успешно добавлено");
        fetchEvents();
      }
    } catch (error) {
      if (error.status === 403) toast.error("Вы не админ");
      else if (error.status === 401) toast.error("Вы не авторизованы");
      else if (error.status === 400)
        toast.error(error.response.data.message[0]);
      else {
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
        console.error("Ошибка при создании мероприятия:", error);
      }
    }
  };

  const editEvent = async (event) => {
    try {
      const response = await AdminEventService.editEvent(event);
      if (response.status === 200) {
        toast.success("Мероприятие успешно изменено");
        fetchEvents();
        setTimeout(() => {
          const elem = document.querySelector(
            `[data-event-id='${currentEvent.id}']`
          );
          if (elem) elem.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      }
      resetCurrentEvent();
      setIsFormVisible(false);
    } catch (error) {
      if (error.status === 403) toast.error("Вы не админ");
      else if (error.status === 401) toast.error("Вы не авторизованы");
      else if (error.status === 400)
        toast.error(error.response.data.message[0]);
      else {
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
        console.error("Ошибка при изменении мероприятия:", error);
      }
    }
  };

  const removeEvent = async (eventId) => {
    try {
      const response = await AdminEventService.removeEvent(eventId);
      if (response.status === 204) {
        toast.success("Мероприятие успешно удалено");
        fetchEvents();
      }
    } catch (error) {
      if (error.status === 403) toast.error("Вы не админ");
      else if (error.status === 401) toast.error("Вы не авторизованы");
      else if (error.status === 400)
        toast.error(error.response.data.message[0]);
      else {
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
        console.error("Ошибка при удалении мероприятия:", error);
      }
    }
  };

  const resetCurrentEvent = () => {
    setCurrentEvent(defaultEvent);
  };

  const handleAddEvent = () => {
    const newEvent = {
      title: currentEvent.title,
      description: currentEvent.description,
      event_points: currentEvent.event_points,
      start_date: currentEvent.start_date,
      end_date: currentEvent.end_date,
      organiser_name: currentEvent.organiser_name,
      organiser_phone: currentEvent.organiser_phone,
      event_code: currentEvent.event_code,
      street: currentEvent.street,
      house_number: currentEvent.house_number,
      city_id: currentEvent.city_id,
    };
    createEvent(newEvent);
  };

  const handleSaveEvent = () => {
    const updatedEvent = {
      id: currentEvent.id,
      title: currentEvent.title,
      description: currentEvent.description,
      event_points: currentEvent.event_points,
      start_date: currentEvent.start_date,
      end_date: currentEvent.end_date,
      organiser_name: currentEvent.organiser_name,
      organiser_phone: currentEvent.organiser_phone,
      event_code: currentEvent.event_code,
      street: currentEvent.street,
      house_number: currentEvent.house_number,
      city_id: currentEvent.city_id,
    };
    editEvent(updatedEvent);
  };

  const handleEditEvent = (event) => {
    setCurrentEvent({
      id: event.id,
      title: event.title,
      description: event.description,
      event_points: event.event_points,
      start_date: event.start_date,
      end_date: event.end_date,
      organiser_name: event.organiser_name,
      organiser_phone: event.organiser_phone,
      event_code: event.event_code,
      street: event.street,
      house_number: event.house_number,
      city_id: event.city.id,
    });
    setIsFormVisible(true);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Вы уверены, что хотите удалить мероприятие?")) {
      removeEvent(eventId);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchCities();
  }, []);

  return (
    <div className={s["events-page"]}>
      <button onClick={() => setIsFormVisible(true)} className={s["button"]}>
        Добавить мероприятие
      </button>

      {isFormVisible && (
        <div className={s["form-panel"]}>
          <h2>
            {currentEvent.id
              ? "Редактировать мероприятие"
              : "Добавить мероприятие"}
          </h2>

          <input
            type="text"
            value={currentEvent.title}
            onChange={(e) =>
              setCurrentEvent({ ...currentEvent, title: e.target.value })
            }
            placeholder="Название мероприятия"
            className={s["input"]}
          />

          <textarea
            value={currentEvent.description}
            onChange={(e) =>
              setCurrentEvent({ ...currentEvent, description: e.target.value })
            }
            placeholder="Описание мероприятия"
            className={s["textarea"]}
          />

          <input
            type="number"
            value={currentEvent.event_points}
            onChange={(e) =>
              setCurrentEvent({
                ...currentEvent,
                event_points: Number(e.target.value),
              })
            }
            placeholder="Баллы мероприятия"
            className={s["input"]}
            min={0}
          />

          <label>Дата начала</label>
          <input
            type="datetime-local"
            value={currentEvent.start_date}
            onChange={(e) =>
              setCurrentEvent({ ...currentEvent, start_date: e.target.value })
            }
            className={s["input"]}
          />

          <label>Дата окончания</label>
          <input
            type="datetime-local"
            value={currentEvent.end_date}
            onChange={(e) =>
              setCurrentEvent({ ...currentEvent, end_date: e.target.value })
            }
            className={s["input"]}
          />
          <input
            type="text"
            value={currentEvent.event_code}
            onChange={(e) =>
              setCurrentEvent({ ...currentEvent, event_code: e.target.value })
            }
            placeholder="Код мероприятия"
            className={s["input"]}
          />
          <input
            type="text"
            value={currentEvent.organiser_name}
            onChange={(e) =>
              setCurrentEvent({
                ...currentEvent,
                organiser_name: e.target.value,
              })
            }
            placeholder="Имя организатора"
            className={s["input"]}
          />

          <input
            type="text"
            value={currentEvent.organiser_phone}
            onChange={(e) =>
              setCurrentEvent({
                ...currentEvent,
                organiser_phone: e.target.value,
              })
            }
            placeholder="Телефон организатора"
            className={s["input"]}
          />

          <input
            type="text"
            value={currentEvent.street}
            onChange={(e) =>
              setCurrentEvent({ ...currentEvent, street: e.target.value })
            }
            placeholder="Улица"
            className={s["input"]}
          />

          <input
            type="number"
            value={currentEvent.house_number ?? ""}
            onChange={(e) =>
              setCurrentEvent({
                ...currentEvent,
                house_number: e.target.value ? Number(e.target.value) : null,
              })
            }
            placeholder="Номер дома"
            className={s["input"]}
            min={0}
          />
          <select
            value={currentEvent.city_id || ""}
            onChange={(e) => {
              const selectedId = e.target.value ? Number(e.target.value) : null;
              setCurrentEvent({
                ...currentEvent,
                city_id: selectedId,
              });
            }}
            className={s["select"]}
          >
            <option value="">Выберите город</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name_city}
              </option>
            ))}
          </select>

          <div className={s["buttons-row"]}>
            {currentEvent.id ? (
              <button onClick={handleSaveEvent} className={s["button"]}>
                Сохранить
              </button>
            ) : (
              <button onClick={handleAddEvent} className={s["button"]}>
                Добавить
              </button>
            )}
            <button
              onClick={() => {
                setIsFormVisible(false);
                resetCurrentEvent();
              }}
              className={s["button"]}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
      <h2>Список мероприятий</h2>
      <div className={s["events-list"]}>
        {events.length === 0 && <p>Нет мероприятий</p>}
        {events.map((event) => (
          <div
            key={event.id}
            className={s["event-item"]}
            data-event-id={event.id}
          >
            <h3>
              <strong>{event.title}</strong>
            </h3>
            <p>{event.description}</p>
            <p>Баллы: {event.event_points}</p>
            <p>
              Даты:{" "}
              {new Date(event.start_date).toLocaleString("ru-RU", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              —{" "}
              {new Date(event.end_date).toLocaleString("ru-RU", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>Статус: {event.status}</p>
            <p>
              Организатор: {event.organiser_name}, тел: {event.organiser_phone}
            </p>
            <p>Код мероприятия: {event.event_code}</p>
            <p>
              Адрес: {event.street} {event.house_number}, город:{" "}
              {event.city?.name_city || " "}
            </p>
            <p>Долгота {event.longitude}</p>
            <p>Широта {event.latitude}</p>
            {event.status !== "COMPLETED" && (
              <>
                <button
                  onClick={() => handleEditEvent(event)}
                  className={s["edit-button"]}
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className={s["delete-button"]}
                >
                  Удалить
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEventsPage;
