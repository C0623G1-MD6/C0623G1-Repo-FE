import React from 'react';
import Sidebar from "./Sidebar";
import { WarehouseCreate } from './warehouse/WarehouseCreate';

function DashboardWarehouse() {
    return (
        <div className="row content">
            <div className="col-lg-2">
                <Sidebar/>
            </div>
            <div className="col-lg-10">
                <div className="row my-5">
                    <p>Day la trang quan ly kho hang</p>
                    <WarehouseCreate/>
                </div>
            </div>
        </div>
    );
}

export default DashboardWarehouse;