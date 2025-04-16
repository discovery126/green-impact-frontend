import React, { useEffect, useState } from "react";
import s from "./index.module.scss";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AdminCompletedTaskService from "../../../http/AdminCompledTaskService";

const AdminCompletedTasksPage = () => {
  const { auth, roles } = useSelector((state) => state.auth);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const fetchCompletedTasks = async (page = currentPage, size = pageSize) => {
    try {
      const response = await AdminCompletedTaskService.getCompletedTasks({
        page,
        size,
        sort: "status,desc",
      });
      setCompletedTasks(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
      console.error("Ошибка при загрузке заданий:", error);
    }
  };

  const handleAcceptTask = async (taskId) => {
    try {
      await AdminCompletedTaskService.acceptTask(taskId);
      toast.success("Задание принято!");
      fetchCompletedTasks();
    } catch (error) {
      if (error.status === 400) {
        toast.error(error.response.data.message[0]);
      } else {
        toast.error("Ошибка при отклонении задания!");
        console.error(error);
      }
    }
  };

  const handleRejectTask = async (taskId) => {
    try {
      await AdminCompletedTaskService.rejectTask(taskId);
      toast.success("Задание отклонено!");
      fetchCompletedTasks();
    } catch (error) {
      if (error.status === 400) {
        toast.error(error.response.data.message[0]);
      } else {
        toast.error("Ошибка при отклонении задания!");
        console.error(error);
      }
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
      fetchCompletedTasks();
    }
  }, [auth, roles, currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(0);
  };

  return (
    <div className={s["completed-tasks-page"]}>
      <h2>Список выполненный задач</h2>
      {completedTasks.length > 0 ? (
        <>
          <ul className={s["task-list"]}>
            {completedTasks.map((completedTask) => (
              <li key={completedTask.id} className={s["task-item"]}>
                <div>
                  <h3>{completedTask.task?.title}</h3>
                  <p>
                    <strong>Описание:</strong>{" "}
                    {completedTask.description || "—"}
                  </p>
                  <p>
                    <strong>Статус:</strong> {completedTask.status}
                  </p>
                  <p>
                    <strong>Дата взятия:</strong>{" "}
                    {new Date(completedTask.taken_at).toLocaleString("ru-RU")}
                  </p>
                  <p>
                    <strong>Дата завершения:</strong>{" "}
                    {new Date(completedTask.completed_at).toLocaleString(
                      "ru-RU"
                    )}
                  </p>
                  <p>
                    <strong>Подтверждено:</strong>{" "}
                    {completedTask.verified_at
                      ? new Date(completedTask.verified_at).toLocaleString(
                          "ru-RU"
                        )
                      : "нет"}
                  </p>

                  <p>
                    <strong>Пользователь:</strong> {completedTask.user?.email}
                  </p>
                  <p>
                    <strong>Баллы:</strong> {completedTask.task?.points}
                  </p>

                  <p>
                    <strong>Доказательства:</strong>
                  </p>
                  <ul>
                    {completedTask.taskProofs.map((proof) => (
                      <li key={proof.id}>
                        <a
                          href={proof.image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Доказательство {proof.id}
                        </a>
                        <div className={s["image-preview"]}>
                          <img
                            src={proof.image_url}
                            alt={`Proof ${proof.id}`}
                            className={s["proof-image"]}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s["btn-content"]}>
                  <button
                    className={s["confirm-button"]}
                    onClick={() => handleAcceptTask(completedTask.id)}
                  >
                    Принять
                  </button>
                  <button
                    className={s["reject-button"]}
                    onClick={() => handleRejectTask(completedTask.id)}
                  >
                    Отклонить
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={s["pagination"]}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className={s["button"]}
            >
              Назад
            </button>
            <span className={s["page-text"]}>
              Страница {currentPage + 1} из {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage + 1 === totalPages}
              className={s["button"]}
            >
              Вперед
            </button>

            <select
              className={s["button"]}
              onChange={handlePageSizeChange}
              value={pageSize}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </>
      ) : (
        <p>Нет задач для отображения</p>
      )}
    </div>
  );
};

export default AdminCompletedTasksPage;
