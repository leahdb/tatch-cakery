import logoWhite from "../../resources/themes/dashboard-v1/img/logo-light.svg";
import iconEnvelope from "../../resources/themes/dashboard-v1/icons/envelope.svg";
import LoginForm from "./LoginForm";

function LoginPage() {
  return (
    <section className="login-section container-fluid">
      <div className="row full-screen-height">
        <div className="col-md-6 account-left-col flex-container-center full-height">
          <div className="bg-doodles flex-container-center">
            <div className="text-center full-width logo-container">
              <img src={logoWhite} alt="Logo" className="logo" />
            </div>
            <div className="full-width mobile-only-auth">
              <LoginForm class={"p-3 bg-white"} />
            </div>
          </div>
        </div>
        <div className="col-md-6 desktop-only full-screen-height overflow-scroll">
          <div className="text-left py-3 px-2">
            <a href="/" className="text-primary fw-bold">
              <i className="bi bi-arrow-left-circle-fill text-primary pe-1"></i> Go
              Back
            </a>
          </div>
          <div className="full-height flex-container-center flex-column">
            <div className="flex-container-column flex-container-center h-100 full-width">
              <LoginForm className={"login-form p-3"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
