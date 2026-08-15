import React, { useEffect, useState } from "react";
import { fetch_categories, reorder_categories } from "../../../services/dashboard/categories";
import { notify_promise } from "../../../services/utils/toasts";

const CategoryOrderPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch_categories().then((res) => {
      if (res.status === "ok") setCategories(res.data);
    });
  }, []);

  const move = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const reordered = [...categories];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];

    const previous = categories;
    setCategories(reordered);

    notify_promise(
      reorder_categories(reordered.map((c) => c.id)).then((res) => {
        if (res.status !== "ok") {
          setCategories(previous);
          throw res;
        }
        return res;
      })
    );
  };

  return (
    <div className="page-content products py-3 px-4 flex-grow-1 flex-shrink-1 bg-lightgray">
      <div className="mb-4">
        <span className="fw-bold dashboard-title">Category Order</span>
      </div>
      <div className="inputs-container bg-white p-3">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="d-flex align-items-center justify-content-between py-2 border-bottom"
          >
            <span>{category.title}</span>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary btn-sm"
                disabled={index === 0}
                onClick={() => move(index, -1)}
              >
                &uarr;
              </button>
              <button
                className="btn btn-outline-primary btn-sm"
                disabled={index === categories.length - 1}
                onClick={() => move(index, 1)}
              >
                &darr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryOrderPage;
