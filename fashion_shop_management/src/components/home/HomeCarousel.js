import React from "react";

const HomeCarousel = () => {
  return (
    <>
      {/* carousel active */}
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" style={{ height: "500px" }}>
          <div className="carousel-item active" data-bs-interval={2000}>
            <img
              src="https://im.uniqlo.com/global-cms/spa/resf97d60815697aa2e88402090cc8fa003fr.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval={2000}>
            <img
              src="https://im.uniqlo.com/global-cms/spa/resa608e97e5fc10d5b76a99a95c9394aacfr.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval={2000}>
            <img
              src="https://im.uniqlo.com/global-cms/spa/resdc78021bcd45d47525044f238a870314fr.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default HomeCarousel;
