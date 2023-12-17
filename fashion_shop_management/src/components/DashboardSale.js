import React from 'react';
import HeaderAdmin from "./overview/HeaderAdmin";
import Overview from "./overview/Overview";
import Sidebar from "./Sidebar";

function DashboardSale() {
    return (
        <>
            <div className="main-container d-flex">
                <Sidebar/>
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

export default DashboardSale;