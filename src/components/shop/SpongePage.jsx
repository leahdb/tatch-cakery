import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CustomerSelectionContext } from './CustomerSelectionContext';
import emptyBoxImage from './assets/images/1p-chocolate.jpg';

const SpongePage = () => {
  const { size } = useParams();
  const navigate = useNavigate();
  const { customerSelection, setCustomerSelection } = useContext(CustomerSelectionContext);

  // Initialize state with previous selection if available
  const [selectedSponge, setSelectedSponge] = useState(customerSelection.sponge || null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to dynamically generate the image URL for sponge type
  const getSpongeImage = (size, sponge) => {
    try {
      return require(`./assets/images/${size}p-${sponge}.jpg`);
    } catch (error) {
      return emptyBoxImage; // Fallback if image doesn't exist
    }
  };

  const handleSelectSponge = (spongeType) => {
    setSelectedSponge(spongeType);
    setCustomerSelection((prevSelection) => ({
      ...prevSelection,
      size: size, 
      sponge: spongeType,
    }));
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center" 
         style={{ backgroundColor: "#f8f1e5", minHeight: "100vh", paddingTop: "50px", paddingBottom: "50px" }}>
      <h2 className="mb-5" style={{ color: "#604f3f", textAlign: "center" }}>
        Select Your Sponge for {size} Cake
      </h2>

      <div className="mb-5 d-flex justify-content-center">
        <img
          src={selectedSponge ? getSpongeImage(size, selectedSponge) : emptyBoxImage}
          alt={selectedSponge || "Empty Box"}
          className="img-fluid"
          style={{ maxWidth: "300px", maxHeight: "300px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
        />
      </div>

      <div className="mb-5 d-flex justify-content-center">
        <button
          className="btn"
          style={{ backgroundColor: "#e5b57c", color: "#fff", fontWeight: "bold", padding: "10px 20px", border: "none", borderRadius: "5px", marginRight: "20px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
          onClick={() => handleSelectSponge("chocolate")}
          disabled={selectedSponge === "chocolate"}
        >
          Chocolate
        </button>
        <button
          className="btn"
          style={{ backgroundColor: "#c58d58", color: "#fff", fontWeight: "bold", padding: "10px 20px", border: "none", borderRadius: "5px", marginLeft: "20px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
          onClick={() => handleSelectSponge("vanilla")}
          disabled={selectedSponge === "vanilla"}
        >
          Vanilla
        </button>
      </div>

      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn"
          style={{ backgroundColor: "#6a4f3a", color: "#fff", fontWeight: "bold", padding: "10px 20px", border: "none", borderRadius: "5px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
          onClick={() => navigate(`/customize/filling/${size}`)}
          disabled={!selectedSponge}
        >
          Next: Choose Filling
        </button>
      </div>
    </div>
  );
};

export default SpongePage;
