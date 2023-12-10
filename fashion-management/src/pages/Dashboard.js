import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getInfoByIdAccount} from "../redux/middlewares/EmployeeMiddleware";
import DashboardSale from "../components/DashboardSale";
import DashboardWarehouse from "../components/DashboardWarehouse";
import DashboardManager from "../components/DashboardManager";
import AccessDenied from "../components/auth/AccessDenied";


function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
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

    const renderDashboardContent = () => {
        if (!user) {
            return <AccessDenied/>;
        } else if (user.roles.includes("ROLE_MANAGER")) {
            return <DashboardManager employee={employeeInfo}/>;
        } else if (user.roles.includes("ROLE_WAREHOUSE")) {
            return <DashboardWarehouse employee={employeeInfo}/>;
        } else if (user.roles.includes("ROLE_SALES")) {
            return <DashboardSale employee={employeeInfo}/>;
        }
    };

    return <>
        <section id="truong-sidebar">
            <div className="container-fluid">
                <div className="truong-nav position-fixed">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">C0623G1</a>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <form className="d-flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search"
                                           aria-label="Search"/>
                                    <button className="btn btn-outline-success"><i className="bi bi-search"></i>
                                    </button>
                                </form>
                            </div>
                            <div className="me-4">
                                <i className="bi bi-bell"></i>
                            </div>
                        </div>
                    </nav>
                </div>
                {renderDashboardContent()}
            </div>
        </section>
    </>;
}

export default Dashboard;
