import { useState } from "react";
import s from "./index.module.scss";
import RewardModal from "../RewardModal";

const UserRewards = ({ userRewards }) => {
  const [modalUserRewardActive, setModalUserRewardActive] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [selectedUserReward, setSelectedUserReward] = useState(null);
  return (
    <>
      <RewardModal
        reward={selectedReward}
        modalRewardActive={modalUserRewardActive}
        setModalRewardActive={setModalUserRewardActive}
        userReward={selectedUserReward}
      />
      <div className={s["user-rewards-content"]}>
        <div className={s["user-rewards-cards"]}>
          {userRewards.map((userReward) => (
            <div
              key={userReward.id}
              className={s["user-reward-card"]}
              onClick={() => {
                setSelectedReward(userReward.reward);
                setSelectedUserReward(userReward);
                setModalUserRewardActive(true);
              }}
            >
              <span className={s["user-reward-card__category"]}>
                {userReward.reward.category.name_category}
              </span>
              <div className={s["user-reward-card__title"]}>
                {userReward.reward.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default UserRewards;
