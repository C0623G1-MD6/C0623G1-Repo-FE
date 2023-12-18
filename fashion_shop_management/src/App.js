import logo from './logo.svg';
import './App.css';
import Home from "./pages/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Provider} from "react-redux";
import store from "./redux/Store";
import DashboardInformation from "./pages/DashboardInformation";
import {NotFound} from "./components/NotFound";
import {Payment} from "./components/payment/Payment";
import {CustomerList} from "./components/customer/CustomerList";
import React from "react";
import Overview from "./components/overview/Overview";
import DashboardManager from "./components/DashboardManager";
import Post from "./components/example/Post";
import ChangePasswordPage from "./components/change-password/ChangePasswordPage";
import CustomerListMain from "./components/customer/CustomerListMain";

function App() {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/sale-staff/payment" element={<Payment/>}></Route>
                        <Route path="/dashboard" element={<Dashboard/>}></Route>
                        <Route path="/customer/list" element={<CustomerListMain/>}/>

                        {/*Mọi người làm theo dòng phía dưới nhé*/}
                        <Route path="/dashboard/information" element={<DashboardInformation/>}></Route>
                        <Route path="/dashboard/post" element={<Post/>}></Route>
                        <Route path="/dashboard/changePassword" element={<ChangePasswordPage/>}></Route>
                        <Route path="*" element={<NotFound/>}></Route>
                    </Routes>
                </BrowserRouter>
                <ToastContainer/>
            </Provider>
        </>
    );
}

export default App;
