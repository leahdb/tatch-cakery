import React, { useEffect, useState } from "react";

export const STYLE_BUTTONS = "buttons";
export const STYLE_LINKS = "links";

const DataFilterButtons = ({ filters, newShopsCount, style }) => {
  if (style === undefined) {
    style = STYLE_BUTTONS;
  }

  const [activeFilter, setActiveFilter] = useState(filters[0]);

  useEffect(() => {
    let activeFilterObj = filters.find((filter) => filter.active);
    activeFilterObj = activeFilterObj ? activeFilterObj : filters[0];
    setActiveFilter(activeFilterObj);
  }, [filters]);

  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = (newActiveValue) => {
    if (isDisabled) {
      return;
    }
    const newActiveFilterObj = filters.find(
      (filter) => filter.value === newActiveValue
    );
    setIsDisabled(true);
    setActiveFilter(newActiveFilterObj);
    if (newActiveFilterObj.dataCallback !== undefined) {
      newActiveFilterObj.dataCallback().then(() => {
        setIsDisabled(false);
      });
    }
  };

  return (
    <div
      className={
        style === STYLE_BUTTONS ? "data-filters" : "data-filters-links"
      }
    >
      <ul className="nav nav-tabs">
        {filters.map((filter) => {
          let isActive = activeFilter === filter;
          return (
            <li
              key={filter.value}
              className={`nav-item ${isActive ? "active" : ""}`}
            >
              <a className="nav-link" onClick={() => handleClick(filter.value)}>
                {filter.label === "New Joining Sellers" ? (
                  <span>
                    {filter.label} &nbsp;
                    <span className="badge rounded-pill bg-danger p-1">
                      {newShopsCount}
                    </span>
                  </span>
                ) : (
                  filter.label
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

DataFilterButtons.defaultProps = {
  filters: [{ label: "Recent", key: "recent" }],
};

export default DataFilterButtons;
