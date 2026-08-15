import React from "react";
import ProductCard from "./ProductCard";
const ProductsMain = ({ categories, products }) => {
  return (
    <div className="container">
      {categories.map((category) => {
        const filteredProducts = products.filter(
          (product) => product.category_id === category.id
        );

        if (filteredProducts.length === 0) return null;

        return (
          <div key={category.id} id={`category-${category.slug}`} className="my-4">
            <div className="row g-3 my-md-5">
              <div className="col-12 d-flex justify-content-between align-items-center">
                <h3 className="fw-bold text-muted mb-0 mb-md-2">{category.name}</h3>
                <a href={`/products/category/${category.slug}`} className="text-decoration-none fw-semibold">
                  See All
                </a>
              </div>
              {filteredProducts.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="col-lg-3 col-md-6 col-6 d-flex"
                >
                  <ProductCard product={product} />
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