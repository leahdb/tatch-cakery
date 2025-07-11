import React from "react";

const ProductsMain = ({ categories, products }) => {
  return (
    <div className="container">
      {categories.map((category) => {
        const filteredProducts = products.filter(
          (product) => product.category_id === category.id
        );

        if (filteredProducts.length === 0) return null;

        return (
          <div key={category.id} className="my-5">
            <div className="row g-3 my-md-5">
              <div className="col-12 d-flex justify-content-start">
                <h3 className="fw-bold text-muted mb-2">{category.name}</h3>
                {/* <a href={`/category/${category.slug}`}>See All</a> */}
              </div>
              {filteredProducts.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="col-lg-3 col-md-6 col-6 d-flex"
                >
                  <a
                    href={`/products/${product.id}`}
                    className="card newest w-100 shadow my-2"
                  >
                    <div className="d-flex justify-content-center">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/${product.image}`}
                        className="card-img-top w-100"
                        alt={product.name}
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
          </div>
        );
      })}
    </div>
  );
};

export default ProductsMain;