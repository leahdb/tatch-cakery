import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerSelectionContext } from "./CustomerSelectionContext";

const DecorationsPage = () => {
  const { customerSelection, setCustomerSelection } = useContext(
    CustomerSelectionContext
  );
  const [selectedDecoration, setSelectedDecoration] = useState(
    customerSelection.decoration || "none"
  );
  const [notes, setNotes] = useState(customerSelection.notes || "");
  const [uploadedImage, setUploadedImage] = useState(
    customerSelection.uploadedImage || null
  );
  const navigate = useNavigate();
  const [displayedImage, setDisplayedImage] = useState(null);

  const decorations = [
    {
      name: "none",
      label: "None",
      img: require("./assets/images/1p-chocolate.jpg"),
    },
    {
      name: "roses",
      label: "Roses",
      img: require("./assets/images/1p-chocolate.jpg"),
    },
    {
      name: "sprinkles",
      label: "Sprinkles",
      img: require("./assets/images/1p-chocolate.jpg"),
    },
    {
      name: "fondant",
      label: "Fondant",
      img: require("./assets/images/1p-chocolate.jpg"),
    },
  ];

  const preloadImages = (size, sponge, filling) => {
    try {
      return require(`./assets/images/${size}p-${sponge}${
        filling !== "none" ? `-${filling}` : ""
      }.jpg`);
    } catch (error) {
      return "https://via.placeholder.com/300x300.png?text=Image+Not+Available";
    }
  };

  useEffect(() => {
    const image = preloadImages(
      customerSelection.size,
      customerSelection.sponge,
      customerSelection.filling || "none"
    );
    setDisplayedImage(image);
  }, [customerSelection]);

  const handleSelectDecoration = (decoration) => {
    setSelectedDecoration(decoration);
    setCustomerSelection((prev) => ({ ...prev, decoration }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setCustomerSelection((prev) => ({
          ...prev,
          uploadedImage: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setCustomerSelection((prev) => ({ ...prev, uploadedImage: null }));
  };

  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#f8f1e5", minHeight: "100vh" }}
    >
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="text-center mb-4" style={{ color: "#604f3f" }}>
            Choose Decorations for {customerSelection.size} Cake
          </h2>

          {/* Cake Preview */}
          <div className="text-center mb-4 position-relative">
            <img
              src={displayedImage}
              alt="Cake Preview"
              className="img-fluid rounded shadow"
              style={{ maxWidth: "300px", height: "auto" }}
            />
          </div>

          {/* Text Suggestion for Decoration Selection */}
          <div className="text-center mb-4">
            <p style={{ color: "#604f3f" }}>
              You can select a decoration for your cake below.
            </p>
          </div>

          {/* Selected Decoration Suggestion */}
          {selectedDecoration !== "none" && (
            <div className="text-center mb-4">
              <h5 style={{ color: "#604f3f" }}>
                Selected Decoration Suggestion:
              </h5>
              <img
                src={
                  decorations.find((dec) => dec.name === selectedDecoration)
                    ?.img
                }
                alt="Selected Decoration"
                className="img-fluid rounded shadow"
                style={{ maxWidth: "200px", height: "auto" }}
              />
            </div>
          )}

          {/* Decoration Options Grid */}
          <div className="row row-cols-2 row-cols-md-4 g-4 mb-4 justify-content-center">
            {decorations.map(({ name, label, img }) => (
              <div key={name} className="col mb-4">
                <div
                  className={`card h-100 ${
                    selectedDecoration === name ? "border-warning" : ""
                  }`}
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s ease-in-out",
                    transform:
                      selectedDecoration === name ? "scale(1.05)" : "scale(1)",
                  }}
                  onClick={() => handleSelectDecoration(name)}
                >
                  <img
                    src={img}
                    alt={label}
                    className="card-img-top"
                    style={{ height: "100px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <p className="card-text">{label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upload Custom Image */}
          <div className="mb-4 text-center">
            <label className="form-label fw-bold" style={{ color: "#604f3f" }}>
              Upload Custom Image:
            </label>
            <div className="d-flex justify-content-center align-items-center gap-3">
              <label
                htmlFor="uploadImage"
                className="btn btn-sm"
                style={{
                  cursor: "pointer",
                  padding: "8px 20px",
                  fontWeight: "bold",
                  backgroundColor: "#e5b57c",
                  color: "#fff",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                Choose Image
              </label>
              <input
                id="uploadImage"
                type="file"
                className="d-none"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            {/* Uploaded Image Container */}
            {uploadedImage && (
              <div className="position-relative mt-3 d-inline-block">
                <img
                  src={uploadedImage}
                  alt="Uploaded Decoration"
                  className="img-fluid rounded shadow"
                  style={{
                    maxWidth: "200px",
                    height: "auto",
                    display: "block",
                  }}
                />
                {/* X Button inside the container */}
                <button
                  className="btn btn-danger btn-sm position-absolute"
                  onClick={handleRemoveImage}
                  style={{
                    top: "5px",
                    right: "5px",
                    backgroundColor: "#ff0000", // Red background
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  X
                </button>
              </div>
            )}
          </div>

          {/* Additional Notes */}
          <div className="mb-4">
            <label className="form-label fw-bold" style={{ color: "#604f3f" }}>
              Additional Notes:
            </label>
            <textarea
              className="form-control"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Special instructions..."
            ></textarea>
          </div>

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn"
              style={{
                backgroundColor: "#e5b57c", 
                color: "#fff",
                fontWeight: "bold",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() =>
                navigate(`/customize/filling/${customerSelection.size}`)
              }
            >
              Back
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
              onClick={() =>
                navigate(`/customize/review/${customerSelection.size}`)
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecorationsPage;
