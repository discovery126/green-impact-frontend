import React, { useState } from "react";
import s from "./index.module.scss";
import { userAuth } from "../../hooks/use_auth";
import AuthModal from "../AuthModal";

export default function Header() {
  const { auth } = userAuth();
  return (
    <header className={s["header"]}>
      <div className="container">
        <div className={s["nav-row"]}>
          <a href="/" className={s["logo"]}>
            GreenImpact
          </a>
          <ul className={s["nav-list"]}>
            <li className={s["nav-list__item"]}>
              <a href="/" className={s["nav-list__link"]}>
                Главная
              </a>
            </li>
            <li className={s["nav-list__item"]}>
              <a href="/tasks" className={s["nav-list__link"]}>
                Эко-задания
              </a>
            </li>
            <li className={s["nav-list__item"]}>
              <a href="/rewards" className={s["nav-list__link"]}>
                Награды
              </a>
            </li>
            <li className={s["nav-list__item"]}>
              <a href="/rating" className={s["nav-list__link"]}>
                Рейтинг
              </a>
            </li>
            <li className={s["nav-list__item"]}>
              <a href="/events" className={s["nav-list__link"]}>
                Мероприятия
              </a>
            </li>
            {auth ? (
              <li className={s["nav-list__item-btn"]}>
                <a href="/profile" className={s["nav-list__link"]}>
                  Профиль
                </a>
              </li>
            ) : (
              <li className={s["nav-list__item-btn"]}>
                <AuthModal />
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
}
