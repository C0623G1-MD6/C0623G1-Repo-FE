import React, {useEffect} from 'react';
import {Link, NavLink} from "react-router-dom";
import ModalLogout from "./auth/modal/ModalLogout";
import {useDispatch, useSelector} from "react-redux";
import {getInfoByIdAccount} from "../redux/middlewares/EmployeeMiddleware";
import AccessDenied from "./auth/AccessDenied";
import DashboardManager from "./DashboardManager";
import DashboardWarehouse from "./DashboardWarehouse";
import DashboardSale from "./DashboardSale";
import SidebarStoreManage from "./overview/SidebarStoreManage";
import SidebarWarehouseManage from "./overview/SidebarWarehouseManage";
import SidebarSeller from "./overview/SidebarSeller";

function Sidebar(props) {
    const user = JSON.parse(localStorage.getItem('user'));
    const employeeInfo = useSelector((store) => store.employee);
    const dispatch = useDispatch();
    let item=props.item;
    console.log(item);

    useEffect(() => {
        if (user) {
            getInfoEmployee();
        }
    }, []);

    const getInfoEmployee = async () => {
        await dispatch(getInfoByIdAccount(user.id));
    };

    const renderSidebar = () => {
        if (!user) {
            return <AccessDenied/>;
        } else if (user.roles.includes("ROLE_MANAGER")) {
            return <SidebarStoreManage item={item}/>;
        } else if (user.roles.includes("ROLE_WAREHOUSE")) {
            return <SidebarWarehouseManage item={item}/>;
        } else if (user.roles.includes("ROLE_SALES")) {
            return <SidebarSeller item={item}/>;
        }
    };

    return <>
        {renderSidebar()}
    </>;
}

export default Sidebar;