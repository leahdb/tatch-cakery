import { useState } from "react";
import { saveRegistrationData } from "../../services/auth";
import { Navigate } from "react-router-dom";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";

function RegisterForm(props) {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number_cc: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  });
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccessful, setloginSuccessful] = useState(false);
  const [userRole, setUserRole] = useState("");

  const [errors, setErrors] = useState({
    full_name: "",
    email: "",
    phone_number_cc: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  let login = (e) => {
    e.preventDefault();
    setErrors({
      full_name: "",
      email: "",
      phone_number_cc: "",
      phone_number: "",
      password: "",
      password_confirmation: "",
    });
    setGeneralErrorMessage("");
    setIsLoggingIn(true);

    saveRegistrationData(formData).then((response) => {
      setIsLoggingIn(false);

      if (response.status === "error") {
        if (response.type === "validation") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: response.data.email !== undefined ? response.data.email : "",
          }));
          setErrors((prevErrors) => ({
            ...prevErrors,
            password:
              response.data.password !== undefined
                ? response.data.password
                : "",
          }));
        }

        if (response.type === "general") {
          setGeneralErrorMessage(response.message);
        }
      } else {
        setloginSuccessful(true);
        setUserRole(response.data.role[0]);
      }
    });
  };

  if (loginSuccessful) {
    //return <Navigate to={"/"} />;
    return <Navigate to={userRole === "super-admin" ? "/admin" : "/"} />;
  }

  const handleTextInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePhoneNumberChange = (value) => {
    setFormData((prevData) => ({ ...prevData, phone_number: value }));
    return value;
  };

  const handlePhoneNumberBlur = () => {
    const value = formData.phone_number;
    if (typeof value === "string") {
      const digitCount = (value.match(/\d/g) || []).length;
      let parsedPhoneNumber = "";

      if (digitCount > 1) {
        parsedPhoneNumber = parsePhoneNumber(value);

        if (parsedPhoneNumber) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            phone_number: value,
            phone_number_cc: parsedPhoneNumber.countryCallingCode,
          }));
          setErrors((prevErrors) => ({
            ...prevErrors,
            phone_number: "",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phone_number: "Full Phone number is required.",
          }));
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone_number: "Full Phone number is required.",
        }));

        return parsedPhoneNumber;
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone_number: "Full Phone number is required.",
      }));
    }
  };

  return (
    <div className={props.class}>
      <form method="POST">
        <h1 className="mb-0 text-center">Create Account</h1>
        <p className="form-help mb-2">Enter your details to register</p>
        <div className="general_error error">{generalErrorMessage}</div>
        <div className="mb-2">
          <label htmlFor="full_name" className="form-label ">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            name="full_name"
            placeholder="your full name"
            value={formData.full_name}
            onChange={handleTextInputChange}
          />
          <div className="email_error error">{errors.email}</div>
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label ">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleTextInputChange}
          />
          <div className="email_error error">{errors.email}</div>
        </div>
        <div className="mb-2">
          <label htmlFor="phone" className="form-label ">
            Phone Number
          </label>
          <PhoneInput
            defaultCountry="LB"
            international
            withCountryCallingCode
            value={formData.phone_number}
            onChange={handlePhoneNumberChange}
            onBlur={handlePhoneNumberBlur}
          />
          <div className="phone_error error">{errors.email}</div>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="form-label ">
            Password
          </label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control border-end-0"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleTextInputChange}
            />
            <div
              className="p-0 btn border border-start-0 bg-transparent d-flex align-items-center"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <i class="bi bi-eye pe-2"></i>
              ) : (
                <i class="bi bi-eye-slash pe-2"></i>
              )}
            </div>
          </div>

          <div className="password_error error">{errors.password}</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label ">
            Confirm Password
          </label>
          <div className="input-group">
            <input
              type={showPasswordConfirm ? "text" : "password"}
              className="form-control border-end-0"
              name="password_confirmation"
              placeholder="confirm password"
              value={formData.password_confirmation}
              onChange={handleTextInputChange}
            />
            <div
              className="p-0 btn border border-start-0 bg-transparent d-flex align-items-center"
              onClick={togglePasswordVisibilityConfirm}
            >
              {showPasswordConfirm ? (
                <i class="bi bi-eye pe-2"></i>
              ) : (
                <i class="bi bi-eye-slash pe-2"></i>
              )}
            </div>
          </div>
          <div className="password_error error">
            {errors.password_confirmation}
          </div>
        </div>

        <button
          disabled={isLoggingIn}
          type="submit"
          className="btn btn-primary w-100 mb-2"
          onClick={(e) => {
            login(e);
          }}
        >
          Sign Up
        </button>
      </form>
      <div>
        <p className="text-center small">
          Already have an account?{" "}
          <a className="link" href="/login">
            Login now
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
