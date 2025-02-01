import React from "react";

const BuildYourCake = () => {
  const products = [
    {
      id: 1,
      name: "Raspberry Pi 4 Model B",
      price: 35.99,
      imageSrc:
        "https://www.seeedstudio.com/blog/wp-content/uploads/2019/06/WechatIMG1371.png",
    }
  ];

  return (
    <div className="container">
      <div className="row g-3 my-5">
        <div className="col-12 d-flex justify-content-between">
          <h3 className="fw-bold text-muted mb-4">Build Your cake</h3>
        </div>
        {products.slice(0, 1).map((product) => (
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

export default BuildYourCake;
