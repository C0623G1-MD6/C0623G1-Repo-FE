import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getInfoByIdAccount} from "../../redux/middlewares/EmployeeMiddleware";
import AccessDenied from "../auth/AccessDenied";
import Sidebar from "../Sidebar";
import HeaderAdmin from "../overview/HeaderAdmin";
import {CreateNotification} from "../notification/CreateNotification";
import DashboardManager from "../DashboardManager";
import {NewsCreate} from "./NewsCreate";

function DashboardCreateNews(props) {
    const user = JSON.parse(localStorage.getItem('user'));
    const employeeInfo = useSelector((store) => store.employee);
    const dispatch = useDispatch();
    let item="item4"

    useEffect(() => {
        if (user) {
            getInfoEmployee();
        }
    }, []);

    const getInfoEmployee = async () => {
        await dispatch(getInfoByIdAccount(user.id));
    };

    const renderPost = () => {
        if (!user) {
            return <AccessDenied/>;
        } else if (user.roles.includes("ROLE_MANAGER")) {
            return (
                <>
                    <div className="main-container d-flex">
                        <Sidebar item={item}/>
                        <div className="content">
                            <HeaderAdmin/>
                            <div className="dashboard-content">
                                <div className="px-5">
                                    {/*Đặt component của mọi người ở đây nhé*/}
                                    <NewsCreate/>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return <DashboardManager/>;
        }
    };
    return <>
        {renderPost()}
    </>;
}

export default DashboardCreateNews;