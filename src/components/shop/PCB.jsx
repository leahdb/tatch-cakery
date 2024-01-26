import React from "react";
import ShopIntro from "./ShopIntro";
import NewestProducts from "./NewestProducts";
import ChooseUs from "./ChooseUs";
import BlogsPreview from "./BlogsPreview";

const PCB = () => {
  return (
    <div className="container">
      <div className="row gx-3">
        <main className="col-lg-9">
          <div className="card-banner p-5 bg-primary rounded-3">
            <div>
              <h2 className="text-light">
                All your electronics needs <br />
                in one place
              </h2>
              <p className="text-light">
                No matter how far along you are in your sophistication as an
                amateur astronomer, there is always one.
              </p>
              <a href="#" className="btn btn-light shadow-0 text-primary">
                {" "}
                View more{" "}
              </a>
            </div>
          </div>
        </main>
        <aside className="col-lg-3">
          <div className="card-banner pcb-bg h-100 rounded-3">            
            <div className="card-body text-center pb-5">
              <h3 className="pt-5 text-light fw-bold">PCB Builder</h3>
              <p className="text-light px-4 pt-2">
                No matter how far along you are in your sophistication
              </p>
              <a href="/pcb-builder" className="btn btn-outline-light">
                Instant Quote
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PCB;
