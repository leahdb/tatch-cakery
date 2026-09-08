import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import LoadingScreen from "../common/LoadingScreen";
import { useCart } from "./UseCart";
import { checkout, apply_coupon, remove_coupon } from "../../services/shop/cart";
import { formatLBP } from "../../services/utils/currency";

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
  const d = new Date(date);
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
const buildDateOptions = (days = 30, startOffsetDays = 0) => {
  const today = new Date();
  today.setHours(0,0,0,0);
  return Array.from({ length: days + 1 - startOffsetDays }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + startOffsetDays + i);
    return { value: toISODate(d), label: formatDateLabel(d) };
  });
};

// Build 30-min slots between 10:00 → 22:00 for a given date
const buildTimeSlots = (isoDate) => {
  if (!isoDate) return [];
  const start = new Date(`${isoDate}T10:00:00`);
  const end   = new Date(`${isoDate}T22:00:00`);
  const now   = new Date();
  const isToday = isoDate === toISODate(now);
  const earliest = isToday ? ceilToNextHalfHour(now) : start;

  const slots = [];
  for (let t = new Date(start); t < end; t = new Date(t.getTime() + 30 * 60000)) {
    const t2 = new Date(t.getTime() + 30 * 60000);
    if (isToday && t < earliest) continue; // hide past slots
    slots.push({
      value: `${t.toISOString()}|${t2.toISOString()}`,
      label: `${formatTimeLabel(t)} - ${formatTimeLabel(t2)}`
    });
  }
  return slots;
};

const isAfter9pmBeirut = () => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ, hour: "numeric", minute: "numeric", hour12: false
  }).formatToParts(new Date());
  const h = Number(parts.find(p => p.type === "hour").value);
  const m = Number(parts.find(p => p.type === "minute").value);
  return h > 21 || (h === 21 && m >= 0);
};

// District -> city -> delivery fee (LBP) from the courier's price list.
// Keep in sync with computeDeliveryFee() in CartController.php (backend is
// authoritative — it recomputes the fee at checkout).
const deliveryAreas = {
  "Beirut": {
    "Manara": 400000, "Raouché": 400000,
    "Hamra": 350000, "Qoreitem": 350000, "Ain el-Tineh": 350000, "Clemenceau": 350000,
    "Sanyeh": 350000, "Mina el-Hosn": 350000, "Down Town": 350000, "Mar Mikhaël": 350000,
    "Achrafieh": 300000, "Verdun": 300000, "Tallet el-Khayat": 300000, "Mar Elias": 300000,
    "Zuqaq al-Blat": 300000, "Batrakieh": 300000, "Qantari": 300000, "Basta el-Tahta": 300000,
    "Basta el-Faouqa": 300000, "Bachoura": 300000, "Burj Abi Haidar": 300000, "Ras el-Nabaa": 300000,
    "Tariq el-Jdideh": 300000, "Mazraa": 300000, "Saifi": 300000, "Gemmayzeh": 300000,
    "Sodeco": 250000, "Badaro": 250000, "Sioufi": 250000,
  },

  "Aley": {
    "Aramoun": 650000, "Bchamoun": 550000, "Choueifat": 350000, "Khalde": 700000,
  },

  "Baabda": {
    "Ain el Remmaneh": 200000, "Furn el Chebbak": 200000,
    "Bourj el-Barajneh": 300000,
    "Chiyah": 250000, "Ghbeireh": 250000, "Hadath": 250000, "Haret Hreik": 250000,
    "Laylakeh": 250000, "Hazmieh": 250000, "Baabda": 250000,
  },

  "Matn": {
    "Antelias": 450000, "Jal el Dib": 450000, "Dbayeh": 450000, "Zalka": 450000,
    "Bouchrieh": 300000, "Bourj Hammoud": 300000, "Jdeideh": 300000, "Mansourieh": 300000,
    "Dekwaneh": 300000,
    "Sin el Fil": 250000,
  },

  "Keserwan": {
    "Adonis": 800000, "Ghadir": 800000, "Jounieh": 800000, "Kaslik": 800000,
    "Sarba": 800000, "Zouk Mosbeh": 800000,
  },
};

