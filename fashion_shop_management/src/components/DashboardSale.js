import React from 'react';
import Sidebar from "./Sidebar";
import InformationUser from "./auth/InformationUser";
import ChangePassword from "./auth/ChangePassword";

function DashboardSale({employee}) {
    return (
        <>
            <div className="row content">
                <div className="col-lg-2">
                    <Sidebar/>
                </div>
                <div className="col-lg-10">
                    <div className="row my-5">
                        <p>Day la trang nhanh vien ban hang</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardSale;