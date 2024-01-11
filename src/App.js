import logoWhite from "./resources/themes/dashboard-v1/img/logo-white.png";
import iconEnvelope from "./resources/themes/dashboard-v1/icons/envelope.svg";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <section className="login-section container-fluid">
      <div className="row full-screen-height">
        <div className="col-md-6 account-left-col flex-container-center full-height">
          <div className="bg-doodles flex-container-center">
            <div className="text-center full-width logo-container">
              <img src={logoWhite} alt="Logo" className="logo" />
            </div>
            <div className="full-width">
              <LoginForm class={"mobile-only p-3 bg-white"} />
            </div>
            <div className="bg-footer flex-container-center">
              <p className="text-white">© Pawpaws 2023</p>
              <a
                className="link-plain text-white email-link"
                href="mailto:help@pawpaws.com"
                target="_blank"
              >
                <img src={iconEnvelope} alt="envelope" />
                <span>help@pawpaws.com</span>
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 desktop-only">
          <div className="full-height flex-container-center flex-column">
            <div className="flex-container-column flex-container-center">
              <LoginForm class={"login-form p-3"} />
              <div>
                <p>
                  Don’t have an account?{" "}
                  <a className="link" href="/admin/register">
                    Sign up now
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
