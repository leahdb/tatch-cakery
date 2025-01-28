import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import locationIcon from "../../resources/themes/dashboard-v1/icons/location-pin.svg";
import personIcon from "../../resources/themes/dashboard-v1/icons/person.svg";
import phoneIcon from "../../resources/themes/dashboard-v1/icons/phone.svg";
import editIcon from "../../resources/themes/dashboard-v1/icons/edit.svg";
import deleteIcon from "../../resources/themes/dashboard-v1/icons/delete.svg";
import viewIcon from "../../resources/themes/dashboard-v1/icons/eye.svg";
import viewWhiteIcon from "../../resources/themes/dashboard-v1/icons/eyeWhite.svg";
import editWhiteIcon from "../../resources/themes/dashboard-v1/icons/editWhite.svg";
import deleteWhiteIcon from "../../resources/themes/dashboard-v1/icons/deleteWhite.svg";
import approveIcon from "../../resources/themes/dashboard-v1/icons/approveIcon.svg";
import approveWhiteIcon from "../../resources/themes/dashboard-v1/icons/approveWhiteIcon.svg";
import ShelterIcon from "../../resources/themes/dashboard-v1/icons/shelter.svg";
import PhoneIconBlack from "../../resources/themes/dashboard-v1/icons/phoneblack.svg";
import LocationIcon from "../../resources/themes/dashboard-v1/icons/location-pin-black.svg";
import { getNestedProperty } from "../../services/utils/objects";
import { notify_promise } from "../../services/utils/toasts";
import { isSet } from "immutable";
import Select from "react-select";
import ActionsDropdown from "./ActionsDropdown";

const ItemListingTable = ({
  fields,
  data,
  pagination,
  updateTableInfo,
  modalTrigger,
  handleApprove,
  handleReject,
  handleFulfill,
  customTDs,
  options,
  assign,
}) => {
  const [fieldMap, setFieldMap] = useState({});
  const [fieldKeys, setFieldKeys] = useState([]);
  const [hasPagination, setHasPagination] = useState(false);

  // Take fields array and group them by "key" in a map
  useEffect(() => {
    let newFieldMap = fields.reduce((acc, field) => {
      const { key, ...rest } = field;
      acc[key] = { key, ...rest };
      return acc;
    }, {});

    setFieldMap(newFieldMap);
    setFieldKeys(Object.keys(newFieldMap));
    setHasPagination(
      pagination !== undefined && Object.keys(pagination).length > 0
    );
  }, [fields]);

  const columns = fieldKeys.map((fieldKey) => {
    const field = fieldMap[fieldKey];
    return {
      name: field.label,
      selector: (row) => row[fieldKey],
      sortable: true,
      cell: (row, rowIndex) => {
        if (customTDs !== undefined && customTDs[field.key] !== undefined) {
          return customTDs[field.key](row);
        }
        return (
          <TableData
            field={field}
            index={rowIndex}
            item={row}
            modalTrigger={modalTrigger}
            handleApprove={handleApprove}
            handleReject={handleReject}
            handleFulfill={handleFulfill}
            options={options}
            assign={assign}
          />
        );
      },
    };
  });

  const customStyles = {
    rows: {
      style: {
        minHeight: "100px",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#5A5A5A",
        textAlign: "center",
      },
    },
    cells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#161616",
      },
    },
  };

  let paginationControls = null;
  if (hasPagination) {
    paginationControls = (
      <ItemListingPaginationControls
        pagination={pagination}
        updateTableInfo={updateTableInfo}
      />
    );
  }

  return (
    <div className="item-listing-table">
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        striped
        highlightOnHover
        noHeader
        className="rounded-4 table-space"
      />
      {paginationControls}
      {/* Table Control */}
    </div>
  );
};

