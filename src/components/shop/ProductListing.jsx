import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetch_shop_products } from "../../services/shop/products";
import CategoryFilter from "./CategoryFilter";

const ProductListing = () => {
  const { categorySlug } = useParams();
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

  const productss = [
    {
      id: 1,
      name: "Raspberry Pi 4 Model B",
      price: 35.99,
      imageSrc:
        "https://www.seeedstudio.com/blog/wp-content/uploads/2019/06/WechatIMG1371.png",
    },
    {
      id: 2,
      name: "Arduino Uno R3",
      price: 24.99,
      imageSrc:
        "https://rukminim1.flixcart.com/image/1664/1664/j76i3rk0/learning-toy/j/z/8/arduino-uno-r3-board-with-dip-atmega328p-adraxx-original-imaexh74faqkvygt.jpeg?q=90",
    },
    {
      id: 3,
      name: "ESP8266 WiFi Module",
      price: 3.49,
      imageSrc:
        "https://tse1.mm.bing.net/th?id=OIP.5LofEV_I-Y9PG-53g9Iu5AHaHa&pid=Api&P=0&h=220",
    },
    {
      id: 4,
      name: "MPU6050 Gyroscope and Accelerometer Module",
      price: 15.99,
      imageSrc:
        "https://tse3.mm.bing.net/th?id=OIP.9F2kvsmNfU-ekR6VZwVu4QHaFx&pid=Api&P=0&h=220",
    },
    {
      id: 5,
      name: "DHT22 Temperature and Humidity Sensor",
      price: 9.99,
      imageSrc:
        "https://tse3.mm.bing.net/th?id=OIP.QZI5OE82YcwbFmafi3MSmAHaHa&pid=Api&P=0&h=220",
    },
    {
      id: 6,
      name: "BME280 Environmental Sensor",
      price: 8.99,
      imageSrc:
        "https://images-na.ssl-images-amazon.com/images/I/41j5cHWfpDL.jpg",
    },
    {
      id: 7,
      name: "Breadboard Jumper Wires Kit",
      price: 6.99,
      imageSrc:
        "https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,q_auto,w_700/c_pad,w_700/F7916454-01",
    },
    {
      id: 8,
      name: "STMicroelectronics Nucleo-F401RE Development Board",
      price: 19.99,
      imageSrc: "https://media.rs-online.com/f_auto/F8029425-01.jpg",
    },
    {
      id: 9,
      name: "LM317 Adjustable Voltage Regulator",
      price: 1.99,
      imageSrc:
        "https://i5.walmartimages.com/asr/becb1f3d-da68-4fe4-ae95-1a031d7e068a_1.590bdaf485016abeff4daf43c9ff3a85.jpeg",
    },
    {
      id: 10,
      name: "Soldering Iron Kit",
      price: 29.99,
      imageSrc:
        "https://tse3.mm.bing.net/th?id=OIP.w9Q9-ejAmxUgg0v6tezclgHaHa&pid=Api&P=0&h=220",
    },
  ];

  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  const handleCategoryChange = (selectedCategory) => {
    const categorySlug = selectedCategory.slug;

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
    setSelectedCategories((prevSelected) => [
      ...new Set([...prevSelected, +categoryId]),
    ]);
    setProducts(productss);
  }, []);

  // useEffect(() => {
  //   fetch_shop_products({
  //     categories: selectedCategories.map((category) => category),
  //     brands: selectedBrands,
  //     minPrice,
  //     maxPrice,
  //     sort: sortingOption,
  //     perPage,
  //     currentPage,
  //   }).then((res) => {
  //     if (res.status === "ok") {
  //       setPagination(res);
  //       if (res.data) {
  //         setProducts(res.data);
  //         setProductCount(res.total);
  //         setBrands(res.brands);
  //         setCategories(res.categories);
  //         if(localStorage["category_refresh"]===false) {
  //           window.location.href = "/products";
  //           localStorage.setItem("category_refresh", true);
  //         }
  //       }
  //     }
  //   });
  // }, [
  //   selectedCategories,
  //   selectedBrands,
  //   minPrice,
  //   maxPrice,
  //   sortingOption,
  //   perPage,
  //   currentPage,
  // ]);

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
        <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
          <strong className="d-block py-2">{productCount} Items found </strong>
          <div className="ms-auto">
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

        <div className="row g-3">
          {products.map((product) => (
            <div key={product.id} className="col-lg-3 col-6 d-flex">
              <div className="card w-100 my-2 shadow">
                <div className="d-flex justify-content-center">
                  <img
                    src={product.imageSrc}
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
                    <a href="#!" className="btn btn-primary px-3 shadow-0 me-2">
                      <i className="bi bi-cart-plus fs-5 py-1"></i>
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
  );
};

export default ProductListing;
