import React from "react";
import s from "./index.module.scss";
import { Link } from "react-router";

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className={s["sidebar"]}>
      <ul>
        <li>
          <Link
            to="#"
            onClick={() => setActiveSection("completed-task")}
            className={s.active}
          >
            Выполненные задачи
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => setActiveSection("tasks")}
            className={s.active}
          >
            Задания
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => setActiveSection("events")}
            className={s.active}
          >
            Мероприятия
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => setActiveSection("rewards")}
            className={s.active}
          >
            Награды
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => setActiveSection("cities")}
            className={s.active}
          >
            Города
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
