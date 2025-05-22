import { useDispatch, useSelector } from "react-redux";
import TaskService from "../../http/TaskService";
import Categories from "../Categories";
import Tasks from "../Tasks";
import s from "./index.module.scss";
import { useEffect, useState } from "react";
import ActiveTasks from "../ActiveTasks";
import axios from "axios";
import { toast } from "react-toastify";

const TasksMainSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTasks, setActiveTasks] = useState([]);
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fetchCategories = async () => {
    try {
      const response = await TaskService.getAllTaskCategories();
      setCategories(response.data.data);
    } catch (error) {
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
      console.error("Ошибка при загрузке категорий задач: ", error);
    }
  };

  const fetchUserTasks = async () => {
    const response = await TaskService.getUserTasks();
    setTasks(response?.data.data);
  };

  const fetchActiveUserTasks = async () => {
    const response = await TaskService.getActiveTasks();
    setActiveTasks(response?.data.data);
  };

  const fetchAllTasks = async () => {
    try {
      const response = await TaskService.getAllTasks();
      setTasks(response.data.data);
    } catch (error) {
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
      console.error("Ошибка при загрузке задач: ", error);
    }
  };
  const refreshTasks = async () => {
    await fetchCategories();
    if (auth) {
      try {
        await fetchUserTasks();
        await fetchActiveUserTasks();
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Запрос отменён:", error.message);
          return;
        } else {
          toast.error("Не удается подключиться к серверу. Попробуйте позже.");
          console.error("Ошибка при загрузке задач:", error);
        }
      }
    } else {
      await fetchAllTasks();
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
};

export default TasksMainSection;
