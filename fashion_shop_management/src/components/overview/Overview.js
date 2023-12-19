import React, {useEffect, useState} from "react";
import * as overViewService from "../../services/overview/OverviewService"
import {ListNotification} from "../notification/ListNotification";

function Overview() {
    const [totalProductsSold, setTotalProductsSold] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [topFiveSeller, setTopFiveSeller] = useState([]);
    const [topFiveNewOrder, setFiveNewOrder] = useState([]);

    const [time, setTime] = useState("year");

    function convertDateFormat(inputDateString) {
        // Parse the input date string
        var inputDate = new Date(inputDateString);

        // Check if the date is valid
        if (isNaN(inputDate.getTime())) {
            return "Invalid Date";
        }

        // Extract the components of the date
        var day = inputDate.getDate();
        var month = inputDate.getMonth() + 1; // Month is zero-based
        var year = inputDate.getFullYear();

        // Format the components as dd-MM-yyyy
        var formattedDate = padZero(day) + "-" + padZero(month) + "-" + year;

        return formattedDate;
    }

    function padZero(value) {
        return value < 10 ? "0" + value : value;
    }


    const getTotalProductsSold = async () => {
        let data = await overViewService.getTotalProductsSold(time);
        setTotalProductsSold(data);
    }
    const getTotalOrder = async () => {
        let data = await overViewService.getTotalOrder(time);
        setTotalOrder(data);
    }
    const getTotalRevenue = async () => {
        let data = await overViewService.getTotalRevenue(time);
        setTotalRevenue(data);
    }
    const getTopFiveSeller = async () => {
        let data = await overViewService.getTopFiveSeller(time);
        setTopFiveSeller(data);
    }
    const getFiveNewOrder = async () => {
        let data = await overViewService.getFiveNewOrder();
        setFiveNewOrder(data);
    }
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setTime(selectedValue);
    };
    useEffect(() => {

        getFiveNewOrder();
    }, [])
    useEffect(() => {
        getTopFiveSeller();
        getTotalProductsSold();
        getTotalOrder();
        getTotalRevenue();
    }, [time])
    return (
        <>
            <div>
                <div className="mb-4">
                    <div className="row">

                        <div className="col-lg-4">
                            <div className="statistical d-flex justify-content-center">
                                <div className="mt-3 item-two">
                                    <div className="d-flex justify-content-center">
                                        <i className="bi bi-cart-fill"></i>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <h4>Đơn hàng</h4>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <h2>{new Intl.NumberFormat().format(totalOrder)}</h2>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="statistical d-flex justify-content-center">
                                <div className="mt-3 item-one">
                                    <div className="d-flex justify-content-center">
                                        <i className="bi bi-bag-fill"></i>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <h4>Đã bán</h4>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <h2>{new Intl.NumberFormat().format(totalProductsSold)}</h2>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        {/*<h6>Sản phẩm</h6>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="statistical d-flex justify-content-center">
                                <div className="mt-4 mx-3 item-two">
                                    <div className="row item-three">
                                        <div className="col-5">
                                            <h5>Doanh thu</h5>
                                        </div>
                                        <div className="col-7">
                                            <select value={time} onChange={handleSelectChange} className="form-select"
                                                    aria-label="Default select example">
                                                <option value="week">Tuần</option>
                                                <option value="month">Tháng</option>
                                                <option value="year">Năm</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center mt-4">
                                        <h2>{totalRevenue.toLocaleString('vi', {
                                            style: 'currency',
                                            currency: 'VND'
                                        })}</h2>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="top-employee px-3 py-3">
                                <ListNotification/>
                            </div>
                        </div>
                    </div>
                </div>
                {topFiveSeller.length != 0 ? <div className="my-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="top-employee px-3 py-3">
                                <h6>Top 5 nhân viên bán hàng tốt nhất</h6>
                                <div className="mt-4">
                                    <table className="table table-hover truong-table">
                                        <thead>
                                        <tr className="table-secondary">
                                            <th scope="col">STT</th>
                                            <th scope="col">Nhân viên</th>
                                            <th scope="col">Số lượng</th>
                                            <th scope="col">Doanh thu</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {topFiveSeller.map((item, index) => (
                                            <tr key={index}>
                                                <td scope="row">{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td className="table-one">{new Intl.NumberFormat().format(item.quantity)}</td>
                                                <td>{item.revenue.toLocaleString('vi', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div> : <div className="my-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="top-employee px-3 py-3">
                                <h6>Danh sách 5 nhân viên bán hàng có thành tích xuất sắc chưa có</h6>
                            </div>
                        </div>
                    </div>

                </div>}
                {topFiveNewOrder.length != 0 ? <div className="my-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="top-employee px-3 py-3">
                                <h6>Top 5 đơn hàng mới nhất</h6>
                                <div className="mt-4">
                                    <table className="table table-hover truong-table">
                                        <thead>
                                        <tr className="table-secondary">
                                            <th scope="col">STT</th>
                                            <th scope="col">Khách hàng</th>
                                            <th scope="col">Tổng tiền</th>
                                            <th scope="col">Ngày mua</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {topFiveNewOrder.map((item, index) => (
                                            <tr key={index}>
                                                <td scope="row">{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.total.toLocaleString('vi', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}</td>
                                                <td>{convertDateFormat(item.date + "")}</td>
                                            </tr>
                                        ))}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <div className="my-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="top-employee px-3 py-3">
                                <h6>Danh sách 5 đơn hàng mới nhất chưa có</h6>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Overview;