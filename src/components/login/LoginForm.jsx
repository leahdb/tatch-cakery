import { useState } from "react";
import { authenticate } from "../../services/auth";
import { Navigate } from "react-router-dom";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [generalErrorMessage, setGeneralErrorMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccessful, setloginSuccessful] = useState(false);
  const [userRole, setUserRole] = useState("");

  let login = (e) => {
    e.preventDefault();
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    setGeneralErrorMessage("");
    setIsLoggingIn(true);

    authenticate(email, password).then((response) => {
      setIsLoggingIn(false);

      if (response.status === "error") {
        if (response.type === "validation") {
          setEmailErrorMessage(
            response.data.user.email !== undefined ? response.data.user.email : ""
          );
          setPasswordErrorMessage(
            response.data.user.password !== undefined ? response.data.user.password : ""
          );
        }

        if (response.type === "general") {
          setGeneralErrorMessage(response.message);
        }
      } else {
        setloginSuccessful(true);
        setUserRole(response.data.role[0])
      }
    });
  };

  if (loginSuccessful) {
    //return <Navigate to={"/"} />;
    return <Navigate to={userRole === "super-admin" ? "/admin" : "/"} />
  }

  return (
    <form className={props.class} method="POST">
      <h1 className="mb-1 text-center">Welcome Back</h1>
      <p className="form-help">Enter your account details to login</p>
      <div className="general_error error">{generalErrorMessage}</div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label ">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          name="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <div className="email_error error">{emailErrorMessage}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label ">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
        <div className="password_error error">{passwordErrorMessage}</div>
      </div>
      <div className="mb-3 text-right">
        <a
          className="link-plain text-grey bold"
          href="{{url('/admin/password-reset')}}"
        >
          Forgot Password ?
        </a>
      </div>

      <button
        disabled={isLoggingIn}
        type="submit"
        className="btn btn-primary w-100"
        onClick={(e) => {
          login(e);
        }}
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
