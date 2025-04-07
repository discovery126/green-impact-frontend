import { formatPoints } from "../../util/UtilService";
import s from "./index.module.scss";

export default function ActiveTasks({ activeTasks, auth }) {
  return (
    <div className={s["active-tasks"]}>
      <div className={s["active-tasks__header"]}>Твои задания</div>
      <div className={s["active-tasks__section"]}>
        <div className={s["active-tasks__section-title"]}>Активные</div>
        <hr className={s["active-tasks__divider"]} />
        {auth ? (
          activeTasks.map((active_task) => (
            <div
              key={active_task.id}
              className={s["active-tasks__card-wrapper"]}
            >
              <div className={s["active-tasks__card"]}>
                <div className={s["active-tasks__category"]}>
                  {active_task.category.category_name}
                </div>
                <div className={s["active-tasks__info"]}>
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
            <hr className={s["active-tasks__divider"]} />
            <div className={s["active-tasks__empty"]}>Нет активных задач</div>
          </>
        )}
      </div>
    </div>
  );
}
