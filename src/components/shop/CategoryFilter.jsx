import React, { useState } from "react";

const CategoryFilter = ({ categories, onChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (category) => {
    onChange(category);
    // Check if the category is already selected
    if (selectedCategories.includes(category.slug)) {
      // If selected, remove it and its parent (if applicable)
      setSelectedCategories((prevSelected) => {
        const updatedSelected = prevSelected.filter(
          (slug) => slug !== category.slug
        );

        // Remove parent category if it exists and no other children are selected
        const parentCategory = getParentCategory(category.slug);
        if (
          parentCategory &&
          !hasOtherChildrenSelected(parentCategory, updatedSelected)
        ) {
          return updatedSelected.filter((slug) => slug !== parentCategory);
        }

        return updatedSelected;
      });
    } else {
      // If not selected, add it
      setSelectedCategories((prevSelected) => [
        ...new Set([...prevSelected, category.slug]),
      ]);
    }
  };

  const getParentCategory = (slug) => {
    for (const parentCategory in categories) {
      const childCategories = categories[parentCategory];
      if (childCategories.some((child) => child.slug === slug)) {
        return parentCategory;
      }
    }
    return null;
  };

  const hasOtherChildrenSelected = (parentCategory, updatedSelected) => {
    const allChildSlugs = categories[parentCategory].flatMap(
      (child) => child.slug
    );
    return allChildSlugs.some((slug) => updatedSelected.includes(slug));
  };

  const handleParentCheckboxChange = (parentCategory) => {
    // Check if the parent category is already selected
    if (selectedCategories.includes(parentCategory)) {
      // If selected, remove it and all its children
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((slug) => !slug.startsWith(parentCategory))
      );
    } else {
      // If not selected, add it and all its children
      const allChildSlugs = categories[parentCategory].flatMap(
        (child) => child.slug
      );
      setSelectedCategories((prevSelected) => [
        ...new Set([...prevSelected, parentCategory, ...allChildSlugs]),
      ]);
    }
  };

  const renderCategories = (categories) => {
    return categories.map((category) => (
      <li key={category.slug} className="form-check">
        <input
          type="checkbox"
          class="form-check-input"
          checked={selectedCategories.includes(category.slug)}
          onChange={() => handleCheckboxChange(category)}
        />
        <label class="form-check-label">{category.title}</label>

        {category.children && category.children.length > 0 && (
          <ul>{renderCategories(category.children)}</ul>
        )}
      </li>
    ));
  };

  return (
    <ul className="list-unstyled">
      {Object.keys(categories).map((parentCategory) => (
        <li key={parentCategory} className="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            checked={selectedCategories.includes(parentCategory)}
            onChange={() => handleParentCheckboxChange(parentCategory)}
          />
          <label class="form-check-label">{parentCategory}</label>
          <ul>{renderCategories(categories[parentCategory])}</ul>
        </li>
      ))}
    </ul>
  );
};

export default CategoryFilter;
