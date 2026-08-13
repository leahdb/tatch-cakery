import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LoadingScreen({ className = "d-flex align-items-center justify-content-center" }) {
  return (
    <div className={className} style={{ height: "100vh" }}>
      <DotLottieReact
        src="https://lottie.host/b5f5afc5-d0d1-47ce-b89c-e1bef88e6a76/MPx79OzdoO.lottie"
        loop
        autoplay
        style={{ height: "auto" }}
      />
    </div>
  );
}
