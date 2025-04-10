import s from "./index.module.scss";

function formatPoints(n) {
  const forms = ["балл", "балла", "баллов"];
  if (n % 10 === 1 && n % 100 !== 11) return `${n} ${forms[0]}`; // 1 балл
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20))
    return `${n} ${forms[1]}`; // 2-4 балла
  return `${n} ${forms[2]}`; // 5+ баллов
}

const selectType = (task) => {
  if (task.task_type === "DAILY") {
    return <div className={s["task__type"]}>Ежедневные</div>;
  } else {
    return null;
  }
};
const formatDate = (event) => {
  const startDate = new Date(event.start_date).toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const endDate = new Date(event.end_date).toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${startDate} - ${endDate}`;
};
const concatAddress = (event) => {
  return `г. ${event.city.nameCity} ${event.street} ${
    event.house_number ? event.house_number : ""
  }`;
};

export { formatPoints, selectType, formatDate, concatAddress };
