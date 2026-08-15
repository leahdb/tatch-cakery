import React from "react";
import { formatLBP } from "../../services/utils/currency";

const ProductCard = ({ product }) => (
  <a href={`/products/${product.slug}`} className="card newest w-100 shadow my-2">
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
          {formatLBP(product.price)}
        </p>
      </div>
    </div>
  </a>
);

export default ProductCard;
