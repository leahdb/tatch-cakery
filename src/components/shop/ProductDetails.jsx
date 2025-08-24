import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { fetch_shop_product } from "../../services/shop/products";
import { add_to_cart } from "../../services/shop/cart";


const ProductDetails = ({setCartCount}) => {
  // const product = {
  //   id: 1,
  //   name: "Raspberry Pi 4 Model B",
  //   brand_name: "Brand Name", // Fill in the brand name property
  //   price: 35.99,
  //   image:
  //     "https://www.seeedstudio.com/blog/wp-content/uploads/2019/06/WechatIMG1371.png",
  //   description: "Product description goes here.",
  //   description2: "Additional description goes here.",
  //   description3: "Even more description goes here.",
  //   images: [
  //     {
  //       id: 1,
  //       image:
  //         "https://tse4.mm.bing.net/th?id=OIP.AqbMVg88672GzWP3v63dNgHaFj&pid=Api&P=0&h=220",
  //     },
  //     {
  //       id: 2,
  //       image:
  //         "https://tse2.mm.bing.net/th?id=OIP.KmOmoXeGLiSJVFS9lHn8GAHaFS&pid=Api&P=0&h=220",
  //     },
  //   ], // Fill in the images property with an array of objects
  // };

  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(1);
  const [buttonText, setButtonText] = useState("Add to cart")

  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const increase = () => {
    setQty(qty + 1);
  };

  useEffect(() => {
    fetch_shop_product(slug).then((res) => {
        if (res.status === "ok") {
          setProduct(res.data);
        }
    });
  }, []);

  const handleAddToCart = () => {
    setButtonText("Adding...")
    add_to_cart({
      product_id: product.id,
      quantity: qty,
    }).then((res) => {
      setCartCount(res.total_items);
      setButtonText("Add to cart")
      alert("Product added to cart successfully"); // "Product added to cart successfully
    });
  };

  return (
    <div className="container my-md-5 my-3">
      <div className="row g-md-5 d-flex justify-content-between">
        <div className="col-md-6 col-12 px-0 px-md-4">
          <a href={product.image_path} data-fancybox="gallery">
            <img
              src={product.image_url}
              className="d-block w-100 carousel-image"
              alt="Product"
            />
          </a>
          {/* <div className="thumbnail-container mt-5">
            {product.images.map((image, index) => (
              <a
                key={index}
                href={image}
                data-fancybox="gallery"
                className="thumbnail"
              >
                <img src={image.image} alt={`Thumbnail ${index + 1}`} />
              </a>
            ))}
          </div> */}
        </div>
        <div className="col-md-6 col-12">
          <div className="row px-2">
            <h3 className="mb-1 text-light-brown fw-bold pt-md-3 pt-4">{product.name}</h3>

            <span className="fs-5 mt-1 mt-md-2 fw-bold color-primary">${product.price}</span>

            <p className="pt-3 mt-4 mx-0">{product.description}</p>
          </div>

          <div className="row pt-3 mt-4 mx-0 gy-md-0 gy-3">
            <div className="col-12 col-md-6">
              <div className="input-group border border-brown w-100 small-h">
                <button
                  className="btn color-primary fs-5"
                  type="button"
                  onClick={decrease}
                >
                  −
                </button>
                <input
                  type="text"
                  className="form-control text-center p-0 border-0 bg-light-beige color-primary fs-5 fw-bold"
                  value={qty}
                  readOnly
                />
                <button
                  className="btn color-primary fs-5"
                  type="button"
                  onClick={increase}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <button className="btn btn-primary w-100 rounded-0 h-100 small-h" onClick={handleAddToCart}>{buttonText}</button>
            </div>
          </div>

          <div className="row border-top pt-3 mt-5 mx-0">
            <h5 className="fw-semibold text-dark mb-4">Description</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
