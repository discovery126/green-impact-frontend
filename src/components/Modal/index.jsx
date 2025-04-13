import s from "./index.module.scss";

const Modal = ({ active, setActive, children }) => {
  const handleClose = () => {
    try {
      setActive(false);
    } catch {
      setActive();
    }
  };
  return (
    <div
      className={`${s["modal"]} ${active && s["modal--active"]}`}
      onClick={handleClose}
    >
      <div
        className={`${s["modal__content"]} ${
          active && s["modal__content--active"]
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
