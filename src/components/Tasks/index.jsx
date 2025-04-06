import s from "./index.module.scss";

export default function Tasks({ tasks }) {
  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className={s["task-list"]}>
      {tasks.length === 0 ? (
        <div className={s["no-tasks-message"]}>
          Нет заданий в этой категории
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className={s["task-card"]}>
            <div className={s["task-card__category"]}>
              {task.category.category_name}
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
