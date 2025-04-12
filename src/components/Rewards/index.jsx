import { useState } from "react";
import { formatPoints } from "../../util/UtilService";
import s from "./index.module.scss";
import RewardModal from "../RewardModal";
const Rewards = ({ rewards, refreshRewards }) => {
  const [modalRewardActive, setModalRewardActive] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  return (
    <>
      <RewardModal
        reward={selectedReward}
        modalRewardActive={modalRewardActive}
        setModalRewardActive={setModalRewardActive}
        refreshRewards={refreshRewards}
      />
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
                {reward.category.name_category}
              </span>
              <div className={s["reward-card__title"]}>{reward.title}</div>
              <span className={s["reward-card__cost"]}>
                {formatPoints(reward.cost_points)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Rewards;
