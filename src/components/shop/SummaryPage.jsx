import { useNavigate } from "react-router-dom";

const SummaryPage = ({ orderDetails }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Order Summary</h2>
      <p>Size: {orderDetails.size}</p>
      <p>Sponge: {orderDetails.sponge}</p>
      <p>Filling: {orderDetails.filling}</p>
      <p>Notes: {orderDetails.notes}</p>
      <button onClick={() => navigate("/cart")}>Add to Cart</button>
    </div>
  );
};

export default SummaryPage;
