import React, {useEffect, useState} from 'react';
import InformationUser from "../components/auth/InformationUser";
import ChangePassword from "../components/change-password/ChangePassword";
import {useDispatch, useSelector} from "react-redux";
import {getInfoByIdAccount} from "../redux/middlewares/EmployeeMiddleware";
import HeaderAdmin from "../components/overview/HeaderAdmin";
import SidebarStoreManage from "../components/overview/SidebarStoreManage";
import Sidebar from "../components/Sidebar";
import {NotFound} from "../components/NotFound";
import AccessDenied from "../components/auth/AccessDenied";

function DashboardInformation() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return <AccessDenied/>
    }
    let item="item2";
    return (
        <>
            <div className="main-container d-flex">
                <Sidebar item={item}/>
                <div className="content">
                    <HeaderAdmin/>
                    <div className="dashboard-content px-3 py-3 pt-4">
                        <div className="my-3 mx-3">
                            <InformationUser/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default DashboardInformation;