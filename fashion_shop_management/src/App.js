import './App.css';
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./components/NotFound";
import {ToastContainer} from "react-toastify";
import {Payment} from "./components/payment/Payment";
import {NewsCreate} from "./components/news/NewsCreate";
import {NewsList} from "./components/news/NewsList";
import NewsDetail from "./components/news/NewsDetail";

function App() {
    return (
        <>
            <Routes>
                {/*<Route path="/sale-staff/payment" element={<Payment/>}></Route>*/}
                {/*<Route path="*" element={<NotFound/>}></Route>*/}
                <Route path="/" element={<NewsList/>}></Route>
                <Route path="/create" element={<NewsCreate/>}></Route>
                <Route path="/newsdetail/:id" element={<NewsDetail/>}></Route>
            </Routes>
            <ToastContainer></ToastContainer>
        </>
    );
}

export default App;
