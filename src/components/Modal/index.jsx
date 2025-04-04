import s from "./index.module.scss";
const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? s["modal_active"] : s["modal"]}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? s["modal-content_active"] : s["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
