import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import ModalLogin from "../auth/modal/ModalLogin";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {Field, Form, Formik} from "formik";

const HomeHeader = () => {
    const navigate = useNavigate();
    const initValue = {
        seachName: ""
    }

    const onSearch = (values) => {
        navigate(`/search?keyword=${values.seachName}`);
    };

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary" id="fsnav">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/">
                            <img id="logoimg" src="../../../images/logo-city6-black.png"/>
                        </NavLink>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item font-custome">
                                    <NavLink className="nav-link" aria-current="page" to="/">
                                        Trang chủ
                                    </NavLink>
                                </li>
                                <li className="nav-item font-custome">
                                    <NavLink className="nav-link" to="/news">
                                        Tin tức
                                    </NavLink>
                                </li>
                                <DropdownButton
                                    className="nav-item nav-menu"
                                    id="nav-dropdown"
                                    title="Thời trang"
                                >
                                    <Dropdown.Item href="/search?gender=1">Nữ</Dropdown.Item>
                                    <Dropdown.Item href="/search?gender=0">Nam</Dropdown.Item>
                                </DropdownButton>
                            </ul>
                            <Formik initialValues={initValue} onSubmit={(values) => onSearch(values)}>
                                <Form className="form-search-header d-flex mx-2" role="search">
                                    <Field
                                        className="form-control me-3"
                                        type="search"
                                        name="seachName"
                                        placeholder="Nhập tên sản phẩm"
                                        aria-label="Search"
                                    />
                                    <button
                                        className="btn btn-outline-dark"
                                        type="submit">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={16}
                                            height={16}
                                            fill="currentColor"
                                            className="bi bi-search"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                        </svg>
                                    </button>
                                </Form>
                            </Formik>
                            <ModalLogin/>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default HomeHeader;
