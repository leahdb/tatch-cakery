import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import printIcon from "../../resources/themes/dashboard-v1/icons/print.svg";
import SearchBar from "./SearchBar";
import { notify_promise } from "../../services/utils/toasts";
import DataFilterButtons, { STYLE_LINKS } from "./DataFilterButtons";

const ListingPageControls = ({
  type,
  addNewLink,
  hasTitle,
  hasTabs,
  title,
  resultType,
  filters,
  newShopsCount,
  hasSingleTitle,
  isCalendar,
  buttonAndTabs,
  setSearch,
  addOnly
}) => {

  return (
    <>
      <div className="no-print d-flex flex-xl-row flex-column justify-content-between align-items-center mb-4 max-height-btn">
        <div
          className={`d-flex flex-row control-container gap-2 ${
            hasTabs ? "align-items-end" : ""
          }`}
        >
          {hasTitle ? (
            <div className="mb-4">
              <span className="fw-bold dashboard-title">{title}</span>
              <div className="breadcrumbs path fw-semibold gap-2 d-flex flex-row">
                <Link className={"link"} to={"/admin/services/categories"}>
                  Services
                </Link>
                <span>&gt;</span>
                <span>New Service</span>
              </div>
            </div>
          ) : hasTabs ? (
            <>
              {filters.length > 0 ? (
                <DataFilterButtons
                  filters={filters}
                  newShopsCount={newShopsCount}
                  style={STYLE_LINKS}
                />
              ) : (
                ""
              )}
            </>
          ) : hasSingleTitle ? (
            <h1 className="dashboard-title">{resultType}s</h1>
          ) : isCalendar || addOnly || buttonAndTabs ? (
            <Link to={addNewLink} className={"btn btn-primary"}>
              + Add New {type}
            </Link>
          ) : (
            <>
              <Link to={addNewLink} className={"btn btn-primary"}>
                + Add New {type}
              </Link>
            </>
          )}
        </div>

        <div className={"page-control-container d-flex flex-row gap-1"}>
          {isCalendar ? (
            <></>
          ) : (
            <SearchBar
              type="list"
              resultType={resultType}
              setSearch={setSearch}
            />
          )}
          <div className="mb-xl-0 mb-3">
            <button
              className={"btn btn-primary btn-light-primary"}
              onClick={() => {
                window.print();
              }}
            >
              Print
              <img
                className={"btn-icon btn-icon-right"}
                src={printIcon}
                alt="print icon"
              />
            </button>
          </div>
        </div>
      </div>
      {buttonAndTabs ? (
        <>
          {filters.length > 0 ? (
            <DataFilterButtons
              filters={filters}
              newShopsCount={newShopsCount}
              style={STYLE_LINKS}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ListingPageControls;
