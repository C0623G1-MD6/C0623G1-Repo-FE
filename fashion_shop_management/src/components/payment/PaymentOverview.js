import Sidebar from "../Sidebar";
import HeaderAdmin from "../overview/HeaderAdmin";
import React, {useEffect} from "react";
import {Payment} from "./Payment";
import AccessDenied from "../auth/AccessDenied";

function PaymentOverview() {
    const user = JSON.parse(localStorage.getItem('user'));
    let item;
    if (!user) {
        return <AccessDenied/>
    } else {
        switch (user.roles[0]){
            case "ROLE_MANAGER":
                item="item10";
                break;
            case "ROLE_SALES":
                item="item3";
                break;
        }
    }

    return(
        <>
            <div className="main-container d-flex">
                <Sidebar item={item}/>
                <div className="content">
                    <HeaderAdmin/>
                    <div className="dashboard-content">
                        <div className="py-5 px-5">
                            {/*Đặt component của mọi người ở đây nhé*/}
                            <Payment/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PaymentOverview;