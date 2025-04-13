import React from "react";
import s from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLoginModal } from "../../store/slices/authModalSlice";

const HeroSection = () => {
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <section className={s["hero-section"]}>
      <div className="container">
        <h1>Твой вклад в экологию начинается здесь!</h1>
        <div className={s["hero-section__text"]}>
          Выполняй эко-задания, учавствуй в событиях, получай бонусы!
        </div>
        {auth ? (
          <a href="/profile" className={s["hero-section__btn"]}>
            Присоединяйся
          </a>
        ) : (
          <button
            className={s["hero-section__btn"]}
            onClick={() => dispatch(setLoginModal())}
          >
            Присоединяйся
          </button>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
