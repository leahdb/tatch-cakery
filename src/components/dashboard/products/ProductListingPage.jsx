import React, { useEffect, useState } from "react";
import {
  delete_shop_products,
  fetch_shop_products,
  export_shop_products,
  search_shop_products,
  IMPORT_API,
} from "../../../services/dashboard/products";
import ItemListingTable, {
  getTableUpdateCallback,
} from "../../common/ItemListingTable";
import { useSearchParams } from "react-router-dom";
import { notify_promise } from "../../../services/utils/toasts";
import ProductPopup from "./ProductPopup";
import ImportFilePopup from "../../common/ImportFilePopup";
import ListingPageControls from "../../common/ListingPageControls";

const ProductListingPage = ({ pageState, setPageState }) => {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(undefined);

  const [fields, setFields] = useState([]);
  const [pagination, setPagination] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search"));
  const [latestSearchQuery, setLatestSearchQuery] = useState(
    searchParams.get("search")
  );

  const apiCall = [
    fetch_shop_products,
    { page: 0, search: search ? search : "" },
  ];

  const deleteItem = (id) => {
    notify_promise(
      new Promise((resolve, reject) => {
        delete_shop_products([id])
          .then((res) => {
            setProducts((prevProducts) => {
              return prevProducts.filter((p) => {
                return p.id !== id;
              });
            });
            resolve(res);
          })
          .catch(reject);
      })
    );
  };

  const openPopup = (productIndex) => {
    setSelectedProduct(products[productIndex]);
    const popup = document.getElementById("productPopup");
    popup.style.display = "flex";
  };

  const updateTableInfo = getTableUpdateCallback({
    apiCall: apiCall,
    dataSetter: setProducts,
    paginationSetter: setPagination,
    fieldSetter: setFields,
    buttons: [
      { template: "view-modal" },
      {
        template: "edit",
        getRedirectURL: (id) => {
          return "/admin/products/edit/:id";
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
      <ProductPopup product={selectedProduct} />
      <ImportFilePopup upload_endpoint={IMPORT_API} />
      <ListingPageControls
        type="product"
        addNewLink="/admin/products/add"
        hasTitle={false}
        resultType="product"
        setSearch={setSearchParams}
      />
      <ItemListingTable
        fields={fields}
        data={products}
        pagination={pagination}
        updateTableInfo={updateTableInfo}
        modalTrigger={openPopup}
      />
    </div>
  );
};

export default ProductListingPage;
