import s from "./index.module.scss";

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className={s["sidebar"]}>
      <ul>
        <li>
          <button
            onClick={() => setActiveSection("completed-task")}
            className={s["active"]}
          >
            Выполненные задачи
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection("tasks")}
            className={s["active"]}
          >
            Задания
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection("events")}
            className={s["active"]}
          >
            Мероприятия
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection("rewards")}
            className={s["active"]}
          >
            Награды
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveSection("cities")}
           className={s["active"]}
          >
            Города
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
