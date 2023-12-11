import React from 'react';
import Sidebar from "./Sidebar";

function DashboardWarehouse() {
    return (
        <div className="row content">
            <div className="col-lg-2">
                <Sidebar/>
            </div>
            <div className="col-lg-10">
                <div className="row my-5">
                    <p>Day la trang quan ly kho hang</p>
                </div>
            </div>
        </div>
    );
}

export default DashboardWarehouse;