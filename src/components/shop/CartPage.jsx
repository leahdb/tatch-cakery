import { useContext, useState } from "react";
import { CustomerSelectionContext } from "./CustomerSelectionContext";

const CartPage = () => {
  const { customerSelection } = useContext(CustomerSelectionContext);
  const [cart, setCart] = useState([customerSelection]);

  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((item, i) => i !== index);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout");
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={styles.container}>
      <h2 style={styles.header}>Your Cart</h2>

      <div className="mb-4 w-100" style={styles.orderDetails}>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className="cart-item mb-4 p-3" style={styles.cartItem}>
              <p><strong>Size:</strong> {item.size}</p>
              <p><strong>Sponge:</strong> {item.sponge}</p>
              <p><strong>Filling:</strong> {item.filling}</p>
              <p><strong>Decoration:</strong> {item.decoration || "None"}</p>
              <p><strong>Notes:</strong> {item.notes || "No special instructions"}</p>
              {item.uploadedImage && (
                <div>
                  <strong>Uploaded Image:</strong>
                  <img
                    src={item.uploadedImage}
                    alt="Uploaded Reference"
                    style={styles.uploadedImage}
                  />
                </div>
              )}
              <button
                className="btn btn-danger mt-3"
                onClick={() => handleRemoveFromCart(index)}
                style={styles.removeButton}
              >
                Remove from Cart
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty!</p>
        )}
      </div>

      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn"
          style={styles.buttonBack}
          onClick={() => window.history.back()}
        >
          Continue Shopping
        </button>

        {cart.length > 0 && (
          <button
            className="btn"
            style={styles.buttonCheckout}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f8f1e5",
    minHeight: "100vh",
    padding: "50px 20px",
    textAlign: "center",
  },
  header: {
    color: "#604f3f",
    marginBottom: "30px",
  },
  orderDetails: {
    maxWidth: "600px",
    textAlign: "left",
    marginBottom: "20px",
  },
  cartItem: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  uploadedImage: {
    maxWidth: "250px",
    maxHeight: "250px",
    borderRadius: "10px",
    marginTop: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  removeButton: {
    backgroundColor: "#d9534f",
    color: "#fff",
    fontWeight: "bold",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
  },
  buttonBack: {
    backgroundColor: "#e5b57c",
    color: "#fff",
    fontWeight: "bold",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    marginRight: "10px",
  },
  buttonCheckout: {
    backgroundColor: "#604f3f",
    color: "#fff",
    fontWeight: "bold",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    marginLeft: "10px",
  },
};

export default CartPage;
