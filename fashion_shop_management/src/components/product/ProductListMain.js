import Sidebar from "../Sidebar";
import HeaderAdmin from "../overview/HeaderAdmin";
import React from "react";
import ProductList from "./ProductList";

function ProductListMain() {
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
                            <ProductList/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductListMain;