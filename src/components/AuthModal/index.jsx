import React, { useState } from "react";
import Modal from "../Modal";
import { Form } from "../Form";
import s from "./index.module.scss";
import AuthService from "../../http/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { fetchToken } from "../../store/slices/authSlice";
const AuthModal = () => {
  const [modalLoginActive, setModalLoginActive] = useState(false);
  const [modalRegisterActive, setModalRegisterActive] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLoginSubmit = async (values) => {
    dispatch(fetchToken({ email: values.email, password: values.password }));
    if (!error) {
      // Не работает
      toast.success("Успешный вход");
    } else {
      toast.error(error);
    }
  };

  const handleRegisterSubmit = async (values) => {
    try {
      console.log("Registration Data:", values);
      const response = await AuthService.registration(
        values.email,
        values.display_name,
        values.password
      );
      console.log("Registration Data:", values);
      if (response.status === 201) {
        setModalRegisterActive(false);
        setModalLoginActive(true);
        toast.success("Вы успешно зарегистрированы");
      }
    } catch (error) {
      if (!error.response) {
        toast.error("Не удается подключиться к серверу. Попробуйте позже.");
      } else {
        toast.error(error.response.data["error_details"][0]);
      }
    }
  };
  return (
    <>
      <li
        className={s["nav-list__item-btn"]}
        onClick={() => setModalLoginActive(true)}
      >
        <div>Вход</div>
      </li>

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
              type="button"
              className={s["registration-text"]}
              onClick={() => {
                setModalLoginActive(false);
                setModalRegisterActive(true);
              }}
            >
              Зарегистрироваться
            </button>
          </p>
          {loading && <h1>Loading...</h1>}
        </Form>
      </Modal>

      <Modal active={modalRegisterActive} setActive={setModalRegisterActive}>
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
          <p className={s["not_account-text"]}>
            Нет аккаунта?
            <button
              type="button"
              className={s["login-text"]}
              onClick={() => {
                setModalLoginActive(true);
                setModalRegisterActive(false);
              }}
            >
              Войти
            </button>
            {loading && <h1>Loading...</h1>}
          </p>
        </Form>
      </Modal>
      <ToastContainer
        position="bottom-right"
        className={s["custom-toast-container"]}
      />
    </>
  );
};

export default AuthModal;
