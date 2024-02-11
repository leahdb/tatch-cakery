import React, { useEffect, useState } from "react";
import { fetch_shop_products } from "../../services/shop/products";
import CategoryFilter from "./CategoryFilter";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productCount, setProductCount] = useState();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortingOption, setSortingOption] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [pagination, setPagination] = useState({});

  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  const handleCategoryChange = (selectedCategory) => {
    const categoryId = selectedCategory.id;

    // Check if the category is already selected
    if (selectedCategories.includes(categoryId)) {
      // If selected, remove it and its parent (if applicable)
      setSelectedCategories((prevSelected) => {
        const updatedSelected = prevSelected.filter((id) => id !== categoryId);

        return updatedSelected;
      });
    } else {
      // If not selected, add it
      setSelectedCategories((prevSelected) => [
        ...new Set([...prevSelected, categoryId]),
      ]);
    }
  };

  useEffect(() => {
    fetch_shop_products({
      categories: selectedCategories.map((category) => category),
      brands: selectedBrands,
      minPrice,
      maxPrice,
      sort: sortingOption,
      perPage,
      currentPage,
    }).then((res) => {
      if (res.status === "ok") {
        setPagination(res);
        if (res.data) {
          setProducts(res.data);
          setProductCount(res.total);
          setBrands(res.brands);
          setCategories(res.categories);
        }
      }
    });
  }, [
    selectedCategories,
    selectedBrands,
    minPrice,
    maxPrice,
    sortingOption,
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
      <div class="row">
        <div class="col-lg-3">
          <button
            class="btn btn-outline-secondary mb-3 w-100 d-lg-none"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>Show filter</span>
          </button>
          <div
            class="collapse card d-lg-block mb-5"
            id="navbarSupportedContent"
          >
            <div class="accordion" id="accordionPanelsStayOpenExample">
              <div class="shadow-sm">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button text-primary fw-bold border-none bg-light"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#panelsStayOpen-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne"
                  >
                    Category
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                >
                  <div class="accordion-body scrollable-checkboxes">
                    <CategoryFilter
                      categories={categories}
                      onChange={handleCategoryChange}
                    />
                  </div>
                </div>
              </div>
              <div class="shadow-sm">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button text-primary fw-bold border-none bg-light"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#panelsStayOpen-collapseTwo"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseTwo"
                  >
                    Brands
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseTwo"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingTwo"
                >
                  <div class="accordion-body">
                    <div>
                      {Object.keys(brands).map((key) => (
                        <div key={key} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`flexCheckChecked${key}`}
                            checked={selectedBrands.includes(brands[key])}
                            onChange={() =>
                              setSelectedBrands((prevSelectedBrands) => {
                                if (prevSelectedBrands.includes(brands[key])) {
                                  return prevSelectedBrands.filter(
                                    (brand) => brand !== brands[key]
                                  );
                                } else {
                                  return [...prevSelectedBrands, brands[key]];
                                }
                              })
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`flexCheckChecked${key}`}
                          >
                            {brands[key]}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div class="shadow-sm">
                <h2 class="accordion-header" id="headingOne">
                  <button
                    class="accordion-button text-primary fw-bold border-none bg-light"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#panelsStayOpen-collapseThree"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree"
                  >
                    Price
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseThree"
                  class="accordion-collapse collapse show"
                  aria-labelledby="headingThree"
                >
                  <div class="accordion-body">
                    <div class="row my-3">
                      <div class="col-6">
                        <div class="form-outline">
                          <input
                            type="number"
                            id="typeNumber"
                            class="form-control"
                            placeholder="min $"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                          />
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="form-outline">
                          <input
                            type="number"
                            id="typeNumber"
                            class="form-control"
                            placeholder="max $"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <header class="d-sm-flex align-items-center border-bottom mb-4 pb-3">
            <strong class="d-block py-2">{productCount} Items found </strong>
            <div class="ms-auto">
              <select
                className="form-select d-inline-block w-auto border pt-1"
                value={sortingOption}
                onChange={handleSortingChange}
              >
                <option value="0">Best Match</option>
                <option value="1">Price: Low to High</option>
                <option value="2">Price: High to Low</option>
              </select>
            </div>
          </header>

          <div class="row g-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="col-lg-4 col-md-6 col-sm-6 d-flex"
              >
                <div className="card w-100 my-2 shadow">
                  <div className="d-flex justify-content-center">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      height={200}
                    />
                  </div>

                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title fs-6">{product.name}</h5>
                      <p className="card-text fs-6 text-primary">
                        ${product.price}
                      </p>
                    </div>

                    <div className="d-flex align-items-end justify-content-center px-0 pb-0 mt-4">
                      <a
                        href="#!"
                        className="btn btn-primary px-3 shadow-0 me-2"
                      >
                        <i class="bi bi-cart-plus fs-5 py-1"></i>
                      </a>
                      <a
                        href="#!"
                        className="btn btn-light border px-3 pt-2 icon-hover"
                      >
                        <i class="bi bi-heart-fill fs-5 py-1 text-primary"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
