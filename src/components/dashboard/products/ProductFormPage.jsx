import React, { useEffect, useRef } from "react";
import Select from "react-select";
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
  const [shouldRedirectToProductView, setShouldRedirectToProductView] =
    useState(false);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [categories, setCategories] = useState([]);

  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    brand_name: "",
    description: "",
    price: "",
    stock_quantity: "",
    moq: "",
    image: "",
    images: [],
    index: 0,
    product_category_id: 1,
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
        if (res.data) {
          setFormData(res.data);
          setSelectedProfileIndex(res.data.index);
        }
      }
    });
  }, []);

  useEffect(() => {
    if (id !== undefined) {
      fetch_shop_product(id).then((res) => {
        if (res.status === "ok") {
          setFormData({ ...res.data });
          setSelectedProfileIndex(res.data.index);
        }
      });
    }
  }, []);

  const handleTextInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "pet_type_ids") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
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

  const handleSelectInputChange = (name, selected) => {    
    handleTextInputChange({
      target: {
        name: name,
        value: selected.value,
      },
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
            <div className="d-flex flex-column gap-1 input-container">
              <label className="fw-semibold">Brand Name</label>
              <input
                type="text"
                name="brand_name"
                value={formData.brand_name}
                onChange={handleTextInputChange}
                placeholder={"Brand Name"}
              />
            </div>
          </div>

          <div className="d-flex flex-md-row flex-column">
            <div className="d-flex flex-column gap-1 input-container mb-md-0 mb-3">
              <label className="fw-semibold">Product Category</label>
              <Select
                name="category"
                options={categories}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="service..."
                onChange={(selected) => {
                  handleSelectInputChange("product_category_id", selected);
                }}
                value={categories.find(
                  (option) => option.value === formData.product_category_id
                )}
              />
            </div>
            <div className="d-flex flex-column gap-1 input-container">
              <label className="fw-semibold">Product Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleTextInputChange}
                placeholder={"Product Price"}
              />
            </div>
          </div>

          <div className="d-flex flex-md-row flex-column">
            <div className="d-flex flex-column gap-1 input-container mb-md-0 mb-3">
              <label className="fw-semibold">Stock Quantity</label>
              <input
                type="number"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleTextInputChange}
                placeholder={"Stock Quantity"}
              />
            </div>
            <div className="d-flex flex-column gap-1 input-container mb-md-0 mb-3">
              <label className="fw-semibold">Minimum Order Quantity</label>
              <input
                type="number"
                name="moq"
                value={formData.moq}
                onChange={handleTextInputChange}
                placeholder={"Minimum Order Quantity"}
              />
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
