import s from "./index.module.scss";

export default function ActiveTasks({ activeTasks, auth }) {
  return (
    <div className={s["active-tasks"]}>
      <div className={s["active-tasks__header"]}>Твои задания</div>
      <div className={s["active-tasks__section"]}>
        <div className={s["active-tasks__section-title"]}>Активные</div>
        {auth ? (
          activeTasks.map((active_task) => (
            <div
              key={active_task.id}
              className={s["active-tasks__card-wrapper"]}
            >
              <hr className={s["active-tasks__divider"]} />
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
            <div className={s["active-tasks__section-title"]}>
              Нет активных задач
            </div>
          </>
        )}
      </div>
    </div>
  );

  function formatPoints(n) {
    const forms = ["балл", "балла", "баллов"];
    if (n % 10 === 1 && n % 100 !== 11) return `${n} ${forms[0]}`; // 1 балл
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20))
      return `${n} ${forms[1]}`; // 2-4 балла
    return `${n} ${forms[2]}`; // 5+ баллов
  }
}
