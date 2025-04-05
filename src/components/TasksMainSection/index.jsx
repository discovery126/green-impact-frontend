import TaskService from "../../http/TaskService";
import Categories from "../Categories";
import s from "./index.module.scss";
import { useEffect, useState } from "react";
export default function TasksMainSection() {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await TaskService.getAllTaskCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке категорий задач:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={s["tasks-section"]}>
      <div className="container">
        <div className={s["tasks-section__categories"]}>
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <div className={s["tasks-section__list-tasks"]}>
            
          </div>
        </div>
      </div>
    </div>
  );
}
