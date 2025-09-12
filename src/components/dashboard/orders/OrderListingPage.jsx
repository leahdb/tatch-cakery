import React, { useEffect, useState } from "react";
import ItemListingTable, {
  getTableUpdateCallback,
} from "../../common/ItemListingTable";
import { useSearchParams } from "react-router-dom";
import { notify_promise } from "../../../services/utils/toasts";
import OrderPopup from "./OrderPopup";
import {
  fetch_shop_orders,
  accept_order,
  refuse_order,
  set_delivery_option,
} from "../../../services/dashboard/orders";
import DataFilterButtons from "../../common/DataFilterButtons";
import SearchBar from "../../common/SearchBar";

const OrderListingPage = ({ pageState, setPageState }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search"));
  const [latestSearchQuery, setLatestSearchQuery] = useState(
    searchParams.get("search")
  );

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(undefined);

  const [fields, setFields] = useState([]);
  const [pagination, setPagination] = useState({});

  const [filters, setFilters] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState([]);
  const [activeFilter, setActiveFilter] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const openModal = (index) => {
    setSelectedOrder(orders[index]);
    const popup = document.getElementById("orderPopup");
    popup.style.display = "flex";
  };

  const handleApprove = (id) => {
    notify_promise(
      new Promise((resolve, reject) => {
        accept_order([id])
          .then((res) => {
            setOrders((data) => data.filter((item) => item.id !== id));
            resolve(res);
          })
          .catch(reject);
      })
    );
  };

  const handleReject = (id) => {
    notify_promise(
      new Promise((resolve, reject) => {
        refuse_order([id])
          .then((res) => {
            setOrders((data) => data.filter((item) => item.id !== id));
            resolve(res);
          })
          .catch(reject);
      })
    );
  };

  const setDeliveryOptions = (id, delivery_type) => {
    notify_promise(
      new Promise((resolve, reject) => {
        set_delivery_option(id, delivery_type)
          .then((res) => {
            resolve(res);
          })
          .catch(reject);
      })
    );
  };

  const apiCall = [
    fetch_shop_orders,
    { page: 1, filter: 'pending', search: search ? search : "", perPage: perPage },
  ];

  const updateTableInfo = getTableUpdateCallback({
    apiCall: apiCall,
    dataSetter: setOrders,
    paginationSetter: setPagination,
    fieldSetter: setFields,
    buttons: [],
    setFilters: setFilters,
    setActiveFilter: setActiveFilter,
    type: "order",
    handleApprove: handleApprove,
    handleReject: handleReject,
    setOptions: setDeliveryOption,
    openModal: openModal,
  });

  useEffect(() => {
    setSearch(searchParams.get("search"));
  }, [searchParams.get("search")]);

  useEffect(() => {
    setLatestSearchQuery(search);
  }, [search]);

  useEffect(() => {
    updateTableInfo(1);
  }, [latestSearchQuery, perPage]);

  return (
    <div className="page-content py-3 px-4 bg-lightgray">
      <OrderPopup
        order={selectedOrder}
        setOrders={setOrders}
        setSelectedOrder={setSelectedOrder}
      />
      <div className="d-flex flex-xl-row flex-column justify-content-between align-items-center mb-4">
        {filters.length > 0 ? <DataFilterButtons filters={filters} /> : ""}

        <SearchBar type="list" setSearch={setSearchParams} resultType="order" />
      </div>
      <div className={"text-right"}></div>
      <ItemListingTable
        fields={fields}
        data={orders}
        pagination={pagination}
        updateTableInfo={updateTableInfo}
        modalTrigger={openModal}
        handleApprove={handleApprove}
        handleReject={handleReject}
        assign={setDeliveryOptions}
        options={deliveryOption}
        setPerPage={setPerPage}
        perPage={perPage}
      />
    </div>
  );
};

export default OrderListingPage;
