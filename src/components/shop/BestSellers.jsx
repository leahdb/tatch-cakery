import React from "react";
import ProductCard from "./ProductCard";

const BestSellers = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="container my-4">
      <div className="row g-3 my-md-5">
        <div className="col-12">
          <h3 className="fw-bold text-muted mb-0 mb-md-2">Best Sellers</h3>
        </div>
        {products.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-6 col-6 d-flex">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
