import Sidebar from "../Sidebar";
import HeaderAdmin from "../overview/HeaderAdmin";
import React from "react";
import {LookUpCustomer} from "./LookUpCustomer";

function LookUpCustomerOverview() {
    let item="item3";
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