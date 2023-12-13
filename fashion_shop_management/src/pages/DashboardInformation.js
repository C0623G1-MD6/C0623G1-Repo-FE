import React, {useEffect, useState} from 'react';
import InformationUser from "../components/auth/InformationUser";
import ChangePassword from "../components/auth/ChangePassword";
import {useDispatch, useSelector} from "react-redux";
import {getInfoByIdAccount} from "../redux/middlewares/EmployeeMiddleware";
import HeaderAdmin from "../components/overview/HeaderAdmin";
import SidebarStoreManage from "../components/overview/SidebarStoreManage";
import Sidebar from "../components/Sidebar";

function DashboardInformation() {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = [...user.roles]
    const employeeInfo = useSelector((store) => store.employee);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            getInfoEmployee();
        }
    }, []);

    const getInfoEmployee = async () => {
        await dispatch(getInfoByIdAccount(user.id));
    };
    return (
        <>
            <div className="main-container d-flex">
                <Sidebar/>
                <div className="content">
                    <HeaderAdmin/>

                    <div className="dashboard-content px-3 py-3 pt-4">
                        <div className="my-3 mx-3">
                            <InformationUser employee={employeeInfo} role={role}/>
                            <ChangePassword/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default DashboardInformation;