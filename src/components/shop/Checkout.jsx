import React, { useState, useEffect, useMemo } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useCart } from "./UseCart";
import { checkout, apply_coupon, remove_coupon } from "../../services/shop/cart";

const TZ = "Asia/Beirut";

// Formats "Mon, Sep 01"
const formatDateLabel = (d) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: TZ, weekday: "short", month: "short", day: "2-digit"
  }).format(d);

// Formats "10:00 AM"
const formatTimeLabel = (d) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: TZ, hour: "2-digit", minute: "2-digit", hour12: true
  }).format(d);

// YYYY-MM-DD (safe for inputs/values)
const toISODate = (d) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(d);

// Round up to next :00 or :30
const ceilToNextHalfHour = (date) => {
  const d = new Date(date.getTime());
  d.setSeconds(0, 0);
  const m = d.getMinutes();
  if (m === 0 || m === 30) return d;
  if (m < 30) d.setMinutes(30);
  else {
    d.setMinutes(0);
    d.setHours(d.getHours() + 1);
  }
  return d;
};

// Build next N days (today inclusive)
const buildDateOptions = (days = 30) => {
  const today = new Date();
  today.setHours(0,0,0,0);
  return Array.from({ length: days + 1 }).map((_, i) => {
    const d = new Date(today.getTime());
    d.setDate(d.getDate() + i);
    return { value: toISODate(d), label: formatDateLabel(d) };
  });
};

