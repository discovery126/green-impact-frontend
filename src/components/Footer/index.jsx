import React from "react";
import s from "./index.module.scss";
import { MdOutlineLocalPhone, MdOutlineMail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className={s["footer"]}>
      <div className="container">
        <div className={s["footer-container"]}>
          <div className={s["email-container"]}>
            <MdOutlineMail />
            <p className={s["email"]}>email@example.com</p>
          </div>
          <div className={s["phone-container"]}>
            <MdOutlineLocalPhone />
            <p className={s["phone"]}>+7 (123) 456-78-90</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
