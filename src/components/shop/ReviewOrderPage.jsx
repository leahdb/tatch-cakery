import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerSelectionContext } from "./CustomerSelectionContext";
import 'bootstrap/dist/css/bootstrap.min.css';

const ReviewOrderPage = () => {
  const { customerSelection } = useContext(CustomerSelectionContext);
  const navigate = useNavigate();

  const calculatePrice = () => {
    let price = 0;
    const sizePrices = { "1": 10, "2-3": 15, "6-8": 20 };
    price += sizePrices[customerSelection.size] || 0;

    if (customerSelection.sponge === "chocolate") price += 2;
    if (customerSelection.filling === "vanilla") price += 1;
    if (customerSelection.decoration) price += 5;
    if (customerSelection.uploadedImage) price += 3;

    return price;
  };

  const handleAddToCart = () => {
    console.log("Adding to cart:", customerSelection);
    navigate("/cart");
  };

  let finalImageSrc = require(`./assets/images/${customerSelection.size}p-${customerSelection.sponge}-${customerSelection.filling}.jpg`);

  return (
    <div className="container py-5" style={styles.container}>
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow-lg border-0" style={styles.card}>
            <div className="card-header text-center" style={styles.cardHeader}>
              <h2 className="fw-bold">Review Your Order</h2>
            </div>
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <strong>Final Cake Image:</strong>
                <img src={finalImageSrc} alt="Final Cake" className="img-fluid rounded shadow-sm" style={styles.finalImage} />
              </div>

              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item"><strong>Size:</strong> {customerSelection.size}</li>
                <li className="list-group-item"><strong>Sponge:</strong> {customerSelection.sponge}</li>
                <li className="list-group-item"><strong>Filling:</strong> {customerSelection.filling}</li>
                <li className="list-group-item"><strong>Decoration:</strong> {customerSelection.decoration || "None"}</li>
                <li className="list-group-item"><strong>Notes:</strong> {customerSelection.notes || "No special instructions"}</li>
              </ul>
              
              {customerSelection.uploadedImage && (
                <div className="text-center mb-3">
                  <strong>Uploaded Image:</strong>
                  <img src={customerSelection.uploadedImage} alt="Uploaded Reference" className="img-fluid rounded shadow-sm" style={styles.uploadedImage} />
                </div>
              )}
              
              <h3 className="text-center fw-bold mt-3">Total Price: ${calculatePrice()}</h3>
            </div>
            <div className="card-footer d-flex justify-content-center gap-3 p-3">
              <button className="btn" style={styles.buttonBack} onClick={() => navigate(`/customize/decorations/${customerSelection.size}`)}>
                Edit Order
              </button>
              <button className="btn" style={styles.buttonAdd} onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f4efe9",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100vw"
  },
  card: {
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
  },
  cardHeader: {
    backgroundColor: "#e5c097",
    color: "#5a3e2b",
    borderTopLeftRadius: "12px",
    borderTopRightRadius: "12px",
    padding: "15px 0",
  },
  finalImage: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    marginTop: "10px",
  },
  uploadedImage: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    marginTop: "10px",
  },
  buttonBack: {
    backgroundColor: "#6a4f3a",
    color: "#fff",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "8px",
    transition: "0.3s",
    border: "none",
  },
  buttonAdd: {
    backgroundColor: "#e5b57c",
    color: "#fff",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "8px",
    transition: "0.3s",
    border: "none",
  },
};

export default ReviewOrderPage;
