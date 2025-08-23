import React, { useState } from "react";
import SVGVisualizer from "./SVGVisualizerV2";
import MotifPicker from "./MotifPicker";
import ColorPicker from "./ColorPicker";
//import { handleOrderSubmit } from "../../services/shop/sendOrderEmail";
import { add_to_cart } from "../../services/shop/cart";

const CakeCustomization = () => {
  const cakeData = {
    name: "Build Your Cake",
    description:
      "Customize your perfect cake with our selection of flavors and fillings.",
    basePrice: 8,
    imageUrl:
      "https://d34zicoa2zcr2f.cloudfront.net/sites/files/bakersbrewstudio2/images/products/202404/800xAUTO/strb1.jpg", // Replace with actual image
    options: {
      cakeFlavors: ["Chocolate", "Vanilla", "RedVelvet"],
      creamFlavors: [
        { name: "Chocolate", price: 0 },
        { name: "Vanilla", price: 0 },
        { name: "Strawberry", price: 0.5 },
        { name: "Lotus", price: 0.5 },
        { name: "Pistachio", price: 0.5 },
      ],
      fillingFlavors: [
        { name: "Nutella", price: 0.5 },
        { name: "Pistachio", price: 1 },
        { name: "Strawberry", price: 0.5 },
        { name: "Lotus", price: 0.5 },
      ],
      topCreamFlavors: [
        { name: "Chocolate", price: 0 },
        { name: "Vanilla", price: 0 },
        { name: "Strawberry", price: 0.5 },
        { name: "Lotus", price: 0.5 },
        { name: "Pistachio", price: 0.5 },
        { name: "Colored Vanilla", price: 0 },
      ],
      extra: [
        { name: "Fresh Strawberries", price: 0.5 },
        { name: "Hazelnuts", price: 0.5 },
        { name: "oreo crumbs", price: 0.5 },
      ],
      customizations: [
        { name: "No Customization", price: 0 },
        { name: "Chocolate Letters Writing", price: 1 },
        { name: "Plexi Writing", price: 0 },
        { name: "Plexi Motif", price: 0 },
      ],
    },
  };

  const [selectedCake, setSelectedCake] = useState(
    cakeData.options.cakeFlavors[0]
  );
  const [selectedCream, setSelectedCream] = useState(
    cakeData.options.creamFlavors[0]
  );
  const [selectedTopCream, setSelectedTopCream] = useState(
    cakeData.options.topCreamFlavors[0]
  );
  const [selectedFilling, setSelectedFilling] = useState(cakeData.options.fillingFlavors[0]);
  const [selectedExtras, setSelectedExtras] = useState(cakeData.options.extra[0]);
  const [selectedCustomization, setSelectedCustomization] = useState(
    cakeData.options.customizations[0]
  );
    
    const [additionalNote, setAdditionalNote] = useState("");
    const [customInput, setCustomInput] = useState("");
    const [motifChoice, setMotifChoice] = useState(null);
    const [plexiColor, setPlexiColor] = useState("gold");

    const [qty, setQty] = useState(1);
    
    const decrease = () => {
      if (qty > 1) setQty(qty - 1);
    };
  
    const increase = () => {
      setQty(qty + 1);
    };

    const handleAddToCart = () => {
        add_to_cart({
          quantity: qty,
        }).then((res) => {
          if (res.message) {
            console.log("Cart:", res.cart);
            alert(res.message); // "Product added to cart successfully"
          }
        });
      };

    const totalPrice =
      cakeData.basePrice +
      (selectedCream.price ? selectedCream.price : 0) +
      (selectedFilling.price ? selectedFilling.price : 0) +
      (selectedCustomization.price ? selectedCustomization.price : 0) +
      (selectedExtras.price ? selectedExtras.price : 0);
    
    const handleOrderSubmit = () => {
      const googleSheetsWebhook =
            "https://script.google.com/macros/s/AKfycbzCztct7Z2noAZ9Mo91g5EwcK3o-b0szJhe0BCb93UzEhzfW89Np4atW3Vgt-6SeCbT/exec"; // Replace with your Google Apps Script URL
        
        const order = {
          name: "John Doe",
          phone: "+96171234567",
          items: [
            { name: "Cake", price: 20 },
            { name: "Cupcake", price: 5 },
          ],
          total: 25,
          notes: "Please add extra frosting",
        };

      fetch(googleSheetsWebhook, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      })
        .then(() => alert("Order submitted! (No response due to no-cors mode)"))
        .catch((error) => console.error("Error sending order:", error));
    };

    // const handleAddToCart = () => {
    //   console.log(formData);
    //   if (id !== undefined) {
    //     edit_shop_products(id, formData).then((res) => {
    //       setShouldRedirectToIndex(res.status === "ok");
    //     });
    //   } else {
    //     add_shop_products(formData).then((res) => {
    //       setShouldRedirectToIndex(res.status === "ok");
    //     });
    //   }
    // };


    // export const edit_shop_orders = (id, data) => {
    //   return fetch(`${API_HOST}edit/${id}`, {
    //     method: "POST",
    //     credentials: "include",
    //     secure: true,
    //     body: JSON.stringify(data),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }).then((res) => res.json());
    // };

  return (
    <div className="row mt-3 bg-light-gray cake-customization">
      <div className="col-12 col-lg-6 d-flex justify-content-center px-5 custom-height-1">
        <SVGVisualizer
          cakeFlavor={selectedCake}                       // "Vanilla" | "Chocolate" | "RedVelvet"
          fillingFlavor={selectedFilling.name}           // "Nutella" | "Pistachio" | ...
          creamFlavor={selectedCream.name}               // "Vanilla" | "Chocolate" | ...
          topCreamFlavor={selectedTopCream.name}
          message={customInput}
          motif={selectedCustomization.name === "Plexi Motif" ? motifChoice : null}
          plexiColor={plexiColor}
          letteringMode={
            selectedCustomization.name === "Chocolate Letters Writing"
              ? "chocolate"
              : selectedCustomization.name === "Plexi Writing"
              ? "plexi"
              : "none"
          }
        />
      </div>
      <div className="col-12 col-lg-6 overflow-auto custom-height-2">
        <div className="bg-white mb-2">
          <div className="container pb-3 pt-1">
            <h2 className="pt-4">{cakeData.name}</h2>
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
                    checked={selectedCream.name === flavor.name}
                    onChange={() => setSelectedCream(flavor)}
                  />
                  <label className="form-check-label">
                    {flavor.name}{" "}
                    <small className="text-muted">
                      &nbsp;{flavor.price > 0 ? `+${flavor.price}$` : ""}
                    </small>
                  </label>
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
                    {filling.name}{" "}
                    <small className="text-muted">&nbsp;+{filling.price}$</small>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="container">
            <div className="mb-2 py-3 px-2">
              <label className="form-label fs-5">Add On</label>
              {cakeData.options.extra.map((extra, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    value={extra.name}
                    checked={selectedExtras.name === extra.name}
                    onChange={() => setSelectedExtras(extra)}
                  />
                  <label className="form-check-label">
                    {extra.name}{" "}
                    <small className="text-muted">&nbsp;+{extra.price}$</small>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="container">
            <div className="mb-2 py-3 px-2">
              <label className="form-label fs-5">Top Cream Flavor</label>
              {cakeData.options.topCreamFlavors.map((flavor, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="creamFlavor"
                    value={flavor}
                    checked={selectedTopCream.name === flavor.name}
                    onChange={() => setSelectedTopCream(flavor)}
                  />
                  <label className="form-check-label">
                    {flavor.name}{" "}
                    <small className="text-muted">
                      &nbsp;{flavor.price > 0 ? `+${flavor.price}$` : ""}
                    </small>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div className="container">
            <div className="mb-2 py-3 px-2">
              <label className="form-label fs-5">Customization</label>
              {cakeData.options.customizations.map((custom, index) => (
                <div className="form-check" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="customization"
                    value={custom.name}
                    checked={selectedCustomization.name === custom.name}
                    onChange={() => {
                      setSelectedCustomization(custom);
                      if (custom.name !== "Plexi Motif") {
                        setMotifChoice(null); // clear motif when leaving motif mode
                      }
                    }}
                  />
                  <label className="form-check-label">
                    {custom.name}
                    <small className="text-muted">
                      &nbsp;{custom.price > 0 ? `+${custom.price}$` : ""}
                    </small>
                  </label>
                </div>
              ))}
              {selectedCustomization.name.includes("Writing") && (
                <div className="my-3">
                  <label className="form-label fs-5">Enter Your Message</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your custom message"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                  />
                </div>
              )}
              {selectedCustomization.name.includes("Drawing") ||
              selectedCustomization.name.includes("Motif") ? (
                <MotifPicker
                  value={motifChoice}
                  onChange={setMotifChoice}
                />
              ) : null}
              {selectedCustomization.name.includes("Plexi") && (
                <div className="my-3">
                  <ColorPicker
                    value={plexiColor}
                    onChange={setPlexiColor}
                  />
                </div>
              )}
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
                <button
                  onClick={() => handleOrderSubmit()}
                  className="btn btn-primary w-100 mt-5"
                >
                  Add to Card
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row pt-3 mt-5 mx-0">
            <div className="col-12 col-md-6">
              <div className="input-group border w-100">
                <button
                  className="btn"
                  type="button"
                  onClick={decrease}
                >
                  −
                </button>
                <input
                  type="text"
                  className="form-control text-center p-0 border-0"
                  value={qty}
                  readOnly
                />
                <button
                  className="btn"
                  type="button"
                  onClick={increase}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <button className="btn btn-primary w-100" onClick={handleAddToCart}>Add to cart</button>
            </div>
          </div>
      </div>
      
    </div>
  );
};

export default CakeCustomization;