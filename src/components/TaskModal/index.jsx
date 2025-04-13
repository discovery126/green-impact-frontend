import React from "react";
import Modal from "../Modal";
import s from "./index.module.scss";
import { formatPoints, selectType } from "../../util/UtilService";
import TaskService from "../../http/TaskService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const TaskModal = ({
  task,
  modalTaskActive,
  setModalTaskActive,
  refreshTasks,
}) => {
  const { auth } = useSelector((state) => state.auth);
  const handleStartTask = async () => {
    try {
      await TaskService.takeTaskUser(task.id);
      console.log(task.id);
      await refreshTasks();
      setModalTaskActive(false);
      toast.success("Задание успешно взято");
    } catch (error) {
      if (error.status === 409 || error.status === 400) {
        toast.error(error.response.data.message[0]);
      } else if (error.status === 401) {
        toast.error("Вы не авторизованы");
      } else {
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
        console.error("Ошибка при старте задачи:", error);
      }
    }
  };

  if (!task) return null;
  return (
    <Modal active={modalTaskActive} setActive={setModalTaskActive}>
      <div className={s["task-modal"]}>
        <div className={s["task-modal__title"]}>{task.title}</div>
        {selectType(task)}
        <div className={s["task-modal__category"]}>
          {task.category.category_name}
        </div>
        <div className={s["task-modal__description"]}>{task.description}</div>
        <div className={s["task-modal__points"]}>
          {formatPoints(task.points)}
        </div>
        {auth ? (
          <button
            className={s["task-modal__btn"]}
            onClick={() => handleStartTask()}
          >
            Начать задание
          </button>
        ) : (
          <div className={s["task-modal__message"]}>
            Чтобы выполнять задания надо авторизоваться
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TaskModal;
