import { useEffect, useState } from "react";
import s from "./index.module.scss";
import UserService from "../../http/UserService";
import RewardService from "../../http/RewardService";
import { formatPoints } from "../../util/UtilService";
import RewardModal from "../RewardModal/";
import { useSelector } from "react-redux";
const TasksMainSection = () => {
  const [user, setUser] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [modalRewardActive, setModalRewardActive] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const { auth } = useSelector((state) => state.auth);

  const getUser = async () => {
    try {
      const response = await UserService.getUser();
      setUser(response.data);
    } catch (error) {
      if (error.status === 401) {
        toast.error("Вы не авторизованы");
      }
      console.log("Ошибка " + error);
    }
  };

  const getRewards = async () => {
    try {
      const response = await RewardService.getRewards();
      setRewards(response.data);
    } catch (error) {
      if (error.status === 401) {
        toast.error("Вы не авторизованы");
      }
      console.log("Ошибка получения наград: " + error);
    }
  };
  const refreshRewards = async () => {
    getUser();
    getRewards();
  };
  useEffect(() => {
    refreshRewards();
  }, [auth]);

  return (
    <>
      <RewardModal
        reward={selectedReward}
        modalRewardActive={modalRewardActive}
        setModalRewardActive={setModalRewardActive}
        refreshRewards={refreshRewards}
      />
      <div className={s["reward-section"]}>
        <div className="container">
          {user && (
            <div className={s["reward-section__user-points"]}>
              Мои баллы : {user.points}
            </div>
          )}
          <div className={s["rewards-content"]}>
            <div className={s["rewards-cards"]}>
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  className={s["reward-card"]}
                  onClick={() => {
                    setSelectedReward(reward);
                    setModalRewardActive(true);
                  }}
                >
                  <span className={s["reward-card__category"]}>
                    {reward.category.nameCategory}
                  </span>
                  <div className={s["reward-card__title"]}>{reward.title}</div>
                  <span className={s["reward-card__cost"]}>
                    {formatPoints(reward.cost_points)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TasksMainSection;
