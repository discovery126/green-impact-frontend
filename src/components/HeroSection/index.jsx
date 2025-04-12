import React from "react";
import s from "./index.module.scss";

const HeroSection = () => {
  return (
    <section className={s["hero-section"]}>
      <div className="container">
        <h1>Твой вклад в экологию начинается здесь!</h1>
        <div className={s["hero-section__text"]}>
          Выполняй эко-задания, учавствуй в событиях, получай бонусы!
        </div>
        <div>
          <a href="/profile" className={s["hero-section__btn"]}>
            Присоединяйся
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
