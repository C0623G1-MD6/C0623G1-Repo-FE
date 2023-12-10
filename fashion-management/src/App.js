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

function App() {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}></Route>
                        <Route path="/dashboard" element={<Dashboard/>}></Route>
                        <Route path="/dashboard/information" element={<DashboardInformation/>}></Route>
                    </Routes>
                </BrowserRouter>
                <ToastContainer/>
            </Provider>
        </>
    );
}

export default App;
