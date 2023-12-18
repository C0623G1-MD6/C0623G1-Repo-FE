import React from 'react';
import Sidebar from "./Sidebar";
import Overview from "./overview/Overview";
import HeaderAdmin from "./overview/HeaderAdmin";

function DashboardManager() {
    let item="item1";
    return (
        <>
            <div className="main-container d-flex">
                <Sidebar item={item}/>
                <div className="content">
                    <HeaderAdmin/>
                    <div className="dashboard-content px-3 py-3 pt-4">
                        <div className="my-3 mx-3">
                            <Overview/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardManager;