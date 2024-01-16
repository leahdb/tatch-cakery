import React, { useState, useEffect } from "react";
import PcbBanner from "../../resources/themes/dashboard-v1/img/pcb-builder-banner.jpg";

const ShopIntro = () => {
  return (
    <section class="pt-3">
      <div class="container">
        <div class="row gx-3">
          <main class="col-lg-9">
            <div class="card-banner p-5 bg-primary rounded-3">
              <div>
                <h2 class="text-light">
                  All your electronics needs <br />
                  in one place
                </h2>
                <p class="text-light">
                  No matter how far along you are in your sophistication as an
                  amateur astronomer, there is always one.
                </p>
                <a href="#" class="btn btn-light shadow-0 text-primary">
                  {" "}
                  View more{" "}
                </a>
              </div>
            </div>
          </main>
          <aside class="col-lg-3">
            <div class="card-banner position-relative pcb-bg h-100 rounded-3">
              <div class="pcb-overlay overlay rounded-3"></div>
              <div class="card-body text-center pb-5">
                <h3 class="pt-5 text-light fw-bold">PCB Builder</h3>
                <p class="text-light px-4 pt-2">
                  No matter how far along you are in your sophistication
                </p>
                <a href="/test" class="btn btn-outline-light">
                  Instant Quote
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ShopIntro;
