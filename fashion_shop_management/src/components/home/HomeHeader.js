import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeHeader = () => {
  const navigate = useNavigate();
  const [seachName, setSeachName] = useState("");
  const handleSearch = (value) => {
    setSeachName(value.target.value);
  };

  const onSearch = () => {
    navigate(`/search?keyword=${seachName}`);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" id="fsnav">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img id="logoimg" src="../../../images/logo-city6-black.png" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item font-custome">
                <a className="nav-link active" aria-current="page" href="#">
                  Trang chủ
                </a>
              </li>
              <li className="nav-item font-custome">
                <a className="nav-link" href="watch_new.html">
                  Tin tức
                </a>
              </li>
              <li className="nav-item dropdown font-custome">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Thời trang
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item font-custome"
                      href="/search?gender=1"
                    >
                      Nữ
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item font-custome"
                      href="/search?gender=0"
                    >
                      Nam
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex mx-5" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Nhập tên sản phẩm"
                aria-label="Search"
                onChange={(value) => handleSearch(value)}
              />
              <button
                onClick={onSearch}
                className="btn btn-outline-dark"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </button>
            </form>
            <a style={{ color: "black" }} href="/ThanhPV_Login.html">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={35}
                height={35}
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HomeHeader;
