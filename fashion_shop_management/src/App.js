import './App.css';
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./components/NotFound";
import {ToastContainer} from "react-toastify";
import {Payment} from "./components/payment/Payment";
import {LookUpCustomer} from "./components/payment/LookUpCustomer";

function App() {
    return (
        <>
            <Routes>
                <Route path="/sale-staff/payment" element={<Payment/>}></Route>
                <Route path="/sale-staff/look-up-customer" element={<LookUpCustomer/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
            <ToastContainer></ToastContainer>
        </>
    );
}

export default App;
