import logo from "./logo.svg";
import "./App.css";
import "./components/product/LoanTTV.css";
import HomePage from "./components/home/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/Store";
import DashboardInformation from "./pages/DashboardInformation";

import { NotFound } from "./components/NotFound";
import { Payment } from "./components/payment/Payment";
import { CustomerList } from "./components/customer/CustomerList";
import React from "react";
import Overview from "./components/overview/Overview";
import DashboardManager from "./components/DashboardManager";
import Post from "./components/example/Post";
import ChangePasswordPage from "./components/change-password/ChangePasswordPage";
import CustomerListMain from "./components/customer/CustomerListMain";
import CreateCustomer from "./components/customer/CreateCustomer";
import EditCustomer from "./components/customer/EditCustomer";
import Create from "./components/customer/Create";
import Edit from "./components/customer/Edit";


import SearchProducts from "./components/home/SearchProducts";


import ProductListMain from "./components/product/ProductListMain";
import CreateProductMain from "./components/product/CreateProductMain";
import Home from "./pages/Home";
import {NewsCreate} from "./components/news/NewsCreate";
import {NewsList} from "./components/news/NewsList";
import NewsDetail from "./components/news/NewsDetail";
import PaymentOverview from "./components/payment/PaymentOverview";
import LookUpCustomerOverview from "./components/payment/LookUpCustomerOverview";
import {LookUpCustomer} from "./components/payment/LookUpCustomer";
import SalesReport from "./components/salesreport/SalesReport";
import {WarehouseCreate} from "./components/warehouse/WarehouseCreate";
import DashboardCreateNews from "./components/news/DashboardCreateNews";
import SalesReportMain from "./components/salesreport/SalesReportMain";
import WarehouseCreateMain from "./components/warehouse/WarehouseCreateMain";

function App() {
    return (
        <>

            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage/>}></Route>
                        <Route path="/payment" element={<PaymentOverview/>}></Route>
                        <Route path="/look-up-customer" element={<LookUpCustomerOverview/>}></Route>
                        <Route path="/dashboard" element={<Dashboard/>}></Route>
                        <Route path="/customer/list" element={<CustomerListMain/>}/>

                        {/*Mọi người làm theo dòng phía dưới nhé*/}
                        <Route path="/dashboard/product/list" element={<ProductListMain/>}></Route>
                        <Route path="/product/create" element={<CreateProductMain/>}></Route>
                        <Route path="/dashboard/information" element={<DashboardInformation/>}></Route>
                        <Route path="/dashboard/post" element={<Post/>} ></Route>
                        <Route path="/dashboard/changePassword" element={<ChangePasswordPage/>} ></Route>
                        <Route path="/customer/list" element={<CustomerList/>}/>
                        <Route path="/dashboard/sales" element={<SalesReportMain/>}/>
                        <Route path="/customer/create" element={<Create/>}/>
                        <Route path="/customer/edit/:id" element={<Edit/>}/>
                        <Route path="/warehouse/create" element={<WarehouseCreate/>}/>
                        <Route path="/dashboard/sales" element={<SalesReportMain/>}/>
                        <Route path="/search" element={<SearchProducts />}></Route>
                        <Route path="/news" element={<NewsList/>}></Route>
                        <Route path="/dashboard/news/create" element={<DashboardCreateNews/>}></Route>
                        <Route path="/newsdetail/:id" element={<NewsDetail/>}></Route>
                        <Route path="*" element={<NotFound/>}></Route>
                    </Routes>
                </BrowserRouter>
                <ToastContainer/>
            </Provider>
        </>
    );

}

export default App;
