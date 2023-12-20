import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ModalLogout from "../auth/modal/ModalLogout";

function SidebarSeller(props) {
    let selectedItem=props.item;
    const [show,setShow]=useState(true);
    const handleShow=()=>{
        if(show) {
            setShow(false);
        } else {
            setShow(true);
        }
    }
    const checkScreenSize = () => {
        const screenWidth = window.innerWidth || document.documentElement.clientWidth;
        if (screenWidth > 767) {
            setShow(true);
        } else {
            setShow(false);
        }
    };
    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);
    return(
        <>
            <div className={`sidebar ${show === true ? 'active' : ''}`}  id="side_nav">

                <div className="menu mx-3">
                    <div className="d-flex logo-sidebar">
                        <div className="header-box px-2 pt-3 pb-4">
                        </div>
                        <NavLink to="/"  className="logo-img ms-2 mb-4">
                            <img src="/images/logo-1-header.png"/>
                        </NavLink>
                    </div>
                    <div className="btn-test">
                        <button onClick={handleShow} className="btn text-dark mt-2">
                            <i className="bi bi-list"></i>
                        </button>
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
                            <NavLink href="#">
                                <i className="bi bi-wallet2"></i>
                                <span className="text">Thanh toán</span>
                            </NavLink>
                        </li>
                        <li className={`sidebar-item ${selectedItem === 'item4' ? 'active' : ''}`}>
                            <NavLink to="/dashboard/product/list">
                                <i className="bi bi-house"></i>
                                <span className="text">Hàng trong kho</span>
                            </NavLink>
                        </li>
                        <li  className={`sidebar-item ${selectedItem === 'item5' ? 'active' : ''}`}>
                            <NavLink to="/dashboard/changePassword">
                                <i className="bi bi-key"></i>
                                <span className="text">Đổi mật khẩu</span>
                            </NavLink>
                        </li>
                        <li  className={`sidebar-item ${selectedItem === 'item6' ? 'active' : ''}`}>
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

export default SidebarSeller;