import React from 'react';
import Sidebar from "./Sidebar";


function DashboardManager() {
    return (
        <>
            <div className="row content">
                <div className="col-lg-2">
                    <Sidebar/>
                </div>
                <div className="col-lg-10">
                    <div className="row my-5">
                        <p>Day la trang quan ly cua hang</p>
                        <Overview/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardManager;