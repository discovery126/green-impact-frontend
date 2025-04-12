import React from "react";
import s from "./index.module.scss";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirects to the home page ("/")
  };

  return (
    <div className={s["not-found-container"]}>
      <h1 className={s["not-found-title"]}>404 - Страница не найдена</h1>
      <p className={s["not-found-description"]}>
        Указанный домен не существует или не доступен.
      </p>
      <button className={s["go-home-button"]} onClick={handleGoHome}>
        Вернуться на главную
      </button>
    </div>
  );
};

export default NotFoundPage;
