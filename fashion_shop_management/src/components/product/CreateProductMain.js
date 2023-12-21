import Sidebar from "../Sidebar";
import HeaderAdmin from "../overview/HeaderAdmin";
import React from "react";
import CreateProduct from "./CreateProduct";
import AccessDenied from "../auth/AccessDenied";

function CreateProductMain() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        return <AccessDenied/>
    }
    let item="item4";
    return(
        <>
            <div className="main-container d-flex">
                <Sidebar item={item}/>
                <div className="content">
                    <HeaderAdmin/>
                    <div className="dashboard-content">
                        <div className="py-5 px-5">
                            {/*Đặt component của mọi người ở đây nhé*/}
                            <CreateProduct/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default CreateProductMain;