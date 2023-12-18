import {NavLink} from "react-router-dom";
import React, {useState} from "react";
import ModalLogout from "../auth/modal/ModalLogout";

function SidebarStoreManage(props){
    let selectedItem=props.item;
    return(
        <>
            <div className="sidebar" id="side_nav">
                <div className="menu mx-3">
                    <div className="d-flex logo-sidebar">
                        <div className="header-box px-2 pt-3 pb-4">
                            <button className="btn d-md-none d-block close-btn px-1 py-0 text-dark mt-2"><i
                                className="bi bi-list"></i>
                            </button>
                        </div>
                        <NavLink to="/"  className="logo-img ms-2 mb-4">
                            <img src="/images/logo-1-header.png"/>
                        </NavLink>
                    </div>
                    <hr/>
                    <ul>
                        <li className={`sidebar-item ${selectedItem === 'item1' ? 'active' : ''}`}>
                            <NavLink  to="/dashboard">
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
                            <NavLink to="/dashboard/post">
                                <i className="bi bi-file-plus"></i>
                                <span className="text">Đăng thông báo</span>
                            </NavLink>
                        </li>
                        <li className={`sidebar-item ${selectedItem === 'item4' ? 'active' : ''}`}>
                            <NavLink to="/dashboard/news/create">
                                <i className="bi bi-newspaper"></i>
                                <span className="text">Đăng tin tức</span>
                            </NavLink>
                        </li>
                        <li  className={`sidebar-item ${selectedItem === 'item5' ? 'active' : ''}`}>
                            <NavLink to="">
                                <i className="bi bi-file-earmark"></i>
                                <span className="text">Xem thống kê</span>
                            </NavLink>
                        </li>
                        <li className={`sidebar-item ${selectedItem === 'item6' ? 'active' : ''}`}>
                            <NavLink to="/customer/list">
                                <i className="bi bi-people"></i>
                                <span className="text">Quản lí khách hàng</span>
                            </NavLink>
                        </li>
                        <li className={`sidebar-item ${selectedItem === 'item8' ? 'active' : ''}`}>
                            <NavLink href="#">
                                <i className="bi bi-house"></i>
                                <span className="text">Hàng trong kho</span>
                            </NavLink>
                        </li>
                        <li className={`sidebar-item ${selectedItem === 'item7' ? 'active' : ''}`}>
                            <NavLink to="/dashboard/changePassword">
                                <i className="bi bi-key"></i>
                                <span className="text">Đổi mật khẩu</span>
                            </NavLink>
                        </li>
                        <li className={`sidebar-item ${selectedItem === 'item9' ? 'active' : ''}`}>
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
export default SidebarStoreManage;