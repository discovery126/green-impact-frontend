import React, { useState } from "react";
import Modal from "../Modal";
import s from "./index.module.scss";
import { formatPoints, selectType } from "../../util/UtilService";
import TaskService from "../../http/TaskService";

const ActiveTaskModal = ({
  activeTask,
  modalTaskActive,
  setModalTaskActive,
  refreshTasks,
}) => {
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState([]);
  console.log(activeTask);
  const handleStartTask = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        console.log(file);
        formData.append("photos", file);
      });
    }
    formData.append("comment", comment);
    console.log(comment);
    console.log(files);
    try {
      await TaskService.submitTaskFiles(activeTask.id, formData);
      await refreshTasks();
      setModalTaskActive(false);
      setComment("");
      setFiles([]);
    } catch (error) {
      console.error("Ошибка при отправке задания:", error);
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
