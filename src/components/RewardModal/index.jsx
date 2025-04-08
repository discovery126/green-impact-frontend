import React from "react";
import Modal from "../Modal";
import s from "./index.module.scss";
import { formatPoints } from "../../util/UtilService";
import RewardService from "../../http/RewardService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const RewardModal = ({
  reward,
  modalRewardActive,
  setModalRewardActive,
  refreshRewards,
}) => {
  const { auth } = useSelector((state) => state.auth);
  const handleExchangeReward = async () => {
    try {
      console.log(reward.id);
      await RewardService.claimReward(reward.id);
      await refreshRewards();
      setModalRewardActive(false);
      toast.success("Награда получена");
    } catch (error) {
      console.log(error.status === 400);
      if (error.status === 400) {
        toast.error(error.response.data["error_details"][0]);
      } else if (error.status === 401) {
        toast.error("Вы не авторизованы");
      } else {
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
      }
    }
  };

  if (!reward) return null;
  return (
    <Modal active={modalRewardActive} setActive={setModalRewardActive}>
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
    </Modal>
  );
};

export default RewardModal;
