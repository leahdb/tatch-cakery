import React, { useEffect, useState } from "react";
import { fetch_banners } from "../../services/shop/banners";

const ShopIntro = () => {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    fetch_banners().then((res) => {
      if (res.status === "ok") {
        setBanners(res.data);
      }
    });
  }, []);
  return (
    <div
      className="container card-banner p-5 bg-primary carousel slide"
      id="carouselIntro"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators mb-2">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselIntro"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner h-100">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            style={{
              backgroundImage: `url(${banner.background_image})`,
              backgroundSize: "cover",
              color: banner.font_color || "white",
              padding: `${banner.padding}px`,
              margin: `${banner.margin}px`,
            }}
          >
            <h2
              style={{
                fontSize: `${banner.font_size}px`,
                fontWeight: banner.font_weight,
              }}
            >
              {banner.name}
            </h2>
            <a
              href="#"
              className="btn"
              style={{
                backgroundColor: banner.button_background_color || "white",
                color: banner.font_color || "black",
              }}
            >
              View More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopIntro;
