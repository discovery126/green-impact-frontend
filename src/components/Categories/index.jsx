import s from "./index.module.scss";

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
  const all = "Все";

  return (
    <div className={s["categories-content"]}>
      <button
        className={`${s["categories__button"]} ${
          selectedCategory === all && s["categories__button--active"]
        }`}
        onClick={() => setSelectedCategory("Все")}
      >
        {all}
      </button>
      {categories.map((category) => {
        return (
          <button
            className={`${s["categories__button"]} ${
              selectedCategory === category.category_name &&
              s["categories__button--active"]
            }`}
            key={category.id}
            onClick={() => setSelectedCategory(category.category_name)}
          >
            {category.category_name}
          </button>
        );
      })}
    </div>
  );
};
export default Categories;
