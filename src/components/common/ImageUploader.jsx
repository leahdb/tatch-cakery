import React, { useState, useEffect } from "react";
import upload from "../../resources/themes/dashboard-v1/icons/upload.svg";
import iconClose from "../../resources/themes/dashboard-v1/icons/image-close.svg";

const ImageUploader = ({
  images,
  onFileInputChange,
  onRemoveImage,
  onSelectProfile,
  selectedProfileIndex,
}) => {
  const handleAddImage = () => {
    const fileInput = document.getElementById("imageUpload");
    fileInput.click();
  };

  const hasImages = images !== undefined && images.length > 0;
  return (
    <div className="product-image w-100">
      {!hasImages && (
        <div className="upload-image">
          <img src={upload} alt="upload" />
          <p className="m-0 d-md-block d-none">Upload Pictures</p>
        </div>
      )}
      {!hasImages && (
        <input
          type="file"
          name="images"
          onChange={onFileInputChange}
          accept="image/jpeg, image/png, image/gif"
          multiple
        />
      )}
      {hasImages && (
        <div className="uploaded-images-container">
          {images.map((image, index) => {
            return (
              <div
                key={index}
                className={`uploaded-image ${
                  selectedProfileIndex == index ? "selected" : ""
                }`}
              >
                <div className="profile-indicator">
                  <div className="green-circle"></div>
                </div>
                <div className="image-wrapper">
                  <img
                    className="img"
                    height={150}
                    src={
                      /^https?:\/\//i.test(image.image)
                        ? image.image
                        : ''
                        // : URL.createObjectURL(image)
                    }
                    alt={`Uploaded Image ${index + 1}`}
                  />
                  <img
                    onClick={() => onRemoveImage(index)}
                    className="delete-image-button"
                    src={iconClose}
                    alt="close"
                  />
                </div>
                {selectedProfileIndex !== index && (
                  <div className="hover-overlay">
                    <button
                      className="select-button"
                      onClick={() => onSelectProfile(index)}
                    >
                      Select for Profile
                    </button>
                  </div>
                )}
              </div>
            );
          })}
          <div className="add-image-button">
            <button onClick={handleAddImage}>+</button>
            <input
              id="imageUpload"
              hidden
              type="file"
              name="images"
              onChange={onFileInputChange}
              accept="image/jpeg, image/png, image/gif"
              multiple
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
