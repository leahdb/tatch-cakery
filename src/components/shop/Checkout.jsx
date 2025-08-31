import React, { useState, useEffect } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useCart } from "./UseCart";
import { checkout } from "../../services/shop/cart";

const Checkout = ({setCartCount}) => {
  const deliveryAreas = {
    "Beirut": ["Manara", "Hamra", "Achrafieh", "Verdun", "Raouché", "Qoreitem", "Ain el-Tineh", "Clemenceau", "Sanyeh", "Tallet el-Khayat", "Mar Elias", "Zuqaq al-Blat", "Batrakieh", "Mina el-Hosn", "Qantari", "Down Town", "Basta el-Tahta", "Bachoura", "Burj Abi Haidar", "Basta el-Faouqa", "Ras el-Nabaa", "Mazraa", "Tariq el-Jdideh", "Sioufi", "Sodeco", "Saifi", "Gemmayzeh", "Badaro", "Mar Mikhaël"],
    "Aley": ["Aramoun", "Bchamoun", "Choueifat", "Khalde",],
    "Baabda": ["Ain el Remmaneh", "Bourj el-Barajneh", "Chiyah", "Furn el Chebbak", "Ghbeireh", "Hadath", "Haret Hreik", "Hazmieh", "Laylakeh"],
    "Matn": ["Antelias", "Bouchrieh", "Bourj Hammoud", "Dbayeh", "Dekwaneh", "Mansourieh", "Jal el Dib", "Jdeideh", "Sin el Fil", "Zalka"],
    "Chouf": ["Naameh", "Damour", "Haret El Naameh", "Mechref"],
  };

  const [form, setForm] = useState({
    contact_number: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    state: "",
    city: "",
    street: "",
    address: "",
    building: "",
    note: "",
    delivery_date: "",
    delivery_time: "",
    coupon_code: "",
    payment_method: "cod",
    agree_to_terms: false,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const { cart, totalItems, totalPrice, loading } = useCart();

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = (e) => {
    e.preventDefault(); 
    setError(null);
    checkout(form).then((res) => {
      setSuccess("Order placed successfully");
      setCartCount(0);
    });
  };

  if (loading) return (
    <div className="d-flex align-items-center" style={{height: "100vh"}}>
      <DotLottieReact
        src="https://lottie.host/610317e0-ecdf-497f-9224-6fed273a4574/UVCpOZhutB.lottie"
        loop
        autoplay
        style={{height: "auto"}}
      />
    </div>
  );

  return (
    <div className="container my-5">
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-xl-8 col-lg-8 mb-4 px-5">
          <div className="card mb-4 border shadow-0">
            <div className="p-4">
              <h5 className="card-title mb-3">Contact</h5>
              <input type="text" id="typeText" name="contact_number" placeholder="mobile phone number" className="form-control" onChange={onChange} required/>
            </div>
          </div>
          <div className="card mb-4 shadow-0 border">
            <div className="p-4">
              <h5 className="card-title mb-3">Shipping Address</h5>
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">First name</p>
                  <div className="form-outline">
                    <input type="text" id="typeText" name="first_name" placeholder="first name" className="form-control" onChange={onChange} required />
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">Last name</p>
                  <div className="form-outline">
                    <input type="text" id="typeText" name="last_name" placeholder="last name" className="form-control" onChange={onChange} required />
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">Phone</p>
                  <div className="form-outline">
                    <input type="tel" id="typePhone" name="phone_number" className="form-control" onChange={onChange} required />
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">District</p>
                  <select
                    className="form-select"
                    value={form.state}
                    onChange={(e) => {
                      setForm(prev => ({ ...prev, state: e.target.value, city: "" }));
                    }}
                    name="state" required
                  >
                    <option value="">Select District</option>
                    {Object.keys(deliveryAreas).sort().map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ✅ City Dropdown */}
                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">City</p>
                  <select
                    className="form-select"
                    value={form.city}
                    onChange={(e) => {
                      setForm(prev => ({ ...prev, city: e.target.value }));
                    }}
                    name="city" required
                    disabled={!form.state}
                  >
                    <option value="">Select City</option>
                    {form.state &&
                      deliveryAreas[form.state].slice().sort().map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">Street</p>
                  <div className="form-outline">
                    <input type="text" id="typeEmail" placeholder="" className="form-control" name="street" onChange={onChange} required />
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <p className="mb-0">Address</p>
                  <div className="form-outline">
                    <input type="text" id="typeEmail" placeholder="" className="form-control" name="address" onChange={onChange} />
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <p className="mb-0">Building, apartment, floor, ect.</p>
                  <div className="form-outline">
                    <input type="text" id="typeEmail" placeholder="" className="form-control" name="building" onChange={onChange} />
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <h5 className="card-title mb-3">Delivery</h5>
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">Delivery Date</p>
                  <div className="form-outline">
                    <input type="date" id="typeText" placeholder="date" className="form-control" name="delivery_date" onChange={onChange} required />
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">Delivery Time</p>
                  <div className="form-outline">
                    <input type="time" id="typeText" placeholder="time" className="form-control" name="delivery_time" onChange={onChange} required />
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <p className="mb-0">Delivery Note</p>
                  <div className="form-outline">
                    <input type="text" id="typeText" placeholder="last name" className="form-control" name="note" onChange={onChange} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-4 border shadow-0">
            <div className="p-4">
              <h5 className="card-title mb-3">Payment Method</h5>
              <input type="text" id="typeText" placeholder="mobile phone number" className="form-control" />
            </div>
          </div>
          <div className="w-100">
            <button type="submit" className="btn btn-primary shadow-0 border rounded-0 w-100 py-2">Place Order</button>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 d-flex justify-content-center px-5">
          <div className="mt-4 mt-lg-0 w-100">
            <h6 className="mb-3">Summary</h6>
            <div className="d-flex justify-content-between">
              <p className="mb-2">Subtotal</p>
              <p className="mb-2">$195.90</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="mb-2">Discount</p>
              <p className="mb-2 text-danger">- $60.00</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="mb-2">Shipping</p>
              <p className="mb-2">+ $14.00</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <p className="mb-2">Total</p>
              <p className="mb-2 fw-bold">$149.90</p>
            </div>

            <hr />
            {cart.map((item) => (
              <div className="d-flex align-items-center mt-5 mb-4">
                <div className="me-3 position-relative">
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary bg-primary">
                    {item.quantity}
                  </span>
                  <img src={item.image} className="img-sm-checkout rounded border" />
                </div>
                <div className="">
                  <a href="#" className="nav-link">
                    {item.name}
                  </a>
                  <div className="price text-muted">${item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  </div>
  );
};

export default Checkout;
