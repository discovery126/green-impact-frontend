import React, { useEffect, useState } from "react";
import RatingService from "../../http/RatingService";
import s from "./index.module.scss";
import { toast } from "react-toastify";

const RatingMainSection = () => {
  const [ratings, setRatings] = useState([]);
  const [sortBy, setSortBy] = useState("month");

  const fetchRatings = async () => {
    try {
      const response = await RatingService.getRating(sortBy);
      setRatings(response.data.data);
    } catch (err) {
      toast.error("Не удается подключиться к серверу. Попробуйте позже.");
    }
  };
  useEffect(() => {
    fetchRatings();
  }, [sortBy]);

  const handleSortByMonth = () => {
    setSortBy("month");
  };

  const handleSortByWeek = () => {
    setSortBy("week");
  };

  return (
    <div className={s["rating-main-wrapper"]}>
      <div className={s["rating-main-container"]}>
        <div className={s["sort-buttons-container"]}>
          <button
            className={`${s["sort-button"]} ${
              sortBy === "month" ? s["active"] : ""
            }`}
            onClick={handleSortByMonth}
          >
            Месяц
          </button>
          <button
            className={`${s["sort-button"]} ${
              sortBy === "week" ? s["active"] : ""
            }`}
            onClick={handleSortByWeek}
          >
            Неделя
          </button>
        </div>
        <>
          {ratings.length === 0 ? (
            <div className={s["no-rating-message"]}>
              На данный момент рейтинг не доступен
            </div>
          ) : (
            <ul className={s["rating-list"]}>
              {ratings.map((rating, index) => (
                <li className={s["rating-list-item"]} key={index}>
                  <span className={s["rating-position"]}>{index + 1}.</span>
                  <span className={s["rating-user-name"]}>
                    {rating.display_name}
                  </span>
                  <span className={s["rating-user-score"]}>{rating.score}</span>
                </li>
              ))}
            </ul>
          )}
        </>
      </div>
    </div>
  );
};

export default RatingMainSection;
