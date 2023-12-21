import Sidebar from "../Sidebar";
import HeaderAdmin from "../overview/HeaderAdmin";
import React from "react";
import {LookUpCustomer} from "./LookUpCustomer";
import AccessDenied from "../auth/AccessDenied";

function LookUpCustomerOverview() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return <AccessDenied/>
    }
    switch (user.roles[0]){
        case "ROLE_MANAGER":
            item="item10";
            break;
        case "ROLE_SALES":
            item="item3";
            break;
    }
    let item="item4";
    return(
        <>
            <div className="main-container d-flex">
                <Sidebar item={item}/>
                <div className="content">
                    <HeaderAdmin/>
                    <div className="dashboard-content">
                        <div className="py-5 px-5">
                            {/*Đặt component của mọi người ở đây nhé*/}
                            <LookUpCustomer/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LookUpCustomerOverview;