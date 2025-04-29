import { formatPoints, selectType } from "../../util/UtilService";
import s from "./index.module.scss";
import { useState } from "react";
import ActiveTaskModal from "../ActiveTaskModal";
import CountdownTimer from "../CountDownTimer";

const ActiveTasks = ({ activeTasks, auth, refreshTasks }) => {
  const [modalTaskActive, setModalTaskActive] = useState(false);
  const [selectedActiveTask, setSelectedActiveTask] = useState(null);
  const getExpiredDate = (task) => {
    if (task.task_type === "DAILY") {
      const now = new Date();
      return new Date(now.setHours(23, 59, 59, 999));
    } else {
      return new Date(task.expired_date);
    }
  };
  return (
    <>
      <ActiveTaskModal
        activeTask={selectedActiveTask}
        modalTaskActive={modalTaskActive}
        setModalTaskActive={setModalTaskActive}
        refreshTasks={refreshTasks}
      />
      <div className={s["active-tasks"]}>
        <div className={s["active-tasks__main-title"]}>Твои задания</div>
        <div className={s["active-tasks__section"]}>
          <div className={s["active-tasks__section-title"]}>Активные</div>
          <hr className={s["active-tasks__divider"]} />

          {auth && activeTasks.length > 0 ? (
            activeTasks.map((active_task) => (
              <div
                key={active_task.id}
                className={s["active-tasks__cards"]}
                onClick={() => {
                  setSelectedActiveTask(active_task);
                  setModalTaskActive(true);
                }}
              >
                <div className={s["active-tasks__card"]}>
                  <div className={s["active-tasks__header"]}>
                    <CountdownTimer
                      expiredDate={getExpiredDate(active_task)}
                      top="null"
                      left="200px"
                    />
                    <div className={s["active-tasks__category"]}>
                      {active_task.category.category_name}
                    </div>
                    {selectType(active_task)}
                  </div>
                  <div className={s["active-tasks__card-info"]}>
                    <div className={s["active-tasks__title"]}>
                      {active_task.title}
                    </div>
                    <div className={s["active-tasks__points"]}>
                      {formatPoints(active_task.points)}
                    </div>
                  </div>
                </div>
                <hr className={s["active-tasks__divider"]} />
              </div>
            ))
          ) : (
            <>
              <div className={s["active-tasks__empty"]}>Нет активных задач</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ActiveTasks;
