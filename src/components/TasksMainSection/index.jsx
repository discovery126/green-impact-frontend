import { useSelector } from "react-redux";
import TaskService from "../../http/TaskService";
import Categories from "../Categories";
import Tasks from "../Tasks";
import s from "./index.module.scss";
import { useEffect, useState } from "react";
import ActiveTasks from "../ActiveTasks";

export default function TasksMainSection() {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const { auth } = useSelector((state) => state.auth);

  const fetchCategories = async () => {
    try {
      const response = await TaskService.getAllTaskCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке категорий задач:", error);
    }
  };

  const fetchUserTasks = async () => {
    try {
      const response = await TaskService.getUserTasks();
      // console.log(response);
      setTasks(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
    }
  };

  const fetchActiveUserTasks = async () => {
    try {
      const response = await TaskService.getActiveTasks();
      setActiveTasks(response.data);
    } catch (error) {
      console.log(error.response);
      console.error("Ошибка при загрузке задач:", error);
    }
  };

  const fetchAllTasks = async () => {
    try {
      const response = await TaskService.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
    }
  };
  const refreshTasks = async () => {
    fetchCategories();
    if (auth) {
      fetchUserTasks();
      fetchActiveUserTasks();
    } else {
      fetchAllTasks();
    }
  };
  useEffect(() => {
    refreshTasks();
  }, [auth]);

  const filteredTasks =
    selectedCategory === "Все"
      ? tasks
      : tasks.filter(
          (task) => task.category.category_name === selectedCategory
        );

  return (
    <div className={s["tasks-section"]}>
      <div className="container">
        <div className={s["tasks-section__content"]}>
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <div className={s["tasks-section__list"]}>
            <Tasks tasks={filteredTasks} refreshTasks={refreshTasks} />
            <ActiveTasks
              activeTasks={activeTasks}
              auth={auth}
              refreshTasks={refreshTasks}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
