import ModalLogin from "../auth/modal/ModalLogin";
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
          <a className="navbar-brand" href="/home">
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
                <a className="nav-link active" aria-current="page" href="/home">
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

            <form className="d-flex mx-3" role="search">
              <input
                className="form-control me-2 rounded-0"
                type="search"
                placeholder="Nhập tên sản phẩm"
                aria-label="Search"
                onChange={(value) => handleSearch(value)}
              />
              <button
                onClick={onSearch}
                className="btn btn-outline-dark rounded-0"
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
            <ModalLogin/>
          </div>
        </div>
      </nav>
    </>
  );
};

export default HomeHeader;
