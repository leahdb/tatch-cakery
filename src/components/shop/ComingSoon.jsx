import React from "react";
import logoBlack from "../../resources/themes/dashboard-v1/img/logo-dark.svg";

const ComingSoon = () => {
  return (
    <section className="text-center">
      <img src={logoBlack} alt="logoBlack" height={150} />
      <h1 className="comingsoon mt-5">Coming Soon</h1>
    </section>
  );
};

export default ComingSoon;
