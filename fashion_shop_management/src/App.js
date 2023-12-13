import './App.css';
import './components/product/LoanTTV.css'
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./components/NotFound";
import {ToastContainer} from "react-toastify";
import {Payment} from "./components/payment/Payment";
import ProductList from "./components/product/ProductList";
import CreateProduct from "./components/product/CreateProduct";

function App() {
    return (
        <>
            <Routes>
                <Route path="/sale-staff/payment" element={<Payment/>}></Route>
                <Route path="product/list" element={<ProductList/>}></Route>
                <Route path="product/create" element={<CreateProduct/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
            <ToastContainer></ToastContainer>
        </>
    );
}

export default App;
