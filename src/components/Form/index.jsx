import { useState } from "react";
import s from "./index.module.scss";

const Form = ({ title, onSubmit, fields, buttonText, children }) => {
  const [values, setValues] = useState(
    Object.fromEntries(fields.map((field) => [field.name, ""]))
  );

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className={s["form"]} onSubmit={handleSubmit}>
      <h1 className={s["title"]}>{title}</h1>
      {fields.map(({ name, type, placeholder, label }) => (
        <div key={name} className={s["field"]}>
          <label htmlFor={name} className={s["label"]}>
            {label}
          </label>
          <input
            className={s["input"]}
            key={name}
            type={type}
            name={name}
            value={values[name]}
            onChange={handleChange}
            placeholder={placeholder}
          />
        </div>
      ))}
      <button className={s["btn_submit"]} type="submit">
        {buttonText || title}
      </button>
      {children}
    </form>
  );
};

export { Form };
