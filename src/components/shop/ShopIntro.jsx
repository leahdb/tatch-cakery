import React from "react";
import cakeImage1 from "../../resources/themes/dashboard-v1/img/img5.png";
import cakeImage2 from "../../resources/themes/dashboard-v1/img/1.png";
import cakeImage3 from "../../resources/themes/dashboard-v1/img/3.png";
import cakeImage4 from "../../resources/themes/dashboard-v1/img/img4.jpeg";
import cakeImage5 from "../../resources/themes/dashboard-v1/img/img6.png";

// Slide data
const slides = [
  {
    image: cakeImage5,
    title: "Delicious Cakes",
    description: "Freshly baked just for you.",
    buttonText: "Order Now",
    buttonLink: "/cakes",
  },
  {
    image: cakeImage2,
    title: "Special Occasions",
    description: "Cakes for every celebration.",
  },
  {
    image: cakeImage3,
    title: "Custom Designs",
    description: "Made to match your style.",
    buttonText: "Customize",
    buttonLink: "/customize",
  },
  {
    image: cakeImage5,
    title: "Tasty Treats",
    description: "Savor every bite.",
  },
];

// Carousel Item Component
const CarouselItem = ({ slide, isActive }) => (
  <div className={`carousel-item ${isActive ? "active" : ""}`} style={{ height: "50vh" }}>
    <img
      src={slide.image}
      className="d-block w-100 position-absolute top-0 start-0"
      alt={slide.title}
      style={{
        objectFit: "cover",
        width: "100%",
        height: "100%",
        border: "0",
      }}
    />
    <div
      className="carousel-caption d-flex justify-content-start align-items-start"
      style={{
        zIndex: 2,
        left: "0",
        bottom: "0",
        margin: "0",
        width: "50%", // Occupies 40% of the image width by default
        textAlign: "left",
        background: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
        color: "#fff", // White text for contrast
        padding: "15px", // Padding for text inside the background
      }}
    >
      <div>
        <h2 className="fw-bold" style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{slide.title}</h2>
        <p style={{ fontSize: "0.9rem", marginBottom: "10px" }}>{slide.description}</p>
        {slide.buttonText && (
          <a
            href={slide.buttonLink}
            className="btn btn-light mt-2"
            style={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              padding: "8px 15px",
              borderRadius: "5px",
            }}
          >
            {slide.buttonText}
          </a>
        )}
      </div>
    </div>
  </div>
);

// Main Component
const ShopIntro = () => {
  return (
    <div className="container-fluid p-0">
      <div className="row gx-0">
        <main className="col-12 p-0">
          <div
            id="carouselIntro"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            data-bs-interval="3000"
            style={{ position: "relative", height: "50vh", borderBottom: "5px dashed #fff" }}
          >
            <div className="carousel-indicators mb-0">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselIntro"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {slides.map((slide, index) => (
                <CarouselItem key={index} slide={slide} isActive={index === 0} />
              ))}
            </div>
          </div>
        </main>
      </div>


      <style jsx>{`
        .carousel-caption {
          width: 40%;
        }

        @media (max-width: 768px) {
          .carousel-caption {
            width: 60%; /* Increase the width on smaller screens */
          }

          .carousel-caption h2 {
            font-size: 1.2rem; /* Smaller font for titles */
          }

          .carousel-caption p {
            font-size: 0.8rem; /* Smaller font for descriptions */
          }

          .carousel-caption a {
            font-size: 0.8rem; /* Smaller font for buttons */
          }
        }
      `}</style>
    </div>
  );
};

export default ShopIntro;
