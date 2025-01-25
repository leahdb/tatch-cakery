import React, { useEffect, useState } from "react";
import {
  delete_shop_orderss,
  fetch_shop_orders,
  export_shop_orders,
  search_shop_orders,
  IMPORT_API,
} from "../../../services/dashboard/orders";
import ItemListingTable, {
  getTableUpdateCallback,
} from "../../common/ItemListingTable";
import { useSearchParams } from "react-router-dom";
import { notify_promise } from "../../../services/utils/toasts";
import OrderPopup from "./OrderPopup";
import ImportFilePopup from "../../common/ImportFilePopup";
import ListingPageControls from "../../common/ListingPageControls";

const OrderListingPage = ({ pageState, setPageState }) => {
  const [orders, setOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(undefined);

  const [fields, setFields] = useState([]);
  const [pagination, setPagination] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search"));
  const [latestSearchQuery, setLatestSearchQuery] = useState(
    searchParams.get("search")
  );

  const apiCall = [
    fetch_shop_orders,
    { page: 0, search: search ? search : "" },
  ];

  const deleteItem = (id) => {
    notify_promise(
      new Promise((resolve, reject) => {
        delete_shop_orders([id])
          .then((res) => {
            setOrders((prevOrders) => {
              return prevOrders.filter((p) => {
                return p.id !== id;
              });
            });
            resolve(res);
          })
          .catch(reject);
      })
    );
  };

  const openPopup = (orderIndex) => {
    setSelectedOrder(orders[orderIndex]);
    const popup = document.getElementById("orderPopup");
    popup.style.display = "flex";
  };

  const updateTableInfo = getTableUpdateCallback({
    apiCall: apiCall,
    dataSetter: setOrders,
    paginationSetter: setPagination,
    fieldSetter: setFields,
    buttons: [
      { template: "view-modal" },
      {
        template: "edit",
        getRedirectURL: (id) => {
          return "/admin/orders/edit/:id";
        },
      },
      {
        template: "delete",
        onClick: (id) => {
          deleteItem(id);
        },
      },
    ],
  });

  useEffect(() => {
    updateTableInfo();
  }, [latestSearchQuery]);

  useEffect(() => {
    setSearch(searchParams.get("search"));
  }, [searchParams.get("search")]);

  useEffect(() => {
    setLatestSearchQuery(search);
  }, [search]);

  return (
    <div className="page-content py-5 px-4 bg-lightgray">
      <OrderPopup order={selectedOrder} />
      <ImportFilePopup upload_endpoint={IMPORT_API} />
      <ListingPageControls
        exportApi={export_shop_orders}
        type="order"
        addNewLink="/admin/orders/add"
        hasTitle={false}
        resultType="order"
        setSearch={setSearchParams}
      />
      <ItemListingTable
        fields={fields}
        data={orders}
        pagination={pagination}
        updateTableInfo={updateTableInfo}
        modalTrigger={openPopup}
      />
    </div>
  );
};

export default OrderListingPage;
