import React, { useState, useEffect, useRef } from "react";
import s from "./index.module.scss";
import AdminTaskService from "../../../http/AdminTaskService";
import TaskService from "../../../http/TaskService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const AdminTasksPage = () => {
  const defaultTask = {
    id: null,
    title: "",
    description: "",
    points: 0,
    task_type: "LIMITED",
    expired_date: "",
    category: { id: 0, category_name: "" },
  };
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(defaultTask);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const { auth, roles } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await AdminTaskService.getAllTasks();
      setTasks(response.data.data);
    } catch (error) {
      console.error("Ошибка при загрузке заданий:", error);
    }
  };
  const createTask = async (task) => {
    try {
      const response = await AdminTaskService.createTask(task);
      if (response.status === 201) {
        toast.success("Задание успешно добавлено");
        fetchTasks();
      }
    } catch (error) {
      if (error.status === 403) {
        toast.error("Вы не админ");
      } else if (error.status === 401) {
        toast.error("Вы не авторизованы");
      } else {
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
        console.error("Ошибка при загрузке заданий:", error);
      }
    }
  };
  const editTask = async (task) => {
    try {
      const response = await AdminTaskService.editTask(task);
      if (response.status === 200) {
        toast.success("Задание успешно изменено");
        fetchTasks();
        setTimeout(() => {
          const taskElement = document.querySelector(
            `[data-task-id='${currentTask.id}']`
          );
          if (taskElement) {
            taskElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 200);
      }
    } catch (error) {
      if (error.status === 403) {
        toast.error("Вы не админ");
      } else if (error.status === 401) {
        toast.error("Вы не авторизованы");
      } else if (error.status === 400) {
        toast.error(error.response.data.message[0]);
      } else {
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
        console.error("Ошибка при загрузке заданий:", error);
      }
    }
  };
  const removeTask = async (taskId) => {
    try {
      const response = await AdminTaskService.removeTask(taskId);
      if (response.status === 204) {
        toast.success("Задание успешно удалено");
        fetchTasks();
      }
    } catch (error) {
      if (error.status === 403) {
        toast.error("Вы не админ");
      } else if (error.status === 401) {
        toast.error("Вы не авторизованы");
      } else {
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
        console.error("Ошибка при загрузке заданий:", error);
      }
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await TaskService.getAllTaskCategories();
      setCategories(response.data.data);
    } catch (error) {
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
      console.error("Ошибка при загрузке категорий задач:", error);
    }
  };
  const resetCurrentTask = () => {
    setCurrentTask(defaultTask);
  };
  const handleAddTask = () => {
    const newTask = {
      title: currentTask.title,
      description: currentTask.description,
      points: currentTask.points,
      task_type: currentTask.task_type,
      expired_date: currentTask.expired_date || null,
      category_id: currentTask.category.id,
    };
    createTask(newTask);
    resetCurrentTask();
    setIsFormVisible(false);
  };
  const handleSaveTask = () => {
    const updatedTask = {
      id: currentTask.id,
      title: currentTask.title,
      description: currentTask.description,
      points: currentTask.points,
      task_type: currentTask.task_type,
      expired_date: currentTask.expired_date,
      category_id: currentTask.category.id,
    };
    editTask(updatedTask);
    resetCurrentTask();
    setIsFormVisible(false);
  };
  const handleEditTask = (task) => {
    setCurrentTask({ ...task });
    setIsFormVisible(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };
  const handleDeleteTask = (taskId) => {
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить задание?"
    );
    if (confirmDelete) {
      removeTask(taskId);
    }
  };

  useEffect(() => {
    if (!auth) {
      navigate("/");
    } else if (!roles || roles.length === 0) {
      return;
    } else if (!roles.includes("ADMIN")) {
      navigate("/");
      toast.error("Вы не администратор");
    } else {
      fetchTasks();
      fetchCategories();
    }
  }, [auth, roles]);

  return (
    <div className={s["tasks-page"]}>
      <button onClick={() => setIsFormVisible(true)} className={s["button"]}>
        Добавить задание
      </button>
      {isFormVisible && (
        <div className={s["form-panel"]}>
          <h2>{currentTask.id ? "Редактировать задачу" : "Добавить задачу"}</h2>

          <input
            type="text"
            value={currentTask.title}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, title: e.target.value })
            }
            placeholder="Название задачи"
            className={s["input"]}
          />

          <textarea
            value={currentTask.description}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, description: e.target.value })
            }
            placeholder="Описание задачи"
            className={s["textarea"]}
          />

          <input
            type="number"
            value={currentTask.points}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, points: Number(e.target.value) })
            }
            placeholder="Баллы"
            className={s["input"]}
          />

          <select
            value={currentTask.task_type}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, task_type: e.target.value })
            }
            className={s["select"]}
          >
            <option value="LIMITED">LIMITED</option>
            <option value="DAILY">DAILY</option>
          </select>

          <input
            type="datetime-local"
            value={
              (currentTask.expired_date &&
                currentTask.expired_date.slice(0, 16)) ??
              ""
            }
            onChange={(e) =>
              setCurrentTask({ ...currentTask, expired_date: e.target.value })
            }
            className={s["input"]}
          />

          <select
            value={currentTask.category.id || ""}
            onChange={(e) => {
              const selectedId = Number(e.target.value);
              const selected = categories.find(
                (category) => category.id === selectedId
              );
              setCurrentTask((prev) => ({
                ...prev,
                category: selected || { id: 0, category_name: "" },
              }));
            }}
            className={s["select"]}
          >
            <option value="">Выберите категорию</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>

          <div className={s["form_btn"]}>
            <button
              onClick={currentTask.id ? handleSaveTask : handleAddTask}
              className={s["button"]}
            >
              {currentTask.id ? "Сохранить" : "Добавить"}
            </button>

            <button
              onClick={() => {
                setIsFormVisible(false);
                resetCurrentTask();
              }}
              className={s["button"]}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
      <h2>Список задач</h2>
      {tasks.length > 0 ? (
        <div className={s["task-list"]}>
          {tasks.map((task) => (
            <div
              key={task.id}
              className={s["task-item"]}
              data-task-id={task.id}
            >
              <div>
                <h3>
                  <strong>{task.title}</strong>
                </h3>
                <p>{task.description}</p>
                <p>Баллы: {task.points}</p>
                <p>Тип: {task.task_type}</p>
                {task.expired_date && (
                  <p>
                    Дата окончания:{" "}
                    {new Date(task.expired_date).toLocaleString("ru-RU", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
                <p>Категория: {task.category.category_name}</p>
              </div>
              <button
                onClick={() => handleEditTask(task)}
                className={s["edit-button"]}
              >
                Редактировать
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className={s["delete-button"]}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Нет задач для отображения</p>
      )}
    </div>
  );
};

export default AdminTasksPage;