const ItemListingPaginationControls = ({ pagination, updateTableInfo }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const handlePageClick = (page) => {
    updateTableInfo(page, perPage);
    setCurrentPage(page);
  };

  const handlePerPageChange = (event) => {
    const newPerPage = parseInt(event.target.value);
    localStorage.setItem("per_page", newPerPage);
    setPerPage(newPerPage);
    updateTableInfo(currentPage, newPerPage);
  };

  return (
    <div className="d-flex flex-lg-row flex-md-column flex-sm-row flex-column justify-content-between align-items-center mt-4 no-print">
      <div className="d-flex align-items-center mb-lg-0 mb-3">
        <p className="light-black m-0 me-4">Rows Display per page</p>
        <select
          className="drop-down"
          name="rows"
          id=""
          value={perPage}
          onChange={handlePerPageChange}
        >
          <option key={5} value="5">
            05
          </option>
          <option key={10} value="10">
            10
          </option>
          <option key={20} value="20">
            20
          </option>
        </select>
      </div>

      <div className="pagination-controls d-flex gap-3">
        <button
          disabled={pagination.links[0].url === null}
          className={"prev-btn fw-bold"}
          onClick={() => {
            const params = new URLSearchParams(
              pagination.links[0].url.split("?")[1]
            );
            const page = params.has("page") ? parseInt(params.get("page")) : 1;
            handlePageClick(page);
          }}
        >
          &laquo; Previous
        </button>

        <div className="pagination-buttons">
          {pagination.links.map((link, index) => {
            let className = "page-number-btn";
            let label = link.label;
            let isDisabled = link.url == null;

            if (index === 0 || index === pagination.links.length - 1) {
              return <div key={index}></div>;
            }

            if (index === currentPage) {
              className += " text-white bg-primary";
            }

            if (isDisabled) {
              className += " btn-disabled";
            }

            return (
              <button
                key={index}
                disabled={isDisabled}
                className={className + " fw-bold"}
                onClick={() => {
                  const params = new URLSearchParams(link.url.split("?")[1]);
                  const page = params.has("page")
                    ? parseInt(params.get("page"))
                    : 1;
                  handlePageClick(page);
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <button
          disabled={pagination.links[pagination.links.length - 1].url === null}
          className={"prev-btn fw-bold"}
          onClick={() => {
            const params = new URLSearchParams(
              pagination.links[pagination.links.length - 1].url.split("?")[1]
            );
            const page = params.has("page") ? parseInt(params.get("page")) : 1;
            handlePageClick(page);
          }}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

const TDCustomer = ({ customer }) => (
  <>
    <div>
      <img src={personIcon} alt="Person Icon" width={20} />
      <span>{customer.full_name}</span>
    </div>
    <div>
      <img src={phoneIcon} alt="Phone Icon" width={20} />
      <span>{customer.phone_number}</span>
    </div>
    <div>
      <img src={locationIcon} alt="Location Icon" width={20} />
      <span>{customer.address}</span>
    </div>
  </>
);

const TDButton = ({
  button,
  item,
  index,
  modalTrigger,
  handleApprove,
  handleReject,
  handleFulfill,
  options,
  assign,
}) => {
  const [redirectTo, setRedirectTo] = useState(undefined);

  let buttonContent = "";
  let buttonClass = `btn btn-icon d-flex flex-row justify-content-center align-items-center m-1 ${
    button.template === "dropdown" || button.template === "orderDropdown"
      ? "p-0"
      : ""
  }`;
  let btnOnClick = () => {};
  let title = "";

  switch (button.template) {
    case "details-modal":
      buttonContent = "See Details";
      buttonClass = "details-btn";
      btnOnClick = () => {
        modalTrigger(index);
      };
      break;
    case "view-modal":
      buttonContent = (
        <>
          <img src={viewIcon} className="hide-hover-item" alt="view icon" />
          <img src={viewWhiteIcon} className="hover-item" alt="view icon" />
        </>
      );
      buttonClass += " btn-icon-light-info";
      btnOnClick = () => {
        modalTrigger(index);
      };
      break;
    case "view":
      buttonContent = (
        <>
          <img src={viewIcon} className="hide-hover-item" alt="view icon" />
          <img src={viewWhiteIcon} className="hover-item" alt="view icon" />
        </>
      );
      buttonClass += " btn-icon-light-info";
      btnOnClick = () => {
        let url = button.getRedirectURL().replaceAll(":id", item.id);
        setRedirectTo(url);
      };
      break;
    case "edit":
      buttonContent = (
        <>
          <img src={editIcon} className="hide-hover-item" alt="edit icon" />
          <img src={editWhiteIcon} className="hover-item" alt="edit icon" />
        </>
      );
      buttonClass += " btn-icon-light-warning";
      btnOnClick = () => {
        let url = button.getRedirectURL().replaceAll(":id", item.id);
        setRedirectTo(url);
      };
      break;
    case "delete":
      buttonContent = (
        <>
          <img src={deleteIcon} className="hide-hover-item" alt="delete icon" />
          <img src={deleteWhiteIcon} className="hover-item" alt="delete icon" />
        </>
      );
      buttonClass += " btn-icon-light-danger";
      btnOnClick = () => {
        button.onClick(item.id);
      };
      break;
    case "approve":
      buttonContent = (
        <>
          <img
            src={approveIcon}
            className="hide-hover-item"
            alt="approve icon"
          />
          <img
            src={approveWhiteIcon}
            className="hover-item"
            alt="approve icon"
          />
        </>
      );
      buttonClass += " btn-icon-light-success";
      btnOnClick = () => {
        handleApprove(item.id);
      };
      title = "accept";
      break;
    case "reject":
      buttonContent = (
        <>
          <img src={deleteIcon} className="hide-hover-item" alt="reject icon" />
          <img src={deleteWhiteIcon} className="hover-item" alt="reject icon" />
        </>
      );
      buttonClass = "btn btn-icon btn-icon-light-danger m-1";
      btnOnClick = () => {
        handleReject(item.id);
      };
      title = "refuse";
      break;
    case "fulfill":
      buttonContent = (
        <>
          <img
            src={approveIcon}
            className="hide-hover-item"
            alt="approve icon"
          />
          <img
            src={approveWhiteIcon}
            className="hover-item"
            alt="approve icon"
          />
        </>
      );
      buttonClass += " btn-icon-light-success";
      btnOnClick = () => {
        handleFulfill(item.id);
      };
      title = "mark as fulfilled";
      break;
    case "dropdown":
      buttonContent = (
        <ActionsDropdown
          options={options}
          item={item}
          assign={assign}
          handleApprove={handleApprove}
          handleReject={handleReject}
          handleFulfill={handleFulfill}
          type="booking"
        />
      );
      break;
    case "orderDropdown":
      buttonContent = (
        <ActionsDropdown
          options={options}
          item={item}
          assign={assign}
          handleApprove={handleApprove}
          handleReject={handleReject}
          modalTrigger={modalTrigger}
          index={index}
          type="order"
        />
      );
      break;
    default:
      buttonContent = "";
      break;
  }

  if (redirectTo !== undefined) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <button className={buttonClass} onClick={btnOnClick} title={title}>
      {buttonContent}
    </button>
  );
};

const TDBadge = ({ item, field }) => {
  let textClasses = {
    service: "bg-success",
    shelter: "bg-orange",
    product: "bg-info",
    Adopted: "bg-success",
    Approved: "bg-success",
    Rejected: "bg-danger",
  };

  let badgeText = getNestedProperty(item, field.key);

  let badgeClass = "bg-info";

  if (textClasses[badgeText] !== undefined) {
    badgeClass = textClasses[badgeText];
  } else if (badgeText === 1) {
    badgeText = "Active";
    badgeClass = "bg-success";
  } else if (badgeText === 0) {
    badgeText = "Inactive";
    badgeClass = "bg-danger";
  }

  return <div className={"badge " + badgeClass}>{badgeText}</div>;
};

const TableData = ({
  field,
  item,
  index,
  modalTrigger,
  handleApprove,
  handleReject,
  handleFulfill,
  options,
  assign,
}) => {
  switch (field.type) {
    case "user":
      return (
        <div className="fw-bold py-4" key={field.key}>
          {item.main_user ? item.main_user.first_name : ""}{" "}
          {item.main_user ? item.main_user.last_name : ""}
        </div>
      );
    case "address":
      return (
        <div className="fw-bold py-4" key={item.id}>
          {item.addresses.length > 0 ? (
            <>
              {item.addresses[0].street}, {item.addresses[0].city},{" "}
              {item.addresses[0].area}
            </>
          ) : (
            ""
          )}
        </div>
      );
    case "email":
      return (
        <div className="fw-bold py-4 email-cell" key={field.key}>
          {item.email}
        </div>
      );
    case "link":
      const fieldLink = field.href.replace(
        ":id",
        (() => {
          if (field.key === "name") {
            return item.id;
          } else if (field.key === "pet_name") {
            return item.pet.id;
          } else {
            return "";
          }
        })()
      );
      return (
        <div className="fw-bold py-4" key={field.key}>
          <Link to={fieldLink}>{item[field.key]}</Link>
        </div>
      );
    case "shelter":
      return (
        <div className="fw-bold py-4" key={field.key}>
          <div className="d-flex align-items-center">
            <img
              src={ShelterIcon}
              alt="shelter icon"
              width={18}
              className="me-1"
            />
            {item.shelter.name}
          </div>
          <div className="d-flex align-items-center">
            <img
              src={PhoneIconBlack}
              alt="phone icon"
              width={17}
              className="me-1"
            />
            {item.shelter.phone_number}
          </div>
          <div className="d-flex align-items-center">
            <img
              src={LocationIcon}
              alt="location icon"
              width={17}
              className="me-1"
            />
            {item.shelter.city}
          </div>
        </div>
      );
    case "image":
      return (
        <div className="fw-bold py-4" key={field.key}>
          <img
            className="img-thumbnail rounded-4"
            src={item[field.key]}
            alt="Product Image"
          />
        </div>
      );
    case "buttons":
      let tdClasses = field.classes ? field.classes : "text-center";
      tdClasses += " no-print";
      return (
        <div key={field.key} className={tdClasses}>
          {field.buttons.map((button, btnIndex) => {
            return (
              <TDButton
                button={button}
                item={item}
                index={index}
                modalTrigger={modalTrigger}
                handleApprove={handleApprove}
                handleReject={handleReject}
                handleFulfill={handleFulfill}
                key={field.key + "-" + btnIndex}
                options={options}
                assign={assign}
              />
            );
          })}
        </div>
      );
    case "badge":
      return (
        <div key={field.key} className={"text-center"}>
          <TDBadge item={item} field={field} />
        </div>
      );
    case "customer":
      let customer = item.customer;
      customer.address = `${item.address.city}, ${item.address.country}`;
      return (
        <div key={field.key}>
          <TDCustomer customer={customer} />
        </div>
      );
    default:
      return (
        <div className="fw-bold py-4" key={field.key}>
          {item[field.key]}
        </div>
      );
  }
};

export const getTableUpdateCallback = ({
  apiCall,
  dataSetter,
  paginationSetter,
  fieldSetter,
  buttons,
  setFilters,
  filterMapping,
  navigate,
  numericStatus,
  type,
  handleApprove,
  handleReject,
  handleDelete,
  setNewShopsCount,
  handleFulfill,
  setOptions,
}) => {
  let api_callback = apiCall[0];
  let api_options = apiCall[1];

  return (page) => {
    notify_promise(
      new Promise((resolve, reject) => {
        api_options["page"] = page;
        api_callback(api_options)
          .then((res) => {
            if (res.status === "error") {
              reject(res);
              return;
            }

            let tableFields = res.fields;
            if (setOptions)
              type === "booking"
                ? setOptions(res.employees)
                : setOptions(res.delivery_options);
            if (isSet(setNewShopsCount)) setNewShopsCount(res.new_shops_count);
            if (type === "shop") {
              if (numericStatus === "0") {
                buttons.push(
                  {
                    template: "approve",
                    onClick: (id) => {
                      handleApprove(id);
                    },
                  },
                  {
                    template: "reject",
                    onClick: (id) => {
                      handleReject(id);
                    },
                  }
                );
              } else if (numericStatus === "1") {
                buttons.push(
                  {
                    template: "edit",
                  },
                  {
                    template: "delete",
                    onClick: (id) => {
                      handleDelete(id);
                    },
                  }
                );
              }
            }
            if (type === "transfer") {
              if (numericStatus === "0") {
                buttons.push(
                  {
                    template: "approve",
                    onClick: (id) => {
                      handleApprove(id);
                    },
                  },
                  {
                    template: "reject",
                    onClick: (id) => {
                      handleReject(id);
                    },
                  }
                );
              } else if (numericStatus === "1") {
                buttons.push({
                  template: "delete",
                  onClick: (id) => {
                    handleDelete(id);
                  },
                });
              }
            }
            if (type === "booking") {
              buttons.push({
                template: "dropdown",
              });
            }
            if (type === "order") {
              buttons.push({
                template: "orderDropdown",
              });
            }

            tableFields.push({
              key: "actions",
              label: "Actions",
              type: "buttons",
              classes:
                "d-flex flex-row justify-content-center align-items-center actions-td",
              buttons: buttons,
            });
            dataSetter(res.data);
            fieldSetter(res.fields);
            paginationSetter({
              from: res.from,
              to: res.to,
              next_page_url: res.next_page_url,
              prev_page_url: res.prev_page_url,
              pages: res.pages,
              per_page: res.per_page,
              total: res.total,
              first_page_url: res.first_page_url,
              last_page: res.last_page,
              last_page_url: res.last_page_url,
              links: res.links,
            });

            if (res.filters !== undefined && res.filters.length > 0) {
              const baseRoutePetPath = {
                shop: "/admin/products/list/",
                booking: "/admin/services/appointments/",
                pet: "/admin/pets/list/",
                transfer: "/admin/transfers/",
              };
              setFilters(
                res.filters.map((filter) => {
                  return {
                    ...filter,
                    dataCallback: () => {
                      return Promise.resolve().then(() => {
                        if (type === "order") {
                          notify_promise(
                            new Promise((resolve, reject) => {
                              api_callback({ page: 1, filter: filter.value })
                                .then((res) => {
                                  if (res.status === "error") {
                                    reject(res);
                                    return;
                                  }

                                  tableFields.push({
                                    key: "actions",
                                    label: "Actions",
                                    type: "buttons",
                                  });
                                  dataSetter(res.data);
                                  fieldSetter(tableFields);
                                  paginationSetter({
                                    from: res.from,
                                    to: res.to,
                                    next_page_url: res.next_page_url,
                                    prev_page_url: res.prev_page_url,
                                    pages: res.pages,
                                    per_page: res.per_page,
                                    total: res.total,
                                    first_page_url: res.first_page_url,
                                    last_page: res.last_page,
                                    last_page_url: res.last_page_url,
                                    links: res.links,
                                  });

                                  resolve(res);
                                })
                                .catch(reject);
                            })
                          );
                        } else {
                          const basePath =
                            baseRoutePetPath[type] !== undefined
                              ? baseRoutePetPath[type]
                              : "";
                          let filterPath = filter.label;
                          // Exceptionally, booking > All should not have a filter
                          if (type === "booking" && filter.label === "All") {
                            filterPath = "";
                          }
                          navigate(basePath + filterPath, { replace: true });
                        }
                      });
                    },
                  };
                })
              );
            }

            resolve(res);
          })
          .catch(reject);
      })
    );
  };
};

export default ItemListingTable;
