import { useState } from "react";
import { formatPoints, selectType } from "../../util/UtilService";
import s from "./index.module.scss";
import TaskModal from "../TaskModal";
import CountdownTimer from "../CountDownTimer";

const Tasks = ({ tasks, refreshTasks }) => {
  const [modalTaskActive, setModalTaskActive] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const getExpiredDate = (task) => {
    if (task.task_type === "DAILY") {
      const now = new Date();
      return new Date(now.setHours(23, 59, 59, 999));
    } else {
      return null;
      // return new Date(task.expired_date);
    }
  };

  return (
    <div className={s["task-list"]}>
      {tasks.length === 0 ? (
        <div className={s["no-tasks-message"]}>
          Нет заданий в этой категории
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => {
              setSelectedTask(task);
              setModalTaskActive(true);
            }}
            className={s["task-card"]}
          >
            <div className={s["task-card__header"]}>
              <div className={s["task-card__category"]}>
                {task.category.category_name}
              </div>
              <div className={s["task-card__timer"]}>
                <CountdownTimer expiredDate={getExpiredDate(task)} />
              </div>
              {selectType(task)}
            </div>
            <div className={s["task-card__body"]}>
              <div className={s["task-card__title"]}>{task.title}</div>
              <div className={s["task-card__points"]}>
                {formatPoints(task.points)}
              </div>
            </div>
            <div className={s["task-card__description"]}>
              {truncateText(task.description, 60)}
            </div>
          </div>
        ))
      )}
      <TaskModal
        task={selectedTask}
        modalTaskActive={modalTaskActive}
        setModalTaskActive={setModalTaskActive}
        refreshTasks={refreshTasks}
      />
    </div>
  );
};

export default Tasks;
