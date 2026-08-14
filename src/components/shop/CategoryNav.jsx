import React from "react";

const CategoryNav = ({ categories, products }) => {
  const visibleCategories = categories.filter((category) =>
    products.some((product) => product.category_id === category.id)
  );

  if (visibleCategories.length === 0) return null;

  return (
    <div className="category-nav-sticky">
      <div className="category-nav-scroll">
        {visibleCategories.map((category) => (
          <a
            key={category.id}
            href={`#category-${category.slug}`}
            className="category-nav-pill"
          >
            {category.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
