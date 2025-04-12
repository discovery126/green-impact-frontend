import s from "./index.module.scss";

const CompletedTasks = ({ userCompletedTasks }) => {
  const statusMap = {
    PENDING: "На проверке",
    CONFIRMED: "Выполнено",
    REJECTED: "Отклонено",
  };
  return (
    <div className={s["task-cards-container"]}>
      {userCompletedTasks.map((completedTask) => (
        <div key={completedTask.id} className={s["task-card"]}>
          <div className={s["task-card__header"]}>
            <h3 className={s["task-card__title"]}>
              {completedTask.task.title}
            </h3>
            <span
              className={`${s["task-card__status"]} ${
                s[`status-${completedTask.status.toLowerCase()}`]
              }`}
            >
              {statusMap[completedTask.status] || "Неизвестен"}
            </span>
          </div>
          <div className={s["task-card__info"]}>
            <p className={s["task-card__points"]}>
              Баллов: {completedTask.task.points}
            </p>
            <p className={s["task-card__date"]}>
              Дата выполнения:{" "}
              {new Date(completedTask.completed_at).toLocaleString("ru-RU", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const SpentRewards = ({ redeemedRewards }) => {
  const statusMap = {
    REDEEMED: "Получено",
    PENDING: "Ожидает",
    CANCELLED: "Отменено",
  };

  return (
    <div className={s["task-cards-container"]}>
      {redeemedRewards.map((reward) => (
        <div key={reward.id} className={s["task-card"]}>
          <div className={s["task-card__header"]}>
            <h3 className={s["task-card__title"]}>{reward.reward.title}</h3>
            <span
              className={`${s["task-card__status"]} ${
                s[`status-${reward.status.toLowerCase()}`]
              }`}
            >
              {statusMap[reward.status] || "Неизвестен"}
            </span>
          </div>
          <div className={s["task-card__info"]}>
            <p className={s["task-card__points"]}>
              Стоимость: {reward.reward.cost_points} баллов
            </p>
            <p className={s["task-card__date"]}>
              Дата получения:{" "}
              {new Date(reward.issued_at).toLocaleString("ru-RU", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export { CompletedTasks, SpentRewards };