const computeDeliveryFee = (city) => {
  if (!city) return 0;
  for (const zone of Object.values(deliveryAreas)) {
    if (zone[city] != null) return zone[city];
  }
  return 300000; // fallback for a city not in the courier list
};

const Checkout = () => {
  const { setCartCount } = useOutletContext();

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
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const mapLaravelErrors = (errs = {}) => {
    const out = {};
    Object.entries(errs).forEach(([k, arr]) => {
      if (Array.isArray(arr) && arr.length) out[k] = arr[0];
    });
    return out;
  };

  const validateForm = () => {
    const errs = {};

    // contact
    if (!form.contact_number?.trim()) errs.contact_number = "Required";

    // name
    if (!form.first_name?.trim()) errs.first_name = "Required";
    if (!form.last_name?.trim())  errs.last_name  = "Required";

    // phone
    if (!form.phone_number?.trim()) errs.phone_number = "Required";

    // address
    if (!form.state) errs.state = "Please select a district";
    if (!form.city)  errs.city  = "Please select a city";
    if (!form.street?.trim()) errs.street = "Required";
    if (!form.building?.trim()) errs.building = "Required";

    // delivery selection
    if (fulfillmentType === "schedule") {
      if (!selectedDate) errs.delivery_date = "Pick a delivery date";
      if (!selectedSlot) errs.delivery_time = "Pick a time slot";
    }

    return errs;
  };

  const scrollToFirstError = (errs) => {
    const firstKey = Object.keys(errs)[0];
    if (!firstKey) return;
    const el = document.querySelector(`[data-field="${firstKey}"]`);
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const [buttonText, setButtonText] = useState("Place Order")
  
  const { cart, totalItems, totalPrice, discountPercent, loading } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState(null);
  const [applying, setApplying] = useState(false);

  const [fulfillmentType, setFulfillmentType] = useState("now");
  const [dateOptions, setDateOptions] = useState(() => buildDateOptions(30));
  const [timeOptions, setTimeOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(toISODate(new Date()));
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedTimeLabel, setSelectedTimeLabel] = useState( timeOptions?.[0]?.label ? timeOptions?.[0]?.label : "now");

  const onSlotChange = (e) => {
    setSelectedSlot(e.target.value);
    const label = e.target.selectedOptions?.[0]?.dataset.label || e.target.selectedOptions?.[0]?.text || "";
    setSelectedTimeLabel(label);
  };

  const after9pm  = useMemo(isAfter9pmBeirut, []);
  const nowDisabled = after9pm;

  // If "Now" is disabled: force Schedule and start dates from tomorrow
  useEffect(() => {
    const startOffsetDays = nowDisabled ? 1 : 0;
    const opts = buildDateOptions(30, startOffsetDays);
    setDateOptions(opts);

    if (nowDisabled) {
      setFulfillmentType("schedule");
      setSelectedDate(opts[0]?.value);
    } else {
      // keep current selectedDate if still in the list; else reset to today
      const stillValid = opts.some(o => o.value === selectedDate);
      if (!stillValid) setSelectedDate(opts[0]?.value);
    }
  }, [nowDisabled, selectedDate]);

  useEffect(() => {
    if (fulfillmentType !== "schedule") { setTimeOptions([]); setSelectedSlot(""); return; }
    let slots = buildTimeSlots(selectedDate);
    if (slots.length === 0) {
      // move to tomorrow first slot
      const opts = buildDateOptions(30, 1);
      setSelectedDate(opts[0]?.value);
      slots = buildTimeSlots(opts[0]?.value);
    }
    setTimeOptions(slots);
    setSelectedTimeLabel(slots?.[0]?.label)
    if (!selectedSlot && slots.length) setSelectedSlot(slots[0].value);
  }, [fulfillmentType, selectedDate, selectedSlot]);

  const shipping = useMemo(() => computeDeliveryFee(form.city), [form.city]);

  // Sitewide auto-discount (no code); `discount` state below holds the extra promo-code amount.
  const autoDiscount = useMemo(
    () => Math.round((Number(totalPrice) * (Number(discountPercent) || 0)) / 100),
    [totalPrice, discountPercent]
  );

  const totalDiscount = autoDiscount + (promo ? Number(discount) : 0);

  const total = useMemo(() => {
    return Number(totalPrice) - totalDiscount + Number(shipping || 0);
  }, [totalPrice, totalDiscount, shipping]);

  const handleApply = async (e) => {
    e?.preventDefault();
    if (!promoInput) return;
    setApplying(true); setPromoError(null);
    try {
      const data = await apply_coupon({ code: promoInput, phone_number: form.phone_number });
      if (data.status === "error") {
        setPromo(null); setDiscount(0);
        setPromoError(data.message || "Invalid or inactive code");
        return;
      }
      setPromo(data.coupon);
      setDiscount(Number(data.pricing.coupon_discount ?? data.pricing.discount ?? 0));
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

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setFieldErrors({});
    setButtonText("Placing...")

    const clientErrs = validateForm();
    if (Object.keys(clientErrs).length) {
      setButtonText("Place Order");
      setFieldErrors(clientErrs);
      scrollToFirstError(clientErrs);
      return;
    }

    // If "Now" is disabled but somehow selected, force schedule for tomorrow
    let type = fulfillmentType;
    let date = selectedDate;
    let slot = selectedSlot;

    if (nowDisabled || (type !== "schedule" && nowDisabled)) {
      type = "schedule";
      const opts = buildDateOptions(30, 1);
      date = opts[0]?.value;
      const slots = buildTimeSlots(date);
      slot = slots[0]?.value || "";
    }

    const payload = { ...form, coupon_code: promoInput };

    if (type === "now") {
      payload.delivery_type = "now";
      payload.delivery_date = "now"
      payload.delivery_time = "now"
    } else {
      payload.delivery_type = "schedule";
      payload.delivery_date = date;
      payload.delivery_time = selectedTimeLabel;
      const [fromISO, toISO] = (slot || "").split("|");
      payload.delivery_from = fromISO;
      payload.delivery_to   = toISO;
    }

    checkout(payload)
      .then((res) => {
        const orderId = res?.order?.id ?? res?.order_id ?? null;
        const orderNumber = res?.order?.order_number ?? res?.order_number ?? null;

        setCartCount(0);
        setButtonText("Place Order")

        navigate("/thank-you", {
          state: {
            orderId,
            orderNumber,
            deliveryType: payload.delivery_type,
            deliveryDate: payload.delivery_date,
            timeLabel: payload.delivery_type === "now" ? "ASAP" : selectedTimeLabel,
            name: form.first_name,
            deliveryPrice: shipping,
          },
          replace: true,
        });
      })
      .catch((err) => {
        setButtonText("Place Order");

        if (err.status === 422) {
          // Laravel validation errors
          const errs = mapLaravelErrors(err.data?.errors || {});
          setFieldErrors(errs);
          // Also show a compact summary at top:
          setError(err.data?.message || "Please fix the highlighted fields.");
          scrollToFirstError(errs);
        } else {
          setError(err.message || "Something went wrong, please try again.");
        }
      });
  };

  if (loading) return <LoadingScreen />;

  if (totalItems === 0) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
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
        <div className="col-xl-8 col-lg-8 mb-4 px-4 px-md-5">
          <div className="card mb-4 border shadow-0">
            <div className="p-4">
              <h5 className="card-title mb-3">Contact</h5>
              <input
                type="tel"
                id="typePhone"
                name="contact_number"
                placeholder="mobile phone number"
                className={`form-control ${fieldErrors.contact_number ? "is-invalid" : ""}`}
                onChange={onChange}
                data-field="contact_number"
              />
              {fieldErrors.contact_number && (
                <div className="invalid-feedback">{fieldErrors.contact_number}</div>
              )}
            </div>
          </div>
          <div className="card mb-4 shadow-0 border">
            <div className="p-4">
              <h5 className="card-title mb-3">Shipping Address</h5>
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">First name</p>
                  <div className="form-outline">
                    <input
                      type="text"
                      name="first_name"
                      placeholder="first name"
                      className={`form-control ${fieldErrors.first_name ? "is-invalid" : ""}`}
                      onChange={onChange}
                      data-field="first_name"
                    />
                    {fieldErrors.first_name && (
                      <div className="invalid-feedback">{fieldErrors.first_name}</div>
                    )}
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">Last name</p>
                  <div className="form-outline">
                    <input
                      type="text"
                      name="last_name"
                      placeholder="last name"
                      className={`form-control ${fieldErrors.last_name ? "is-invalid" : ""}`}
                      onChange={onChange}
                      data-field="last_name"
                    />
                    {fieldErrors.last_name && (
                      <div className="invalid-feedback">{fieldErrors.last_name}</div>
                    )}
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">Phone</p>
                  <div className="form-outline">
                    <input
                      type="tel"
                      name="phone_number"
                      className={`form-control ${fieldErrors.phone_number ? "is-invalid" : ""}`}
                      onChange={onChange}
                      data-field="phone_number"
                    />
                    {fieldErrors.phone_number && (
                      <div className="invalid-feedback">{fieldErrors.phone_number}</div>
                    )}
                  </div>
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">District</p>
                  <select
                    className={`form-select ${fieldErrors.state ? "is-invalid" : ""}`}
                    value={form.state}
                    onChange={(e) => setForm(prev => ({ ...prev, state: e.target.value, city: "" }))}
                    name="state"
                    data-field="state"
                  >
                    <option value="">Select District</option>
                    {Object.keys(deliveryAreas).sort().map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {fieldErrors.state && <div className="invalid-feedback d-block">{fieldErrors.state}</div>}
                </div>

                {/* ✅ City Dropdown */}
                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">City</p>
                  <select
                    className={`form-select ${fieldErrors.city ? "is-invalid" : ""}`}
                    value={form.city}
                    onChange={(e) => setForm(prev => ({ ...prev, city: e.target.value }))}
                    name="city"
                    disabled={!form.state}
                    data-field="city"
                  >
                    <option value="">Select City</option>
                    {form.state && Object.keys(deliveryAreas[form.state]).sort().map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {fieldErrors.city && <div className="invalid-feedback d-block">{fieldErrors.city}</div>}
                </div>

                <div className="col-12 col-md-6 mb-3">
                  <p className="mb-0">Street</p>
                  <div className="form-outline">
                    <input
                      type="text"
                      className={`form-control ${fieldErrors.street ? "is-invalid" : ""}`}
                      name="street"
                      onChange={onChange}
                      data-field="street"
                    />
                    {fieldErrors.street && <div className="invalid-feedback">{fieldErrors.street}</div>}
                  </div>
                </div>

                <div className="col-12 mb-3">
                  <p className="mb-0">Building, apartment, floor, ect.</p>
                  <div className="form-outline">
                    <input 
                      type="text" 
                      id="typeText" 
                      placeholder="" 
                      className={`form-control ${fieldErrors.building ? "is-invalid" : ""}`} 
                      name="building" 
                      onChange={onChange} 
                    />
                    {fieldErrors.building && <div className="invalid-feedback">{fieldErrors.building}</div>}
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <h5 className="card-title mb-3">Delivery</h5>
              <div className="row">
                {/* Now vs Schedule toggle */}
                <div className="col-12 mb-3 d-md-flex align-items-start">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="deliveryNow"
                      name="fulfillmentType"
                      value="now"
                      checked={fulfillmentType === "now"}
                      onChange={() => setFulfillmentType("now")}
                      disabled={nowDisabled}
                    />
                    <label className="form-check-label" htmlFor="deliveryNow">Now (in 30 - 60 mins)</label>
                    {nowDisabled && (
                      <small className="text-muted ms-2 d-block">
                        Orders after 9:00 PM are for tomorrow.
                      </small>
                    )}
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
                    <label className="form-check-label" htmlFor="deliverySchedule">Schedule for later</label>
                  </div>
                </div>
                {fulfillmentType === "schedule"  && (
                  <div className="col-12 col-md-6 mb-3">
                    <p className="mb-0">Delivery Date</p>
                    <select
                      className={`form-select ${fieldErrors.delivery_date ? "is-invalid" : ""}`}
                      disabled={fulfillmentType !== "schedule"}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      data-field="delivery_date"
                    >
                      {dateOptions.map((d) => (
                        <option key={d.value} value={d.value}>{d.label}</option>
                      ))}
                    </select>
                    {fieldErrors.delivery_date && (
                      <div className="invalid-feedback d-block">{fieldErrors.delivery_date}</div>
                    )}
                  </div>
                )}
                {fulfillmentType === "schedule"  && (
                  <div className="col-12 col-md-6 mb-3">
                    <p className="mb-0">Delivery Time</p>
                    <select
                      className={`form-select ${fieldErrors.delivery_time ? "is-invalid" : ""}`}
                      disabled={fulfillmentType !== "schedule"}
                      value={selectedSlot}
                      onChange={onSlotChange}
                      data-field="delivery_time"
                    >
                      {timeOptions.length === 0 && (
                        <option value="">No slots left today — pick another date</option>
                      )}
                      {timeOptions.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                )}
                {/* Note */}
                <div className="col-12 mb-3">
                  <p className="mb-0">Delivery Note</p>
                  <input type="text" className="form-control" name="note" onChange={onChange} />
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-4 border shadow-0">
            <div className="p-4">
              <h5 className="card-title mb-3">Payment Method</h5>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id="paymentMethod"
                  name="paymentMethod"
                  checked
                />
                <label className="form-check-label" htmlFor="paymentMethod">Cash on delivery</label>
              </div>
            </div>
          </div>
          <div className="w-100">
            <button type="submit" className="btn btn-primary shadow-0 border rounded-0 w-100 py-2">{buttonText}</button>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 px-4 px-md-5">
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
                {promoError && <small className="text-danger">{promoError}</small>}
                {promo && <small className="text-success">Applied: {promo.label || promo.code}</small>}
              </div>
            </div>
          </div>
          <div className="card rounded-0 bg-light-beige shadow-0 border-light-beige border">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <p className="mb-2">Subtotal</p>
                <p className="mb-2">{formatLBP(totalPrice)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="mb-2">Discount{discountPercent && !promo ? ` (${discountPercent}%)` : ""}</p>
                <p className="mb-2 text-primary">{totalDiscount ? `- ${formatLBP(totalDiscount)}` : formatLBP(0)}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="mb-2">Shipping</p>
                <p className="mb-2 text-primary">{form.city ? formatLBP(shipping) : <span className="small">Calculated after address</span>}</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <p className="mb-2">Total</p>
                <p className="mb-2 fw-bold">{formatLBP(total)}</p>
              </div>
            </div>
          </div>
          {cart.map((item) => (
            <div className="d-flex align-items-center mt-5 mb-4">
              <div className="me-3 position-relative">
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill badge-secondary bg-primary good-circle">
                  {item.quantity}
                </span>
                <img src={item.preview || item.image} className="img-sm-checkout rounded border" loading="lazy" alt="item"/>
              </div>
              <div className="">
                <button type="button" className="nav-link">
                  {item.name}
                </button>
                <div className="price text-muted">{formatLBP(item.price)}</div>
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
