import React from 'react';
import Sidebar from "../Sidebar";
import HeaderAdmin from "../overview/HeaderAdmin";
import ChangePassword from "./ChangePassword";
import {NotFound} from "../NotFound";
import AccessDenied from "../auth/AccessDenied";

function ChangePasswordPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return <AccessDenied/>;
    }
    let item;
    switch (user.roles[0]){
        case "ROLE_WAREHOUSE":
            item="item5";
            break
        case "ROLE_MANAGER":
            item="item7";
            break;
        case "ROLE_SALES":
            item="item5";
            break;
    }
    return (
        <>
            <div className="main-container d-flex">
                <Sidebar item={item}/>
                <div className="content">
                    <HeaderAdmin/>
                    <div className="dashboard-content">
                        <div className="py-2 px-5">
                            <ChangePassword/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangePasswordPage;