import React, { useState } from "react";

const CategoryFilter = ({
  categories,
  onChange,
  selectedCategories,
  setSelectedCategories,
}) => {
  const handleCheckboxChange = (category) => {
    onChange(category);
    //Check if the category is already selected
    if (selectedCategories.includes(category.id)) {
      // If selected, remove it and its parent (if applicable)
      setSelectedCategories((prevSelected) => {
        const updatedSelected = prevSelected.filter((id) => id !== category.id);

        // Remove parent category if it exists and no other children are selected
        const parentCategory = getParentCategory(category.id);
        if (
          parentCategory &&
          !hasOtherChildrenSelected(parentCategory, updatedSelected)
        ) {
          return updatedSelected.filter((id) => id !== parentCategory);
        }

        return updatedSelected;
      });
    } else {
      // If not selected, add it
      setSelectedCategories((prevSelected) => [
        ...new Set([...prevSelected, category.id]),
      ]);
    }
  };

  const getParentCategory = (id) => {
    for (const parentCategory in categories) {
      const childCategories = categories[parentCategory];
      if (childCategories.some((child) => child.id === id)) {
        return parentCategory;
      }
    }
    return null;
  };

  const hasOtherChildrenSelected = (parentCategory, updatedSelected) => {
    const allChildSlugs = categories[parentCategory].flatMap(
      (child) => child.id
    );
    return allChildSlugs.some((id) => updatedSelected.includes(id));
  };

  const handleParentCheckboxChange = (parentCategory) => {
    onChange(parentCategory[0]);
    //Check if the category is already selected
    if (selectedCategories.includes(parentCategory[0].id)) {
      // If selected, remove it and its parent (if applicable)
      setSelectedCategories((prevSelected) => {
        const updatedSelected = prevSelected.filter(
          (id) => id !== parentCategory[0].id
        );

        return updatedSelected;
      });
    } else {
      const allChildSlugs = categories[parentCategory[0].title].flatMap(
        (child) => child.id
      );
      setSelectedCategories((prevSelected) => [
        ...new Set([...prevSelected, parentCategory[0].id, ...allChildSlugs]),
      ]);
    }
  };

  const renderCategories = (categories) => {
    return categories.map((category, index) => (
      <React.Fragment key={category.id}>
        {index > 0 && ( // Skip rendering for the first category
          <li className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCheckboxChange(category)}
            />
            <label className="form-check-label">{category.title}</label>

            {category.children && category.children.length > 0 && (
              <ul>{renderCategories(category.children)}</ul>
            )}
          </li>
        )}
      </React.Fragment>
    ));
  };

  return (
    <ul className="list-unstyled">
      {Object.keys(categories).map((parentCategory) => (
        <li key={parentCategory.id} className="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            checked={selectedCategories.includes(
              categories[parentCategory][0].id
            )}
            // onChange={() => handleCheckboxChange(categories[parentCategory][0])}
            onChange={() =>
              handleParentCheckboxChange(categories[parentCategory])
            }
          />
          <label class="form-check-label">
            {categories[parentCategory][0].title}
          </label>
          <ul>{renderCategories(categories[parentCategory])}</ul>
        </li>
      ))}
    </ul>
  );
};

export default CategoryFilter;
