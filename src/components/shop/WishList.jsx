import React from "react";

const ProductListing = () => {
  const products = [
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

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-12">
          <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
            <strong className="d-block py-2">2 Items in wishlist</strong>
            <div className="ms-auto">
              <select className="form-select d-inline-block w-auto border pt-1">
                <option value="0">Best match</option>
                <option value="1">Recommended</option>
                <option value="2">High rated</option>
                <option value="3">Randomly</option>
              </select>
            </div>
          </header>

          <div className="row g-3">
            {products.slice(0, 9).map((product) => (
              <div
                key={product.id}
                className="col-lg-3 col-md-6 col-sm-6 d-flex"
              >
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
                      <a
                        href="#!"
                        className="btn btn-primary px-3 shadow-0 me-2"
                      >
                        <i className="bi bi-cart-plus fs-5 py-1"></i>
                      </a>
                      <a
                        href="#!"
                        className="btn btn-light border px-3 pt-2 icon-hover"
                      >
                        <i className="bi bi-trash-fill fs-5 py-1 text-danger"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
