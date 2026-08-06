import React from "react";
import loadingVideo from "../../resources/themes/dashboard-v1/img/loading.mp4";

export default function LoadingScreen({ className = "d-flex align-items-center justify-content-center" }) {
  return (
    <div className={className} style={{ height: "100vh" }}>
      <video
        src={loadingVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{ height: "auto", maxWidth: "260px" }}
      />
    </div>
  );
}
