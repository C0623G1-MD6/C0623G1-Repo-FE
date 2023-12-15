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
        <div id="truong">
            {renderDashboardContent()}
        </div>
    </>;
}

export default Dashboard;
