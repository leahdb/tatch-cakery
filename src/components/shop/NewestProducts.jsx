import React from "react";

const NewestProducts = () => {
  const products = [
    {
      id: 1,
      name: "Raspberry Pi 4 Model B",
      price: 35.99,
      imageSrc:
        "https://www.seeedstudio.com/blog/wp-content/uploads/2019/06/WechatIMG1371.png",
    },
    {
      id: 2,
      name: "Arduino Uno R3",
      price: 24.99,
      imageSrc:
        "https://rukminim1.flixcart.com/image/1664/1664/j76i3rk0/learning-toy/j/z/8/arduino-uno-r3-board-with-dip-atmega328p-adraxx-original-imaexh74faqkvygt.jpeg?q=90",
    },
    {
      id: 3,
      name: "ESP8266 WiFi Module",
      price: 3.49,
      imageSrc:
        "https://tse1.mm.bing.net/th?id=OIP.5LofEV_I-Y9PG-53g9Iu5AHaHa&pid=Api&P=0&h=220",
    },
    {
      id: 4,
      name: "MPU6050 Gyroscope and Accelerometer Module",
      price: 15.99,
      imageSrc:
        "https://tse3.mm.bing.net/th?id=OIP.9F2kvsmNfU-ekR6VZwVu4QHaFx&pid=Api&P=0&h=220",
    },
    {
      id: 5,
      name: "DHT22 Temperature and Humidity Sensor",
      price: 9.99,
      imageSrc:
        "https://tse3.mm.bing.net/th?id=OIP.QZI5OE82YcwbFmafi3MSmAHaHa&pid=Api&P=0&h=220",
    },
    {
      id: 6,
      name: "BME280 Environmental Sensor",
      price: 8.99,
      imageSrc:
        "https://images-na.ssl-images-amazon.com/images/I/41j5cHWfpDL.jpg",
    },
    {
      id: 7,
      name: "Breadboard Jumper Wires Kit",
      price: 6.99,
      imageSrc:
        "https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_1.0,f_auto,q_auto,w_700/c_pad,w_700/F7916454-01",
    },
    {
      id: 8,
      name: "STMicroelectronics Nucleo-F401RE Development Board",
      price: 19.99,
      imageSrc: "https://media.rs-online.com/f_auto/F8029425-01.jpg",
    },
    {
      id: 9,
      name: "LM317 Adjustable Voltage Regulator",
      price: 1.99,
      imageSrc:
        "https://i5.walmartimages.com/asr/becb1f3d-da68-4fe4-ae95-1a031d7e068a_1.590bdaf485016abeff4daf43c9ff3a85.jpeg",
    },
    {
      id: 10,
      name: "Soldering Iron Kit",
      price: 29.99,
      imageSrc:
        "https://tse3.mm.bing.net/th?id=OIP.w9Q9-ejAmxUgg0v6tezclgHaHa&pid=Api&P=0&h=220",
    },
  ];

  return (
    <div className="container">
      <div className="row g-3 my-5">
        <div className="col-12 d-flex justify-content-between">
          <h3 className="fw-bold text-muted mb-4">Newest Products</h3>
          <a href="#">See All New Products</a>
        </div>
        {products.slice(0, 8).map((product) => (
          <div key={product.id} className="col-lg-3 col-md-6 col-sm-6 d-flex">
            <div className="card w-100 my-2 shadow">
              <img
                src={product.imageSrc}
                className="card-img-top"
                alt={product.name}
                height={200}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title fs-6">{product.name}</h5>
                  <p className="card-text fs-6 text-primary">${product.price}</p>
                </div>
                
                <div className="d-flex align-items-end justify-content-center px-0 pb-0 mt-4">
                  <a href="#!" className="btn btn-primary px-3 shadow-0 me-2">
                    <i class="bi bi-cart-plus fs-5 py-1"></i>
                  </a>
                  <a
                    href="#!"
                    className="btn btn-light border px-3 pt-2 icon-hover"
                  >
                    <i class="bi bi-heart-fill fs-5 py-1 text-primary"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default NewestProducts;
