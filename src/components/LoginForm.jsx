function LoginForm(props) {
  return (
    <form className={props.class} method="POST">
      <h1 className="mb-1 text-center">Welcome Back 👋🏻</h1>
      <p className="form-help">Enter your account details to login</p>
      <div className="mb-3">
        <label htmlFor="email" className="form-label ">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          name="email"
          placeholder="example@email.com"
          value=""
          required
        />
        <div className="email_error error"></div>
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
          required
        />
        <div className="password_error"></div>
      </div>
      <div className="mb-3 text-right">
        <a
          className="link-plain text-grey bold"
          href="{{url('/admin/password-reset')}}"
        >
          Forgot Password ?
        </a>
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
