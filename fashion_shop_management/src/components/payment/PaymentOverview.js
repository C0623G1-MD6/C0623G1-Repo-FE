import Sidebar from "../Sidebar";
import HeaderAdmin from "../overview/HeaderAdmin";
import React from "react";
import {Payment} from "./Payment";

function PaymentOverview() {
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
                            <Payment/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PaymentOverview;