import Sidebar from "../Sidebar";
import HeaderAdmin from "../overview/HeaderAdmin";
import Overview from "../overview/Overview";
import React from "react";
import {CustomerList} from "./CustomerList";
import AccessDenied from "../auth/AccessDenied";

function CustomerListMain() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return <AccessDenied/>
    }
    let item="item6";
    return (
        <>
            <div className="main-container d-flex">
                <Sidebar item={item}/>
                <div className="content">
                    <HeaderAdmin/>
                    <div className="dashboard-content px-3 py-3 pt-4">
                        <div className="my-3 mx-3">
                            <CustomerList/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}
export default CustomerListMain;