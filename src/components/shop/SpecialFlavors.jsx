import React from "react";

const specialFlavors = () => {
  const products = [
    {
      id: 1,
      name: "Dubai Chocolate Cake",
      price: 10,
      imageSrc:
        "https://www.seeedstudio.com/blog/wp-content/uploads/2019/06/WechatIMG1371.png",
    },
    {
      id: 2,
      name: "Korean Strawberry Cake",
      price: 9,
      imageSrc:
        "https://rukminim1.flixcart.com/image/1664/1664/j76i3rk0/learning-toy/j/z/8/arduino-uno-r3-board-with-dip-atmega328p-adraxx-original-imaexh74faqkvygt.jpeg?q=90",
    },
    {
      id: 3,
      name: "Tiramisu Cake",
      price: 9,
      imageSrc:
        "https://tse1.mm.bing.net/th?id=OIP.5LofEV_I-Y9PG-53g9Iu5AHaHa&pid=Api&P=0&h=220",
    },
  ];

  return (
    <div className="container">
      <div className="row g-3 my-5">
        <div className="col-12 d-flex justify-content-between">
          <h3 className="fw-bold text-muted mb-4">
            Special Cakes
          </h3>
          <a href="/products">See All</a>
        </div>
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="col-lg-3 col-md-6 col-6 d-flex">
            <a href="/products/1" className="card newest w-100 shadow my-2 ">
              <div className="d-flex justify-content-center">
                <img
                  src={product.imageSrc}
                  className="card-img-top"
                  alt={product.name}
                  height={100}
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
};

export default specialFlavors;
