import React from "react";
import s from "./index.module.scss";

const FeatureSection = () => {
  const steps = [
    "Авторизоваться на сайте",
    "Выбрать задание в каталоге",
    "Выполнить задание",
    "Подтвердить выполнение",
    "Получить баллы",
  ];

  return (
    <section className={s["feature-section"]}>
      <h1 className={s["title"]}>КАК ЗАРАБОТАТЬ БАЛЛЫ?</h1>
      <ol className={s["list"]}>
        {steps.map((step, index) => (
          <li key={index} className={s["list-item"]}>
            <div className={s["step-number"]}>{index + 1}</div>
            <div className={s["step-text"]}>{step}</div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default FeatureSection;
