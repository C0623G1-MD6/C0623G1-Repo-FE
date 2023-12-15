import React from 'react';
import Sidebar from "./Sidebar";
import { SalesReport } from './salesreport/SalesReport';
import { WarehouseCreate } from './warehouse/WarehouseCreate';

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
                        <SalesReport/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardManager;