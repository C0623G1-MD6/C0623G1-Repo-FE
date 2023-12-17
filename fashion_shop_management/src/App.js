
import logo from './logo.svg';
import './App.css';
import './components/product/LoanTTV.css'
import HomePage from "./components/home/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/Store";
import DashboardInformation from "./pages/DashboardInformation";

import {NotFound} from "./components/NotFound";
import {Payment} from "./components/payment/Payment";
import {CustomerList} from "./components/customer/CustomerList";
import React from "react";
import {LookUpCustomer} from "./components/payment/LookUpCustomer";

import Overview from "./components/overview/Overview";
import DashboardManager from "./components/DashboardManager";
import Post from "./components/example/Post";
import ChangePasswordPage from "./components/change-password/ChangePasswordPage";
import CreateCustomer from "./components/customer/CreateCustomer";
import EditCustomer from "./components/customer/EditCustomer";
import Create from "./components/customer/Create";
import Edit from "./components/customer/Edit";


import SearchProducts from "./components/home/SearchProducts";


import ProductListMain from "./components/product/ProductListMain";
import CreateProductMain from "./components/product/CreateProductMain";
import {NewsCreate} from "./components/news/NewsCreate";
import {NewsList} from "./components/news/NewsList";

function App() {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<HomePage/>}></Route>
                        <Route path="/sale-staff/payment" element={<Payment/>}></Route>
                        <Route path="/sale-staff/look-up-customer" element={<LookUpCustomer/>}></Route>
                        <Route path="/dashboard" element={<Dashboard/>}></Route>
                        {/*Mọi người làm theo dòng phía dưới nhé*/}
                        <Route path="/dashboard/product/list" element={<ProductListMain/>}></Route>
                        <Route path="/product/create" element={<CreateProductMain/>}></Route>
                        <Route path="/dashboard/information" element={<DashboardInformation/>}></Route>
                        <Route path="/dashboard/post" element={<Post/>} ></Route>
                        <Route path="/dashboard/changePassword" element={<ChangePasswordPage/>} ></Route>
                        <Route path="/customer/list" element={<CustomerList/>}/>
                        <Route path="/search" element={<SearchProducts />}></Route>
                        <Route path="/news" element={<NewsList/>}></Route>
                        <Route path="*" element={<NotFound/>}></Route>
                        <Route path="/customer/create" element={<CreateCustomer/>}></Route>
                        <Route path="/customer/edit/:id" element={<EditCustomer/>}></Route>
                        <Route path="/customer/list" element={<CustomerList/>}></Route>
                    </Routes>
                </BrowserRouter>
                <ToastContainer/>
            </Provider>
        </>
    );
}

export default App;
