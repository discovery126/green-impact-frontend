import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import s from "./index.module.scss";
import { concatAddress, formatDate } from "../../util/UtilService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import EventService from "../../http/EventService";
import axios from "axios";

const EventModal = ({
  event,
  modalEventActive,
  setModalEventActive,
  refreshEvents = () => {},
}) => {
  const [success, setSuccess] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [eventCode, setEventCode] = useState("");
  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (event && auth) {
      fetchSuccess();
      fetchConfirmed();
    }
  }, [auth, event]);

  const fetchSuccess = async () => {
    const result = await isRegisteredUserEvent(event);
    setSuccess(result);
  };
  const fetchConfirmed = async () => {
    const result = await isConfirmedUserEvent(event);
    setConfirmed(result);
  };

  const isConfirmedUserEvent = async (event) => {
    try {
      const response = await EventService.checkConfirmed(event.id);
      return response.data.data.success;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Запрос отменён:", error.message);
        return;
      }
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
    }
  };
  const isRegisteredUserEvent = async (event) => {
    try {
      const response = await EventService.checkRegistered(event.id);
      return response.data.data.success;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Запрос отменён:", error.message);
        return;
      }
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
    }
  };

  const handleSignUpEvent = async () => {
    try {
      if (!success) {
        await EventService.registerEvent(event.id);
        refreshEvents();
        setModalEventActive(false);
        toast.success("Вы успешно записались на мероприятие");
      } else {
        toast.error("Вы уже зарегистрированы на это мероприятие");
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Запрос отменён:", error.message);
        return;
      }
      if (error.status === 409 || error.status === 400) {
        toast.error(error.response.data.message[0]);
      } else {
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
        console.error("Ошибка при записи на мероприятие:", error);
      }
    }
  };

  const handleConfirmEvent = async (eventCode) => {
    if (!eventCode || eventCode.trim() === "") {
      toast.error("Пожалуйста, введите код подтверждения");
      return;
    }

    try {
      if (success) {
        await EventService.confirmEvent(event.id, eventCode);
        refreshEvents();
        setModalEventActive(false);
        toast.success(
          `Вы подтвердили своё присутствие и получили ${event.event_points}`
        );
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Запрос отменён:", error.message);
        return;
      }
      if (error.response?.status === 400) {
        toast.error(error.response.data.message[0]);
      } else {
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
        console.error("Ошибка при записи на мероприятие:", error);
      }
    }
  };

  const showRegisterButton = () => {
    if (
      auth &&
      success &&
      (event.status === "SCHEDULED" || event.status === "COMPLETED")
    ) {
      return;
    } else if (auth && success && event.status === "ACTIVE" && !confirmed) {
      return (
        <div className={s["event-modal__confirm-wrapper"]}>
          <input
            type="text"
            placeholder="Введите код подтверждения"
            value={eventCode}
            onChange={(e) => setEventCode(e.target.value)}
            className={s["event-modal__input"]}
          />
          <button
            className={s["event-modal__btn"]}
            onClick={() => handleConfirmEvent(eventCode)}
          >
            Подтвердить участие
          </button>
        </div>
      );
    } else if (auth && success && event.status === "ACTIVE" && confirmed) {
      return (
        <div className={s["event-modal__message"]}>
          Вы уже подтвердили участие на это мероприятие
        </div>
      );
    } else if (auth && !success) {
      return (
        <button
          className={s["event-modal__btn"]}
          onClick={() => {
            handleSignUpEvent(event.id);
            setModalEventActive(false);
          }}
        >
          Зарегистрироваться на мероприятие
        </button>
      );
    } else if (auth && success) {
      return (
        <div className={s["event-modal__message"]}>
          Вы уже зарегистрированны на это мероприятие
        </div>
      );
    } else {
      return (
        <div className={s["event-modal__message"]}>
          Чтобы записаться на мероприятие, нужно авторизоваться
        </div>
      );
    }
  };

  if (!event) return null;

  return (
    <Modal active={modalEventActive} setActive={setModalEventActive}>
      <div className={s["event-modal"]}>
        <div className={s["event-modal__title"]}>{event.title}</div>
        <div
          className={`${s["event-card__event-mark"]} ${
            event.status === "SCHEDULED" ? s["sheduled"] : ""
          }`}
        />
        <div className={s["event-modal__address"]}>{concatAddress(event)}</div>
        <div className={s["event-modal__date"]}>{formatDate(event)}</div>
        <div className={s["event-modal__organizer-name"]}>
          Организатор: {event.organiser_name}
        </div>
        <div className={s["event-modal__organizer-number"]}>
          Телефон: {event.organiser_phone}
        </div>
        <div className={s["event-modal__description"]}>{event.description}</div>
        {showRegisterButton()}
      </div>
    </Modal>
  );
};

export default EventModal;
