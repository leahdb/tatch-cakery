import React, { useState } from "react";

const CakeCustomization = () => {
  const cakeData = {
    name: "Deluxe Custom Cake",
    description:
      "Customize your perfect cake with our selection of flavors and fillings.",
    basePrice: 20,
    imageUrl:
      "https://d34zicoa2zcr2f.cloudfront.net/sites/files/bakersbrewstudio2/images/products/202404/800xAUTO/strb1.jpg", // Replace with actual image
    options: {
      cakeFlavors: ["Vanilla", "Chocolate", "Red Velvet", "Carrot"],
      creamFlavors: ["Buttercream", "Whipped Cream", "Chocolate Ganache"],
      fillingFlavors: [
        { name: "Strawberry", price: 3 },
        { name: "Chocolate", price: 4 },
        { name: "Caramel", price: 5 },
      ],
    },
  };

  const [selectedCake, setSelectedCake] = useState(
    cakeData.options.cakeFlavors[0]
  );
  const [selectedCream, setSelectedCream] = useState(
    cakeData.options.creamFlavors[0]
  );
  const [selectedFilling, setSelectedFilling] = useState(
    cakeData.options.fillingFlavors[0]
  );
const [additionalNote, setAdditionalNote] = useState("");


  const totalPrice = cakeData.basePrice + selectedFilling.price;

  return (
    <div className="mt-0 bg-light-gray">
      <img
        src={cakeData.imageUrl}
        alt={cakeData.name}
        className="img-fluid w-100 mb-0"
      />
      <div className="bg-white mb-2">
        <div className="container pb-3 pt-1">
          <h2 className="pt-3">{cakeData.name}</h2>
          <p className="text-muted">{cakeData.description}</p>
          <h4>{totalPrice.toFixed(2)}$</h4>
        </div>
      </div>
      <div className="bg-white">
        <div className="container">
          <div className="mb-2 py-3 px-2">
            <label className="form-label fs-5">Cake Flavor</label>
            {cakeData.options.cakeFlavors.map((flavor, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="cakeFlavor"
                  value={flavor}
                  checked={selectedCake === flavor}
                  onChange={() => setSelectedCake(flavor)}
                />
                <label className="form-check-label">{flavor}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="container">
          <div className="mb-2 py-3 px-2">
            <label className="form-label fs-5">Cream Flavor</label>
            {cakeData.options.creamFlavors.map((flavor, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="creamFlavor"
                  value={flavor}
                  checked={selectedCream === flavor}
                  onChange={() => setSelectedCream(flavor)}
                />
                <label className="form-check-label">{flavor}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="container">
          <div className="mb-2 py-3 px-2">
            <label className="form-label fs-5">Filling Flavor</label>
            {cakeData.options.fillingFlavors.map((filling, index) => (
              <div className="form-check" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="fillingFlavor"
                  value={filling.name}
                  checked={selectedFilling.name === filling.name}
                  onChange={() => setSelectedFilling(filling)}
                />
                <label className="form-check-label">
                  {filling.name} (+${filling.price})
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="container">
          <div className="mb-2 py-3 px-2">
            <label className="form-label fs-5">Additional Notes</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter any additional requests"
              value={additionalNote}
              onChange={(e) => setAdditionalNote(e.target.value)}
            />
            <div className="w-100">
                <button className="btn btn-primary w-100 mt-5">Add to Card</button>
            </div>        
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeCustomization;
