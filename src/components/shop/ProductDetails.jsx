import React, { useEffect, useState } from "react";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { fetch_shop_product } from "../../services/shop/products";


const ProductDetails = () => {
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

  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch_shop_product().then((res) => {
        if (res.status === "ok") {
          setProduct(res.data);
        }
      });
    }, []);

  return (
    <div className="container my-5">
      <div className="row d-flex justify-content-between">
        <div className="col-md-6 col-12 ps-0 pe-5">
          <a href={product.image} data-fancybox="gallery">
            <img
              src={product.image}
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
        <div className="col-md-6 col-12 ps-5 pe-0">
          <h4 className="mb-1">{product.name}</h4>

          <span className="fs-5 fw-bold text-black">${product.price}</span>

          <div className="row border-top pt-3 mt-5 mx-0">
            <h5 className="fw-semibold text-dark mb-4">About the Product</h5>
            <p>{product.description}</p>
          </div>

          <div className="row border-top pt-3 mt-5 mx-0">
            <h5 className="fw-semibold text-dark mb-4">Additional Info</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
