import React, { useEffect, useState } from "react";
import s from "./index.module.scss";
import UserService from "../../http/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Events from "../Events";
import UserRewards from "../UserRewards";
import { SpentRewards, CompletedTasks } from "../ActionCards";

const ProfileMainSection = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [user, setUser] = useState("");
  const [userEvents, setUserEvents] = useState([]);
  const [userRewards, setUserRewards] = useState([]);
  const [userCompletedTasks, setUserCompletedTasks] = useState([]);
  const { auth } = useSelector((state) => state.auth);
  const [activeOperationType, setActiveOperationType] = useState("received");
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await UserService.getUser();
      setUser(response.data.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Запрос отменён:", error.message);
        return;
      }
      if (error.status === 400) {
        toast.error(error.response.data.message[0]);
      } else {
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
      }
    }
  };
  const getUserEvents = async () => {
    try {
      const response = await UserService.getUserEvents();
      setUserEvents(response.data.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Запрос отменён:", error.message);
        return;
      }
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
    }
  };
  const getUserRewards = async () => {
    try {
      const response = await UserService.getUserRewards();
      setUserRewards(response.data.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Запрос отменён:", error.message);
        return;
      }
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
    }
  };
  const getUserCompletedTasks = async () => {
    try {
      const response = await UserService.getUserCompletedTasks();
      setUserCompletedTasks(response.data.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Запрос отменён:", error.message);
        return;
      }
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
    }
  };
  const refreshUserProfileMain = () => {
    getUserInfo();
    getUserEvents();
  };

  useEffect(() => {
    if (!auth) {
      navigate("/");
    } else {
      refreshUserProfileMain();
      getUserRewards();
      getUserCompletedTasks();
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
          {activeTab === "rewards" && (
            <>
              {userRewards.length === 0 ? (
                <p className={s["no-user-rewards-message"]}>
                  У вас пока нет наград. Но это легко исправить!
                </p>
              ) : (
                <div className={s["profile-rewards"]}>
                  <UserRewards userRewards={userRewards} />
                </div>
              )}
            </>
          )}
          {activeTab === "actions" && (
            <div className={s["profile-actions"]}>
              <div className={s["action-tabs"]}>
                <button
                  className={`${s["action-tab"]} ${
                    activeOperationType === "received" ? s.active : ""
                  }`}
                  onClick={() => setActiveOperationType("received")}
                >
                  Получение
                </button>
                <button
                  className={`${s["action-tab"]} ${
                    activeOperationType === "spent" ? s.active : ""
                  }`}
                  onClick={() => setActiveOperationType("spent")}
                >
                  Траты
                </button>
              </div>

              {activeOperationType === "received" &&
                (userCompletedTasks.length === 0 ? (
                  <div className={s["no-operation-completed-message"]}>
                    У вас пока нет выполненных заданий
                  </div>
                ) : (
                  <CompletedTasks userCompletedTasks={userCompletedTasks} />
                ))}

              {activeOperationType === "spent" &&
                (userRewards.length === 0 ? (
                  <div className={s["no-operation-spent-message"]}>
                    Вы пока не тратили баллы на награды
                  </div>
                ) : (
                  <SpentRewards redeemedRewards={userRewards} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileMainSection;
