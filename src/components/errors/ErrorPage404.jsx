function ErrorPage404() {
  return (
    <section className={"error-page container-fluid full-screen-height"}>
      <div className="error-page bg-doodles flex-container-center">
        <h3 className={"text-white"}>This page does not exist</h3>
        <a className={"btn btn-secondary"} href={"/"}>
          Back Home
        </a>
      </div>
    </section>
  );
}

export default ErrorPage404;
