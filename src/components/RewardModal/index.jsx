import React from "react";
import Modal from "../Modal";
import s from "./index.module.scss";
import { formatPoints } from "../../util/UtilService";
import RewardService from "../../http/RewardService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const RewardModal = ({
  reward,
  modalRewardActive,
  setModalRewardActive,
  refreshRewards = () => {},
  userReward = null,
}) => {
  const { auth } = useSelector((state) => state.auth);
  const handleExchangeReward = async () => {
    try {
      console.log(reward.id);
      await RewardService.claimReward(reward.id);
      refreshRewards();
      setModalRewardActive(false);
      toast.success("Награда получена");
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
  const showContent = () => {
    if (userReward) {
      return (
        <>
          <div className={s["reward-modal"]}>
            <div className={s["reward-modal__title"]}>{reward.title}</div>
            <div className={s["reward-modal__description"]}>
              {reward.description}
            </div>
            <div className={s["reward-modal__promo-code"]}>
              {userReward.promo_code}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className={s["reward-modal"]}>
          <div className={s["reward-modal__title"]}>{reward.title}</div>
          <div className={s["reward-modal__description"]}>
            {reward.description}
          </div>
          <div className={s["reward-modal__cost"]}>
            {formatPoints(reward.cost_points)}
          </div>

          {auth ? (
            <button
              className={s["reward-modal__btn"]}
              onClick={() => handleExchangeReward()}
            >
              Обменять
            </button>
          ) : (
            <div className={s["reward-modal__message"]}>
              Чтобы обменивать награды, нужно авторизоваться
            </div>
          )}
        </div>
      );
    }
  };
  if (!reward) return null;
  return (
    <Modal active={modalRewardActive} setActive={setModalRewardActive}>
      {showContent()}
    </Modal>
  );
};

export default RewardModal;
