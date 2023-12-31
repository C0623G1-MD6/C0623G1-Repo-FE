import Sidebar from "../Sidebar";
import HeaderAdmin from "../overview/HeaderAdmin";
import React from "react";
import ProductList from "./ProductList";
import {NotFound} from "../NotFound";

function ProductListMain() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    if (!user) {
        return <NotFound/>;
    }
    let item;
    switch (user.roles[0]){
        case "ROLE_WAREHOUSE":
            item="item4";
            break
        case "ROLE_MANAGER":
            item="item8";
            break;
        case "ROLE_SALES":
            item="item4";
            break;
    }
    return(
        <>
            <div className="main-container d-flex">
                <Sidebar item={item}/>
                <div className="content">
                    <HeaderAdmin/>
                    <div className="dashboard-content">
                        <div className="py-5 px-5">
                            {/*Đặt component của mọi người ở đây nhé*/}
                            <ProductList/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductListMain;