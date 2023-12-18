import React from 'react';
import Sidebar from "../Sidebar";
import HeaderAdmin from "../overview/HeaderAdmin";
import ChangePassword from "./ChangePassword";
import {NotFound} from "../NotFound";

function ChangePasswordPage() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return <NotFound/>;
    }
    let item="item7"
    return (
        <>
            <div className="main-container d-flex">
                <Sidebar item={item}/>
                <div className="content">
                    <HeaderAdmin/>
                    <div className="dashboard-content">
                        <div className="py-5 px-5">
                            <ChangePassword/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangePasswordPage;