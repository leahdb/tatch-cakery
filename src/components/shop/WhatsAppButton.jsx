import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "96181692266"; // Replace with your WhatsApp number
  const message = "Hello! I'm interested in your services."; // Default message
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-success whatsapp-button"
    >
      <i className="bi bi-whatsapp text-white fs-2"></i>
    </a>
  );
};

export default WhatsAppButton;
