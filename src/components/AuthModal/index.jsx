import React, { useState } from "react";
import Modal from "../Modal";
import Form from "../Form";
import s from "./index.module.scss";
import AuthService from "../../http/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchToken } from "../../store/slices/authSlice";
import {
  clearModal,
  setLoginModal,
  setRegisterModal,
} from "../../store/slices/authModalSlice";

const AuthModal = () => {
  const dispatch = useDispatch();
  const { modalType } = useSelector((state) => state.authModal);

  const handleLoginSubmit = async (values) => {
    dispatch(fetchToken({ email: values.email, password: values.password }));
  };

  const handleRegisterSubmit = async (values) => {
    try {
      const response = await AuthService.registration(
        values.email,
        values.display_name,
        values.password
      );
      console.log("Registration Data:", values);
      if (response.status === 201) {
        dispatch(clearModal());
        toast.success("Вы успешно зарегистрированы");
      }
    } catch (error) {
      if (!error.response) {
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
      } else {
        toast.error(error.response.data.message[0]);
      }
    }
  };
  return (
    <>
      <Modal
        active={modalType === "login"}
        setActive={() => dispatch(clearModal())}
      >
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
          <div className={s["not_account--text"]}>
            Нет аккаунта?
            <button
              type="button"
              className={s["registration--text"]}
              onClick={() => {
                dispatch(setRegisterModal());
              }}
            >
              Зарегистрироваться
            </button>
          </div>
        </Form>
      </Modal>

      <Modal
        active={modalType === "register"}
        setActive={() => dispatch(clearModal())}
      >
        <Form
          title="Регистрация"
          onSubmit={handleRegisterSubmit}
          fields={[
            {
              name: "email",
              type: "email",
              placeholder: "Введите почту",
              label: "Почта",
            },
            {
              name: "display_name",
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
          <div className={s["not_account--text"]}>
            Есть аккаунт?
            <button
              type="button"
              className={s["login--text"]}
              onClick={() => {
                dispatch(setLoginModal());
              }}
            >
              Войти
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AuthModal;
