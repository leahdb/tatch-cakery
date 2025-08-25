import React, { useState, useEffect } from "react";

const Checkout = () => {
  const deliveryAreas = {
    "Beirut": ["Manara", "Hamra", "Achrafieh", "Verdun", "Raouché", "Qoreitem", "Ain el-Tineh", "Clemenceau", "Sanyeh", "Tallet el-Khayat", "Mar Elias", "Zuqaq al-Blat", "Batrakieh", "Mina el-Hosn", "Qantari", "Down Town", "Basta el-Tahta", "Bachoura", "Burj Abi Haidar", "Basta el-Faouqa", "Ras el-Nabaa", "Mazraa", "Tariq el-Jdideh", "Sioufi", "Sodeco", "Saifi", "Gemmayzeh", "Badaro", "Mar Mikhaël"],
    "Aley": ["Aramoun", "Bchamoun", "Choueifat", "Khalde",],
    "Baabda": ["Ain el Remmaneh", "Bourj el-Barajneh", "Chiyah", "Furn el Chebbak", "Ghbeireh", "Hadath", "Haret Hreik", "Hazmieh", "Laylakeh"],
    "Matn": ["Antelias", "Bouchrieh", "Bourj Hammoud", "Dbayeh", "Dekwaneh", "Mansourieh", "Jal el Dib", "Jdeideh", "Sin el Fil", "Zalka"],
    "Chouf": ["Naameh", "Damour", "Haret El Naameh", "Mechref"],
  };

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  return (
    <div className="container my-5">
    <div className="row">
      <div className="col-xl-8 col-lg-8 mb-4">
        <div className="card mb-4 border shadow-0">
          <div className="p-4">
            <h5 className="card-title mb-3">Contact</h5>
            <input type="text" id="typeText" placeholder="mobile phone number" className="form-control" />
          </div>
        </div>
        <div className="card shadow-0 border">
          <div className="p-4">
            <h5 className="card-title mb-3">Delivery</h5>
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <p className="mb-0">First name</p>
                <div className="form-outline">
                  <input type="text" id="typeText" placeholder="first name" className="form-control" />
                </div>
              </div>

              <div className="col-12 col-md-6 mb-3">
                <p className="mb-0">Last name</p>
                <div className="form-outline">
                  <input type="text" id="typeText" placeholder="last name" className="form-control" />
                </div>
              </div>

              <div className="col-12 col-md-6 mb-3">
                <p className="mb-0">Phone</p>
                <div className="form-outline">
                  <input type="tel" id="typePhone" value="+961 " className="form-control" />
                </div>
              </div>

              <div className="col-12 col-md-6 mb-3">
                <p className="mb-0">State</p>
                <select
                  className="form-select"
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedCity(""); // reset city when state changes
                  }}
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
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedState} // disable if no state chosen
                >
                  <option value="">Select City</option>
                  {selectedState &&
                    deliveryAreas[selectedState].slice().sort().map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-12 col-md-6 mb-3">
                <p className="mb-0">Street</p>
                <div className="form-outline">
                  <input type="email" id="typeEmail" placeholder="example@gmail.com" className="form-control" />
                </div>
              </div>
            </div>

            <hr className="my-4" />

            <h5 className="card-title mb-3">Shipping info</h5>

            <div className="row mb-3">
              <div className="col-lg-4 mb-3"> 
                <div className="form-check h-100 border rounded-3">
                  <div className="p-3">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                    <label className="form-check-label" for="flexRadioDefault1">
                      Express delivery <br />
                      <small className="text-muted">3-4 days via Fedex </small>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-check h-100 border rounded-3">
                  <div className="p-3">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                    <label className="form-check-label" for="flexRadioDefault2">
                      Post office <br />
                      <small className="text-muted">20-30 days via post </small>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-3">
                <div className="form-check h-100 border rounded-3">
                  <div className="p-3">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                    <label className="form-check-label" for="flexRadioDefault3">
                      Self pick-up <br />
                      <small className="text-muted">Come to our shop </small>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <p className="mb-0">Additional Notes</p>
              <div className="form-outline">
                <textarea className="form-control" id="textAreaExample1" rows="2"></textarea>
              </div>
            </div>

            <div className="float-end">
              <button className="btn btn-light border">Cancel</button>
              <button className="btn btn-primary shadow-0 border">Continue</button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-lg-4 d-flex justify-content-center justify-content-lg-end">
        <div className="ms-lg-4 mt-4 mt-lg-0">
          <h6 className="mb-3">Summary</h6>
          <div className="d-flex justify-content-between">
            <p className="mb-2">Total price:</p>
            <p className="mb-2">$195.90</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="mb-2">Discount:</p>
            <p className="mb-2 text-danger">- $60.00</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="mb-2">Shipping cost:</p>
            <p className="mb-2">+ $14.00</p>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="mb-2">Total price:</p>
            <p className="mb-2 fw-bold">$149.90</p>
          </div>

          <hr />
          <h6 className="text-dark my-4">Items in cart</h6>

          <div className="d-flex align-items-center mb-4">
            <div className="me-3 position-relative">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                1
              </span>
              <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp" className="img-sm rounded border" />
            </div>
            <div className="">
              <a href="#" className="nav-link">
                Gaming Headset with Mic <br />
                Darkblue color
              </a>
              <div className="price text-muted">Total: $295.99</div>
            </div>
          </div>

          <div className="d-flex align-items-center mb-4">
            <div className="me-3 position-relative">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                1
              </span>
              <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp" className="img-sm rounded border" />
            </div>
            <div className="">
              <a href="#" className="nav-link">
                Apple Watch Series 4 Space <br />
                Large size
              </a>
              <div className="price text-muted">Total: $217.99</div>
            </div>
          </div>

          <div className="d-flex align-items-center mb-4">
            <div className="me-3 position-relative">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary">
                3
              </span>
              <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/1.webp" className="img-sm rounded border" />
            </div>
            <div className="">
              <a href="#" className="nav-link">GoPro HERO6 4K Action Camera - Black</a>
              <div className="price text-muted">Total: $910.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Checkout;
