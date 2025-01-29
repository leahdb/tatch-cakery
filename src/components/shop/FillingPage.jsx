import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerSelectionContext } from "./CustomerSelectionContext";

const FillingPage = () => {
  const { customerSelection, setCustomerSelection } = useContext(CustomerSelectionContext);
  const [displayedImage, setDisplayedImage] = useState(null);
  const navigate = useNavigate();

  // Preload images dynamically
  const preloadImages = (size, sponge) => {
    const images = {};
    const fillings = ["none", "chocolate", "vanilla"];

    fillings.forEach((filling) => {
      try {
        const imagePath = require(`./assets/images/${size}p-${sponge}${filling !== "none" ? `-${filling}` : ""}.jpg`);
        images[filling] = imagePath;
      } catch (error) {
        images[filling] = "https://via.placeholder.com/300x300.png?text=Image+Not+Available";
      }
    });

    return images;
  };

  useEffect(() => {
    // Preload images based on the selected size and sponge
    const images = preloadImages(customerSelection.size, customerSelection.sponge);
    setDisplayedImage(images[customerSelection.filling || "none"]); // Set the initial image
  }, [customerSelection.size, customerSelection.sponge, customerSelection.filling]);

  // Handle filling selection
  const handleSelectFilling = (fillingType) => {
    setCustomerSelection((prevSelection) => {
      const newSelection = {
        ...prevSelection,
        filling: fillingType,
      };
      setDisplayedImage(preloadImages(customerSelection.size, customerSelection.sponge)[fillingType]); // Update the displayed image
      console.log("Updated customer selection:", newSelection);
      return newSelection;
    });
  };

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundColor: "#f8f1e5",
        minHeight: "100vh",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <h2 className="mb-5" style={{ color: "#604f3f", textAlign: "center" }}>
        Select Your Filling for {customerSelection.size} Cake
      </h2>

      <div className="mb-5 d-flex justify-content-center">
        <img
          src={displayedImage}
          alt={`Cake with ${customerSelection.filling || "No"} filling`}
          className="img-fluid"
          style={{
            maxWidth: "300px",
            maxHeight: "300px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>

      <div className="mb-5 d-flex justify-content-center">
        <button
          className="btn"
          style={{
            backgroundColor: "#e5b57c",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            marginRight: "20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => handleSelectFilling("chocolate")}
          disabled={customerSelection.filling === "chocolate"}
        >
          Chocolate
        </button>
        <button
          className="btn"
          style={{
            backgroundColor: "#c58d58",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            marginLeft: "20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => handleSelectFilling("vanilla")}
          disabled={customerSelection.filling === "vanilla"}
        >
          Vanilla
        </button>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn"
          style={{
            backgroundColor: "#6a4f3a",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => navigate(`/customize/sponge/${customerSelection.size}`)}
        >
          Go to Previous: Choose Sponge
        </button>
        <button
          className="btn"
          style={{
            backgroundColor: "#604f3f",
            color: "#fff",
            fontWeight: "bold",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => navigate(`/customize/decorations/${customerSelection.size}`)}
          disabled={customerSelection.filling === "none"}
        >
          Next: Choose Decorations
        </button>
      </div>
    </div>
  );
};

export default FillingPage;
