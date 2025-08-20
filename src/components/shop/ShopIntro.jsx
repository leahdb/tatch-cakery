import React from "react";

// Carousel Item Component
const CarouselItem = ({ slide, isActive }) => (
  <div
    className={`carousel-item ${isActive ? "active" : ""}`}
  >
    <img
      src={`${process.env.PUBLIC_URL}/images/${slide.image}`}
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
      className="carousel-caption d-flex justify-content-center align-items-center"
      style={{
        zIndex: 2,
        margin: "0",
        width: "25%", // Occupies 40% of the image width by default
        textAlign: "left",
        color: "#fff", // White text for contrast
      }}
    >
      <div>
        <h2
          className="fw-bold"
          style={{ fontSize: "2rem", marginBottom: "10px" }}
        >
          {slide.title}
        </h2>
        <p style={{ fontSize: "0.9rem", marginBottom: "10px" }}>
          {slide.description}
        </p>
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
const ShopIntro = ({ banners }) => {
  return (
    <div className="container-fluid p-0">
      <div className="row gx-0">
        <main className="col-12 p-0">
          <div
            id="carouselIntro"
            className="carousel slide carousel-fade carousel-main"
            data-bs-ride="carousel"
            data-bs-interval="3000"
            // style={{
            //   position: "relative",
            //   height: "50vh",
            //   borderBottom: "5px dashed #fff",
            // }}
          >
            <div className="carousel-indicators mb-0">
              {banners.map((_, index) => (
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
              {banners.map((slide, index) => (
                <CarouselItem
                  key={index}
                  slide={slide}
                  isActive={index === 0}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopIntro;
