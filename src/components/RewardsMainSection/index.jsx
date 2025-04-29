import { useEffect, useState } from "react";
import s from "./index.module.scss";
import UserService from "../../http/UserService";
import RewardService from "../../http/RewardService";
import { useSelector } from "react-redux";
import Rewards from "../Rewards";
import { toast } from "react-toastify";
import axios from "axios";

const TasksMainSection = () => {
  const [user, setUser] = useState(null);
  const [rewards, setRewards] = useState([]);
  const { auth } = useSelector((state) => state.auth);

  const getUser = async () => {
    try {
      const response = await UserService.getUser();
      setUser(response.data.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Запрос отменён:", error.message);
        return;
      }
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
      console.log("Ошибка получения наград: ", error);
    }
  };

  const getRewards = async () => {
    try {
      const response = await RewardService.getRewards();
      setRewards(response.data.data);
    } catch (error) {
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
      console.log("Ошибка получения наград: ", error);
    }
  };
  const refreshRewards = async () => {
    if (auth) {
      getUser();
    }
    getRewards();
  };
  useEffect(() => {
    refreshRewards();
  }, [auth]);

  return (
    <>
      <div className={s["reward-section"]}>
        <div className="container">
          {user && (
            <div className={s["reward-section__user-points"]}>
              Мои баллы : {user.points}
            </div>
          )}
          <Rewards rewards={rewards} refreshRewards={refreshRewards} />
        </div>
      </div>
    </>
  );
};

export default TasksMainSection;
