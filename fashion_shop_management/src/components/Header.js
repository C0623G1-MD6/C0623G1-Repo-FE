import React from 'react';
import ModalLogin from "./auth/modal/ModalLogin";

function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img style={{height: '50px'}} src="data:image/png;base64,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" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Trang chủ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="watch_new.html">Tin tức</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Thời trang
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Nữ</a></li>
                                    <li><a className="dropdown-item" href="#">Nam</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex mx-5" role="search">
                            <input className="form-control me-2  rounded-0 border-dark" type="search" placeholder="Nhập tên sản phẩm" aria-label="Search" />
                            <button className="btn btn-outline-dark rounded-0" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
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
}

export default Header;