import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetch_shop_products } from "../../services/shop/products";

const ProductListing = () => {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [pagination, setPagination] = useState({});

  const slugToTitle = (slug) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    fetch_shop_products({
      categorySlug,
      perPage,
      currentPage,
    }).then((res) => {
      if (res.status === "ok") {
        setPagination(res);
        if (res.data) {
          setProducts(res.data);
          setProductCount(res.total);
          setLoading(false)
        }
      }
    });
  }, [
    perPage,
    currentPage,
  ]);

  const handlePerPageChange = (e) => {
    const newPerPage = parseInt(e.target.value, 10);
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container my-5">
      <div>
        <h2 className="fw-bold text-primary mb-3">{slugToTitle(categorySlug)}</h2>
        <div className="row g-3">
          {products.map((product) => (
            <div key={product.id} className="col-lg-3 col-6 d-flex">
              <a 
                href={`/products/${product.slug}`} 
                className="card newest w-100 my-2 shadow"
              >
                <div className="d-flex justify-content-center">
                  <img
                    src={product.image_url}
                    className="card-img-top w-100"
                    alt={product.name}
                    loading="lazy"
                  />
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fs-6">{product.name}</h5>
                    <p className="card-text fs-6 text-primary">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
        {
          productCount > perPage && 
          <div className="d-flex flex-lg-row flex-md-column flex-sm-row flex-column justify-content-between align-items-center mt-4">
            <div className="d-flex align-items-center mb-lg-0 mb-3">
              <p className="light-black m-0 me-4">Items per page</p>
              <select
                className="drop-down"
                name="rows"
                id=""
                value={perPage}
                onChange={handlePerPageChange}
              >
                <option key={5} value="5">
                  5
                </option>
                <option key={15} value="15" selected>
                  15
                </option>
                <option key={30} value="30">
                  30
                </option>
                <option key={60} value="60">
                  60
                </option>
              </select>
            </div>
            {pagination.links && (
              <div className="pagination-controls d-flex gap-3">
                <button
                  disabled={pagination.links[0].url === null}
                  className={"prev-btn fw-bold"}
                  onClick={() => {
                    const params = new URLSearchParams(
                      pagination.links[0].url.split("?")[1]
                    );
                    const page = params.has("page")
                      ? parseInt(params.get("page"))
                      : 1;
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
                          const params = new URLSearchParams(
                            link.url.split("?")[1]
                          );
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
                  disabled={
                    pagination.links[pagination.links.length - 1].url === null
                  }
                  className={"prev-btn fw-bold"}
                  onClick={() => {
                    const params = new URLSearchParams(
                      pagination.links[pagination.links.length - 1].url.split(
                        "?"
                      )[1]
                    );
                    const page = params.has("page")
                      ? parseInt(params.get("page"))
                      : 1;
                    handlePageClick(page);
                  }}
                >
                  Next &raquo;
                </button>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default ProductListing;
