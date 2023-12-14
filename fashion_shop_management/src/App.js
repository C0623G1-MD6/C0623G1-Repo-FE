import "./App.css";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import { Payment } from "./components/payment/Payment";
import Home from "./components/home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/sale-staff/payment" element={<Payment />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
