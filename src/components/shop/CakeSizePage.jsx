import { Link } from "react-router-dom";
import './style.css'; 

const CakeSizePage = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5" style={{ color: "#604f3f" }}>Pick your size:</h2>
      <div className="row justify-content-center">
        {/* 1 Person */}
        <div className="col-md-4 col-12 mb-4 d-flex justify-content-center">
          <Link to="/customize/sponge/1" className="text-decoration-none">
            <div className="cake-card">
              <div className="image-container mb-3">
                <img
                  src="./images/1prs-rectangle.webp" 
                  alt="1 Person"
                  className="img-fluid"
                />
              </div>
              <h4 className="cake-title">1 Person</h4>
              <button className="btn w-100 cake-btn">Choose</button>
            </div>
          </Link>
        </div>

        {/* 2-3 People */}
        <div className="col-md-4 col-12 mb-4 d-flex justify-content-center">
          <Link to="/customize/sponge/2-3" className="text-decoration-none">
            <div className="cake-card">
              <div className="image-container mb-3">
                <img
                  src="./images/1prs-rectangle.webp" 
                  alt="2-3 People"
                  className="img-fluid"
                />
              </div>
              <h4 className="cake-title">2-3 People</h4>
              <button className="btn w-100 cake-btn">Choose</button>
            </div>
          </Link>
        </div>

        {/* 6-8 People */}
        <div className="col-md-4 col-12 mb-4 d-flex justify-content-center">
          <Link to="/customize/sponge/6-8" className="text-decoration-none">
            <div className="cake-card">
              <div className="image-container mb-3">
                <img
                  src="/images/1prs-rectangle.webp"
                  alt="6-8 People"
                  className="img-fluid"
                />
              </div>
              <h4 className="cake-title">6-8 People</h4>
              <button className="btn w-100 cake-btn">Choose</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CakeSizePage;
