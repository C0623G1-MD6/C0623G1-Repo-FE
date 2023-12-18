import React from 'react';
import {Link, NavLink} from "react-router-dom";
import ModalLogout from "./auth/modal/ModalLogout";

function Sidebar() {
    return (
        <>
            <div className="content-one">
                <div className="sidebar active">
                    <div className="head">
                        <Link to="/dashboard">
                            <div className="user-img">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                    alt=""/>
                            </div>
                            <div className="user-detail">
                                <div className="title">Quản lý kho hàng</div>
                                <div className="name">Nguyễn Văn A</div>
                            </div>
                        </Link>
                    </div>
                    <div className="nav">
                        <div className="menu">
                            <p className="title"></p>
                            <ul>
                                <li>
                                    <NavLink to="/dashboard/information">
                                        <i className="bi bi-person-circle"></i>
                                        <span className="text">Thông tin cá nhân</span>
                                        <i className="arrow ph-bold ph-caret-down"></i>
                                    </NavLink>
                                    <ul className="sub-menu">
                                        <li>
                                            <NavLink to="/dashboard/information">
                                                <span className="text">Xem thông tin</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="bi bi-menu-app"></i>
                                        <span className="text">Chức năng</span>
                                        <i className="arrow ph-bold ph-caret-down"></i>
                                    </a>
                                    <ul className="sub-menu">
                                        <li>
                                            <a href="#">
                                                <i className="bi bi-search"></i>
                                                <span className="text">Tra cứu thông tin</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="../nhatnk/payment.html">
                                                <i className="bi bi-file-earmark-plus"></i>
                                                <span className="text">Lập phiếu thanh toán</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="../lamtv/thong_ke/employee-stock-statistics.html">
                                                <i className="bi bi-calculator"></i>
                                                <span className="text">Lập thống kê</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="../trivn/TriVN_detail_notification.html">
                                                <i className="bi bi-bell"></i>
                                                <span className="text">Xem thông báo</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="bi bi-person-circle"></i>
                                        <span className="text">Hướng dẫn</span>
                                    </a>
                                </li>
                                <li>
                                    <a role="button" data-bs-toggle="modal" data-bs-target="#logout">
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span className="text">Đăng xuất</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ModalLogout/>
        </>
    );
}

export default Sidebar;