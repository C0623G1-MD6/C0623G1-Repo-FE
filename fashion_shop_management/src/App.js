import './App.css';
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./components/NotFound";
import {ToastContainer} from "react-toastify";
import {Payment} from "./components/payment/Payment";
import {CustomerList} from "./components/customer/CustomerList";
import React from "react";

function App() {
    return (
        <>
            <Routes>
                <Route path="/sale-staff/payment" element={<Payment/>}/>
                <Route path="/customer/list" element={<CustomerList/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <ToastContainer/>
        </>
    );
}

export default App;
