import {NavLink} from "react-router-dom";
import React from "react";
import ModalLogout from "../auth/modal/ModalLogout";

function SidebarWarehouseManage(props) {
    let selectedItem=props.item;
    return (
        <>
            <div className="sidebar" id="side_nav">
                <div className="menu">
                    <div className="d-flex logo-sidebar">
                        <div className="header-box px-2 pt-3 pb-4">
                            <button className="btn d-md-none d-block close-btn px-1 py-0 text-dark mt-2"><i
                                className="bi bi-list"></i>
                            </button>
                        </div>
                        <NavLink to="/" className="logo-img ms-2 mb-4">
                            <img src="/images/logo-1-header.png"/>
                        </NavLink>
                    </div>
                    <hr/>
                    <ul>
                        <li className={`sidebar-item ${selectedItem === 'item1' ? 'active' : ''}`}>
                            <NavLink to="/dashboard">
                                <i className="bi bi-house"></i>
                                <span className="text">Tổng quan</span>
                            </NavLink>
                        </li>
                        <li className={`sidebar-item ${selectedItem === 'item2' ? 'active' : ''}`}>
                            <NavLink to="/dashboard/information">
                                <i className="bi bi-person-circle"></i>
                                <span className="text">Thông tin cá nhân</span>
                            </NavLink>
                        </li>
                        <li className={`sidebar-item ${selectedItem === 'item3' ? 'active' : ''}`}>
                            <NavLink>
                                <i className="bi bi-file-plus"></i>
                                <span className="text">Nhập liệu</span>
                            </NavLink>
                        </li>
                        <li className={`sidebar-item ${selectedItem === 'item4' ? 'active' : ''}`}>
                            <NavLink to="/dashboard/product/list">
                                <i className="bi bi-house"></i>
                                <span className="text">Hàng trong kho</span>
                            </NavLink>
                        </li>
                        <li className={`sidebar-item ${selectedItem === 'item5' ? 'active' : ''}`}>
                            <NavLink to="/dashboard/changePassword">
                                <i className="bi bi-key"></i>
                                <span className="text">Đổi mật khẩu</span>
                            </NavLink>
                        </li>
                        <li className={`sidebar-item ${selectedItem === 'item6' ? 'active' : ''}`}>
                            <NavLink role="button" data-bs-toggle="modal" data-bs-target="#logout">
                                <i className="bi bi-box-arrow-right"></i>
                                <span className="text">Đăng xuất</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <ModalLogout/>
        </>
    )
}

export default SidebarWarehouseManage;