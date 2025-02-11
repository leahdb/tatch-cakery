const handleOrderSubmit = () => {
  const formSubmitUrl = "https://formsubmit.co/hdeiblea72@gmail.com"; // Replace with your unique FormSubmit URL

  const orderDetails = `
        New Order:
        Name: "Test Name"
        Phone: "4783w7829"
        Items: "custom cake"
        Total: "10$"
    `;

  fetch(formSubmitUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "hdeiblea72@gmail.com", // Optional, ensures it goes to your email
      subject: "New Order Received",
      message: orderDetails,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Order notification sent via email:", data))
    .catch((error) => console.error("Error sending order email:", error));
};
