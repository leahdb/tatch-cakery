import React, { useEffect } from "react";
import { useState } from "react";
import {
  add_shop_products,
  edit_shop_products,
  fetch_shop_product,
  fetch_product_create_form,
  fetch_product_edit_form,
} from "../../../services/dashboard/products";
import { Link, Navigate, useParams } from "react-router-dom";
import ImageUploader from "../../common/ImageUploader";

let removedImages = [];

const ProductFormPage = () => {
  const { id } = useParams();

  const [shouldRedirectToIndex, setShouldRedirectToIndex] = useState(false);
  const [shouldRedirectToProductView,] =
    useState(false);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [, setCategories] = useState([]);
  const [customizationTypes, setCustomizationTypes] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    cost: "",
    customization_type: "none",
    is_active: true,
    best_seller_position: "",
    image: "",
    images: [],
    index: 0,
  });

  useEffect(() => {
    let formDepCallback = () => {
      return fetch_product_create_form();
    };
    if (id !== undefined) {
      formDepCallback = () => {
        return fetch_product_edit_form(id);
      };
    }
    formDepCallback().then((res) => {
      if (res.status === "ok") {
        setCategories(res.categories);
        setCustomizationTypes(res.customization_types || {});
        if (res.data) {
          setFormData({
            ...res.data,
            customization_type: res.data.customization_type || "none",
            is_active: res.data.is_active === undefined ? true : Boolean(Number(res.data.is_active)),
            best_seller_position: res.data.best_seller_position ? String(res.data.best_seller_position) : "",
          });
          setSelectedProfileIndex(res.data.index);
        }
      }
    });
  }, [id]);

  useEffect(() => {
    if (id !== undefined) {
      fetch_shop_product(id).then((res) => {
        if (res.status === "ok") {
          setFormData({
            ...res.data,
            customization_type: res.data.customization_type || "none",
            is_active: res.data.is_active === undefined ? true : Boolean(Number(res.data.is_active)),
            best_seller_position: res.data.best_seller_position ? String(res.data.best_seller_position) : "",
          });
          setSelectedProfileIndex(res.data.index);
        }
      });
    }
  }, [id]);

  const handleTextInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: checked }));
  };

  const handleSelectProfile = (index) => {
    setSelectedProfileIndex(index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: formData.images[index],
      index: index,
    }));
  };

  useEffect(() => {
    console.log(selectedProfileIndex);
  }, [selectedProfileIndex]);

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: files[selectedProfileIndex],
      images: [...prevFormData.images, ...files],
      index: selectedProfileIndex,
    }));
  };

  useEffect(() => {
    console.log(formData);
    for (let i = 0; i < formData.images.length; i++) {
      formData[`images[${i}]`] = formData.images[i];
    }
  }, [formData]);

  const handleRemoveImage = (index) => {
    removedImages.push(formData.images[index].id);
    setFormData((prevFormData) => {
      const newImages = prevFormData.images.slice();
      newImages.splice(index, 1);

      const newIndex =
        index === selectedProfileIndex ? 0 : selectedProfileIndex;

      delete formData[`images[${index}]`];

      return {
        ...prevFormData,
        image: newImages.length > 0 ? newImages[newIndex] : "",
        images: newImages,
        index: newIndex,
        removedImages: removedImages,
      };
    });
  };

  const handleSave = () => {
    console.log(formData);
    if (id !== undefined) {
      edit_shop_products(id, formData).then((res) => {
        setShouldRedirectToIndex(res.status === "ok");
      });
    } else {
      add_shop_products(formData).then((res) => {
        setShouldRedirectToIndex(res.status === "ok");
      });
    }
  };

  if (shouldRedirectToIndex) {
    return <Navigate to={"/admin/products/list"} />;
  } else if (shouldRedirectToProductView) {
    return <Navigate to={"/admin/products/list"} />;
  }

  return (
    <div className="page-content products py-3 px-4 flex-grow-1 flex-shrink-1 bg-lightgray">
      <div className="mb-4">
        <span className="fw-bold dashboard-title">
          {id !== undefined ? "Edit Product" : "Add Product"}
        </span>
        <div className="breadcrumbs path fw-semibold gap-2 d-flex flex-row">
          <Link className={"link"} to={"/admin/"}>
            Dashboard
          </Link>
          <span>&gt;</span>
          <Link className={"link"} to={"/admin/products/list"}>
            Products
          </Link>
          <span>&gt;</span>
          <span>{id !== undefined ? formData.name : "New Product"}</span>
        </div>
      </div>

      <div className="inputs-container bg-white">
        <div className="product-info d-flex flex-column gap-4">
          <span className="product-info-title">PRODUCT INFO</span>

          <div className="d-flex flex-md-row flex-column">
            <div className="d-flex flex-column gap-1 input-container mb-md-0 mb-3">
              <label className="fw-semibold">Product Images</label>
              <ImageUploader
                images={formData.images}
                onFileInputChange={handleFileInputChange}
                onRemoveImage={handleRemoveImage}
                onSelectProfile={handleSelectProfile}
                selectedProfileIndex={selectedProfileIndex}
              />
            </div>
          </div>

          <div className="d-flex flex-md-row flex-column">
            <div className="d-flex flex-column gap-1 input-container mb-md-0 mb-3">
              <label className="fw-semibold">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleTextInputChange}
                placeholder={"Product Name"}
              />
            </div>
          </div>

          <div className="d-flex flex-md-row flex-column">
            <div className="d-flex flex-column gap-1 input-container mb-md-0 mb-3">
              <label className="fw-semibold">Product Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleTextInputChange}
                placeholder={"Product Price"}
              />
            </div>
            <div className="d-flex flex-column gap-1 input-container mb-md-0 mb-3">
              <label className="fw-semibold">Product Cost</label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleTextInputChange}
                placeholder={"Product Cost"}
              />
            </div>
            <div className="d-flex flex-column gap-1 input-container mb-md-0 mb-3">
              <label className="fw-semibold">Customization Type</label>
              <select
                name="customization_type"
                value={formData.customization_type || "none"}
                onChange={handleTextInputChange}
              >
                {Object.entries(customizationTypes).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div className="d-flex flex-column gap-1 input-container mb-md-0 mb-3">
              <label className="fw-semibold">Product Status</label>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="is_active"
                  name="is_active"
                  checked={!!formData.is_active}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="is_active">
                  {formData.is_active ? "Active (visible on storefront)" : "Disabled (hidden from storefront)"}
                </label>
              </div>
            </div>
            <div className="d-flex flex-column gap-1 input-container mb-md-0 mb-3">
              <label className="fw-semibold">Best Seller Slot</label>
              <select
                name="best_seller_position"
                value={formData.best_seller_position || ""}
                onChange={handleTextInputChange}
              >
                <option value="">Not a best seller</option>
                <option value="1">Slot 1</option>
                <option value="2">Slot 2</option>
                <option value="3">Slot 3</option>
                <option value="4">Slot 4</option>
              </select>
            </div>
          </div>

          <div className="d-flex flex-md-row flex-column">
            <div className="d-flex flex-column gap-1 input-container mb-md-0 mb-3">
              <label className="fw-semibold">Product Description</label>
              <textarea
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleTextInputChange}
                placeholder={"Product Description..."}
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-md-row flex-column justify-content-md-end align-items-center gap-3 btn-containers">
          <button className={"btn btn-primary px-5 my-4"} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormPage;
