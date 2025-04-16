import React, { useState } from "react";
import Modal from "../Modal";
import s from "./index.module.scss";
import { formatPoints, selectType } from "../../util/UtilService";
import TaskService from "../../http/TaskService";
import { toast } from "react-toastify";

const ActiveTaskModal = ({
  activeTask,
  modalTaskActive,
  setModalTaskActive,
  refreshTasks,
}) => {
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState([]);

  const handleStartTask = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        formData.append("photos", file);
      });
    }
    formData.append("comment", comment);
    try {
      await TaskService.submitTaskFiles(activeTask.id, formData);
      refreshTasks();
      setModalTaskActive(false);
      setComment("");
      setFiles([]);
      toast.success("Задание отправлено на проверку");
    } catch (error) {
      if (error.status === 400) {
        toast.error(error.response.data.message[0]);
      } else if (error.status === 401) {
        toast.error("Вы не авторизованы");
      } else {
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
        console.error("Ошибка при отправке задания:", error);
      }
    }
  };

  if (!activeTask) return null;

  return (
    <Modal active={modalTaskActive} setActive={setModalTaskActive}>
      <div className={s["task-modal"]}>
        <div className={s["task-modal__title"]}>{activeTask.title}</div>
        {selectType(activeTask)}
        <div className={s["task-modal__category"]}>
          {activeTask.category.category_name}
        </div>
        <div className={s["task-modal__description"]}>
          {activeTask.description}
        </div>
        <div className={s["task-modal__points"]}>
          {formatPoints(activeTask.points)}
        </div>

        <textarea
          className={s["task-modal__text-area"]}
          placeholder="Комментарий к выполнению..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className={s["task-modal__file"]}
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files))}
        />

        <button
          className={s["task-modal__btn"]}
          onClick={handleStartTask}
          disabled={files.length === 0}
        >
          Отправить задание
        </button>
      </div>
    </Modal>
  );
};

export default ActiveTaskModal;
