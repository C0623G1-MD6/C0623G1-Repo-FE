import React, {useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar";
import InformationUser from "../components/auth/InformationUser";
import ChangePassword from "../components/auth/ChangePassword";
import {useDispatch, useSelector} from "react-redux";
import {getInfoByIdAccount} from "../redux/middlewares/EmployeeMiddleware";

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
            <section id="truong-sidebar">
                <div className="container-fluid">
                    <div className="row content">
                        <div className="col-lg-2">
                            <Sidebar/>
                        </div>
                        <div className="col-lg-10">
                            <InformationUser employee={employeeInfo} role={role}/>
                            <ChangePassword/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default DashboardInformation;