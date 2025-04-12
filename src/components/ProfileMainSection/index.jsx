import React, { useEffect, useState } from "react";
import s from "./index.module.scss";
import UserService from "../../http/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Events from "../Events";

const ProfileMainSection = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [user, setUser] = useState("");
  const [userEvents, setUserEvents] = useState([]);
  const { auth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const getUserInfo = async () => {
    try {
      const response = await UserService.getUser();
      setUser(response.data.data);
    } catch (error) {
      if (error.status === 400) {
        toast.error(error.response.data.message[0]);
      } else if (error.status === 401) {
        toast.error("Вы не авторизованы");
      } else {
        console.log("Ошибка" + error);
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
      }
    }
  };
  const getUserEvent = async () => {
    try {
      const response = await UserService.getUserEvents();
      setUserEvents(response.data.data);
    } catch (error) {
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
    }
  };
  const refreshUserProfileMain = () => {
    getUserInfo();
    getUserEvent();
  };
  useEffect(() => {
    if (!auth) {
      navigate("/");
    } else {
      refreshUserProfileMain();
    }
  }, [auth]);

  return (
    <div className={s["outer-wrapper"]}>
      <div className="container">
        <div className={s["profile-container"]}>
          <div className={s["profile-tabs"]}>
            <div
              className={s["slider"]}
              style={{
                left:
                  activeTab === "info"
                    ? "0%"
                    : activeTab === "rewards"
                    ? "33.3333%"
                    : "66.6666%",
              }}
            />
            <button
              className={activeTab === "info" ? s.active : ""}
              onClick={() => setActiveTab("info")}
            >
              Личные данные
            </button>
            <button
              className={activeTab === "rewards" ? s.active : ""}
              onClick={() => setActiveTab("rewards")}
            >
              Награды
            </button>
            <button
              className={activeTab === "actions" ? s.active : ""}
              onClick={() => setActiveTab("actions")}
            >
              Операции
            </button>
          </div>

          {activeTab === "info" && (
            <div>
              <div className={s["profile-main"]}>
                <h2>Основная информация</h2>
                <p>
                  <strong>Отображаемое имя:</strong> {user.display_name}
                </p>
                <p>
                  <strong>Город:</strong> {user.city?.name_city}
                </p>
                <p>
                  <strong>Баланс:</strong> {user.points}
                </p>
              </div>
              <div className={s["profile-events"]}>
                <h2>Мои мероприятия</h2>
                {userEvents.length > 0 ? (
                  <Events
                    events={userEvents.map((userEvent) => userEvent.event)}
                    readOnly={true}
                    refreshEvents={refreshUserProfileMain}
                  />
                ) : (
                  <p>Вы пока не записаны ни на одно мероприятие.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileMainSection;
