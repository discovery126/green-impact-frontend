import React, { useState } from "react";
import Modal from "../Modal";
import { Form } from "../Form";
import { userAuth } from "../../hooks/use_auth";
import s from "./index.module.scss";
const AuthModal = () => {
  const [modalLoginActive, setModalLoginActive] = useState(false);
  const [modalRegisterActive, setModalRegisterActive] = useState(false);
  const { auth } = userAuth();

  const handleLoginSubmit = (values) => {
    console.log("Login Data:", values);
  };

  const handleRegisterSubmit = (values) => {
    console.log("Registration Data:", values);
  };

  return (
    <>
      {!auth && (
        <>
          <button
            onClick={() => setModalLoginActive(true)}
            className={s["nav-list__link"]}
          >
            Вход
          </button>
          <Modal active={modalLoginActive} setActive={setModalLoginActive}>
            <Form
              title="Вход"
              onSubmit={handleLoginSubmit}
              fields={[
                {
                  name: "email",
                  type: "email",
                  placeholder: "Введите почту",
                  label: "Почта",
                },
                {
                  name: "password",
                  type: "password",
                  placeholder: "Введите пароль",
                  label: "Пароль",
                },
              ]}
              buttonText="Войти"
            >
              <p className={s["not_account-text"]}>
                Есть аккаунт?
                <button
                  className={s["registration-text"]}
                  onClick={() => {
                    setModalLoginActive(false);
                    setModalRegisterActive(true);
                  }}
                >
                  Зарегистрироваться
                </button>
              </p>
            </Form>
          </Modal>

          <Modal
            active={modalRegisterActive}
            setActive={setModalRegisterActive}
          >
            <Form
              title="Регистрация"
              onSubmit={handleRegisterSubmit}
              fields={[
                {
                  name: "email",
                  type: "email",
                  placeholder: "Введите пароль",
                  label: "Почта",
                },
                {
                  name: "username",
                  type: "text",
                  placeholder: "Введите отображаемое имя",
                  label: "Отображаемое имя",
                },
                {
                  name: "password",
                  type: "password",
                  placeholder: "Введите пароль",
                  label: "Пароль",
                },
              ]}
              buttonText="Зарегистрироваться"
            >
              <p className={s["not_account-text"]}>
                Нет аккаунта?
                <button
                  className={s["login-text"]}
                  onClick={() => {
                    setModalLoginActive(true);
                    setModalRegisterActive(false);
                  }}
                >
                  Войти
                </button>
              </p>
            </Form>
          </Modal>
        </>
      )}
    </>
  );
};

export default AuthModal;
