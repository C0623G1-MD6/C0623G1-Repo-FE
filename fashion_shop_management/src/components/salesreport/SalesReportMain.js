import Sidebar from "../Sidebar";
import HeaderAdmin from "../overview/HeaderAdmin";
import React, {useEffect} from "react";
import SalesReport from "./SalesReport";
import {useDispatch, useSelector} from "react-redux";
import {getInfoByIdAccount} from "../../redux/middlewares/EmployeeMiddleware";
import AccessDenied from "../auth/AccessDenied";
import {NewsCreate} from "../news/NewsCreate";
import DashboardManager from "../DashboardManager";

function SalesReportMain() {
    const user = JSON.parse(localStorage.getItem('user'));
    const employeeInfo = useSelector((store) => store.employee);
    const dispatch = useDispatch();
    let item = "item5"

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
                                    <SalesReport/>
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
    return (<>
            {renderPost()}
        </>
    )
}

export default SalesReportMain;