// Build 30-min slots between 10:00 → 22:00 for a given date
const buildTimeSlots = (isoDate, includePastForNonToday = false) => {
  if (!isoDate) return [];
  const start = new Date(`${isoDate}T10:00:00`); // local time
  const end   = new Date(`${isoDate}T22:00:00`);
  const now   = new Date();
  const isToday = isoDate === toISODate(now);

  const earliest = isToday ? ceilToNextHalfHour(now) : start;

  const slots = [];
  for (let t = new Date(start); t < end; t = new Date(t.getTime() + 30 * 60000)) {
    const t2 = new Date(t.getTime() + 30 * 60000);
    // Skip past slots for today
    if (isToday && t < earliest) continue;
    // Build label/value
    const label = `${formatTimeLabel(t)} - ${formatTimeLabel(t2)}`;
    // Value can be "startISO|endISO" or just label; choose what your backend prefers
    const value = `${t.toISOString()}|${t2.toISOString()}`;
    slots.push({ value, label });
  }
  return slots;
};

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

  const fmt = (n) => `$${Number(n || 0).toFixed(2)}`;

  const computeDeliveryFee = (city) => {
    if (!city) return 0;
    const group1 = ["Aramoun","Bchamoun","Choueifat","Khalde","Naameh","Damour","Haret El Naameh","Mechref","Antelias","Bouchrieh","Bourj Hammoud","Dbayeh","Dekwaneh","Mansourieh","Jal el Dib","Jdeideh","Zalka"];
    const group2 = ["Sin el Fil","Ain el Remmaneh","Bourj el-Barajneh","Chiyah","Furn el Chebbak","Ghbeireh","Hadath","Haret Hreik","Hazmieh","Laylakeh"];
    if (group1.includes(city)) return 4;
    if (group2.includes(city)) return 3;
    return 2; 
  };

  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState(null);
  const [applying, setApplying] = useState(false);

  const [fulfillmentType, setFulfillmentType] = useState("now"); // "now" | "schedule"
  const [dateOptions, setDateOptions] = useState(() => buildDateOptions(30));
  const [timeOptions, setTimeOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(toISODate(new Date()));
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    if (fulfillmentType === "schedule") {
      const slots = buildTimeSlots(selectedDate);
      setTimeOptions(slots);
      // auto-pick first available slot if none is chosen yet
      if (!selectedSlot && slots.length) setSelectedSlot(slots[0].value);
    } else {
      setTimeOptions([]);
      setSelectedSlot("");
    }
  }, [fulfillmentType, selectedDate]);

  const shipping = useMemo(() => computeDeliveryFee(form.city), [form.city]);

  const total = useMemo(() => {
    return Number(totalPrice) - Number(discount) + Number(shipping || 0);
  }, [totalPrice, discount, shipping]);

  const handleApply = async (e) => {
    e?.preventDefault();
    if (!promoInput) return;
    setApplying(true); setPromoError(null);
    try {
      const data = await apply_coupon({ code: promoInput });
      setPromo(data.coupon);
      setDiscount(Number(data.pricing.discount || 0));
    } catch (err) {
      setPromo(null); setDiscount(0);
      setPromoError(err.message);
    } finally { setApplying(false); }
  };

  const handleRemovePromo = async (e) => {
    e?.preventDefault();
    try { await remove_coupon(); } finally {
      setPromo(null); setDiscount(0); setPromoError(null);
    }
  };

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

  if (totalItems === 0) {
    return (
      <div className="d-flex align-items-center" style={{height: "100vh"}}>
        <div className="text-center">
          <h4 className="text-primary">Bag is empty</h4>
          <a className="btn btn-primary rounded-0" href="/">
            Start Shopping
          </a>
        </div>
      </div>
    );
  }

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
                  <p className="mb-0">Building, apartment, floor, ect.</p>
                  <div className="form-outline">
                    <input type="text" id="typeEmail" placeholder="" className="form-control" name="building" onChange={onChange} />
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <h5 className="card-title mb-3">Delivery</h5>
              <div className="row">
                {/* Now vs Schedule toggle */}
                <div className="col-12 mb-3">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="deliveryNow"
                      name="fulfillmentType"
                      value="now"
                      checked={fulfillmentType === "now"}
                      onChange={() => setFulfillmentType("now")}
                    />
                    <label className="form-check-label" htmlFor="deliveryNow">Now (ASAP)</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="deliverySchedule"
                      name="fulfillmentType"
                      value="schedule"
                      checked={fulfillmentType === "schedule"}
                      onChange={() => setFulfillmentType("schedule")}
                    />
                    <label className="form-check-label" htmlFor="deliverySchedule">Schedule</label>
                  </div>
                </div>

                {/* Date */}
                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">Delivery Date</p>
                  <select
                    className="form-select"
                    disabled={fulfillmentType !== "schedule"}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required={fulfillmentType === "schedule"}
                  >
                    {dateOptions.map((d) => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>

                {/* Time slot */}
                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">Delivery Time</p>
                  <select
                    className="form-select"
                    disabled={fulfillmentType !== "schedule"}
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    required={fulfillmentType === "schedule"}
                  >
                    {timeOptions.length === 0 && (
                      <option value="">No slots left today — pick another date</option>
                    )}
                    {timeOptions.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>

                {/* Note */}
                <div className="col-12 mb-3">
                  <p className="mb-0">Delivery Note</p>
                  <input type="text" className="form-control" name="note" onChange={onChange} />
                </div>
              </div>
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
        <div className="col-xl-4 col-lg-4 px-5">
          <div className="card mb-3 border shadow-0 rounded-0 bg-light-beige border-light-beige">
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Have promo code?</label>
                <div className="input-group border">
                  <input
                    type="text"
                    className="form-control border-0 bg-light-beige-input"
                    placeholder="Promo code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleApply(e); } }}
                    disabled={!!promo || applying}
                  />
                  {promo ? (
                    <button
                      type="button"
                      className="btn btn-light border-0 bg-light-beige-input text-danger"
                      onClick={handleRemovePromo}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-light border-0 bg-light-beige-input remove-cart text-light-brown"
                      onClick={handleApply}
                      disabled={applying || !promoInput.trim()}
                    >
                      {applying ? 'Applying...' : 'Apply'}
                    </button>
                  )}
                </div>
                {promoError && <small className="text-danger">Invalid or inactive code</small>}
                {promo && <small className="text-success">Applied: {promo.label || promo.code}</small>}
              </div>
            </div>
          </div>
          <div className="card rounded-0 bg-light-beige shadow-0 border-light-beige border">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <p className="mb-2">Subtotal</p>
                <p className="mb-2">{fmt(totalPrice)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="mb-2">Discount</p>
                <p className="mb-2 text-primary">{fmt(promo ? discount : 0)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="mb-2">Shipping</p>
                <p className="mb-2 text-primary">{form.city ? fmt(shipping) : <span className="small">Calculated after address</span>}</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <p className="mb-2">Total</p>
                <p className="mb-2 fw-bold">{fmt(total)}</p>
              </div>
            </div>
          </div>
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
    </form>
  </div>
  );
};

export default Checkout;
