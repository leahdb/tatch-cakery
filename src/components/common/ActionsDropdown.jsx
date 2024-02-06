import React from "react";
import Select from "react-select";
import { dropdownCaret } from "../../resources/themes/dashboard-v1/icons/icons";

const ActionsDropdown = ({
  options,
  item,
  assign,
  handleApprove,
  handleReject,
  handleFulfill,
  modalTrigger,
  type,
  index
}) => {
  return (
    <div className="d-flex flex-row mb-1">
      <button
        className="btn btn-primary mark-complete actions-dropdown"
        data-bs-toggle="dropdown"
      >
        Actions
      </button>
      <div className="dropdown mark-dropdown">
        <button
          className="btn btn-primary mark-dropdown-btn"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {dropdownCaret}
        </button>
        <ul
          className="dropdown-menu p-3 table-dropdown"
          aria-labelledby="dropdownMenuLink"
        >
          <li
            className="btn d-flex justify-content-center p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Select
              options={options}
              className="basic-multi-select w-100 bg-light"
              classNamePrefix="select"
              placeholder={
                type === "order"
                  ? "Select Delivery Option"
                  : "Assign to Employee"
              }
              onChange={(selected) => {
                assign(item.id, selected.value);
              }}
            />
          </li>
          <li
            className="btn mark-accept d-flex justify-content-center mt-2"
            onClick={() => handleApprove(item.id)}
          >
            Accept {type === "order" ? "Order" : "& Add to Calendar"}
          </li>
          <li
            className="btn mark-refuse d-flex justify-content-center mt-2"
            onClick={() => handleReject(item.id)}
          >
            Refuse {type === "order" ? "Order" : ""}
          </li>
          {type === "order" ? (
            <li
              className="btn btn-secondary d-flex justify-content-center mt-2"
              onClick={() => modalTrigger(index)}
            >
              Order Details
            </li>
          ) : (
            <li
              className="btn mark-accept d-flex justify-content-center mt-2"
              onClick={() => handleFulfill(item.id)}
            >
              Mark as Fulfilled
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ActionsDropdown;
