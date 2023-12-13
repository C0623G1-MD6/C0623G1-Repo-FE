import React, {useEffect, useState} from "react";
import * as overViewService from "../../services/overview/OverviewService"

function Overview() {
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [totalOrder, setTotalOrder] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [topFiveSeller, setTopFiveSeller] = useState([]);
    const [topFiveNewOrder, setFiveNewOrder] = useState([]);

    const [time, setTime] = useState("week");

    const getTotalCustomer = async () => {
        let data = await overViewService.getTotalCustomer(time);
        setTotalCustomer(data);
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
        let data = await overViewService.getTopFiveSeller();
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
        getTopFiveSeller();
        getFiveNewOrder();
    }, [])
    useEffect(() => {
        getTotalCustomer();
        getTotalOrder();
        getTotalRevenue();
    }, [time])
    if (!topFiveNewOrder) {
        return null;
    }
    return (
        <>
            <div>
                <div className="mb-4">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="statistical d-flex justify-content-center">
                                <div className="mt-3 item-one">
                                    <div className="d-flex justify-content-center">
                                        <i className="bi bi-people-fill"></i>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <h4>Lượt khách</h4>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <h2>{totalCustomer}</h2>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <h5>Tăng 20%</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="statistical d-flex justify-content-center">
                                <div className="mt-3 item-two">
                                    <div className="d-flex justify-content-center">
                                        <i className="bi bi-bag-fill"></i>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <h4>Đơn hàng</h4>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <h2>{totalOrder}</h2>
                                    </div>
                                    <div className="d-flex justify-content-center">
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
                                        <h2>{totalRevenue}</h2>
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
                                <p>Top 5 nhân viên bán hàng tốt nhất</p>
                                <div className="mt-4">
                                    <table className="table table-hover truong-table">
                                        <thead>
                                        <tr className="table-secondary">
                                            <th scope="col">STT</th>
                                            <th scope="col">Nhân viên</th>
                                            <th scope="col">Giá</th>
                                            <th scope="col">Số lượng</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {topFiveSeller.map((item, index) => (
                                            <tr>
                                                <td scope="row">{index + 1}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="my-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="top-employee px-3 py-3">
                                <p>Top 5 đơn hàng mới nhất</p>
                                <div className="mt-4">
                                    <table className="table table-hover truong-table">
                                        <thead>
                                        <tr className="table-secondary">
                                            <th scope="col">STT</th>
                                            <th scope="col">Khách hàng</th>
                                            <th scope="col">Ngày mua</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {topFiveNewOrder.map((item, index) => (
                                            <tr>
                                                <td scope="row">{index + 1}</td>

                                            </tr>
                                        ))}


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Overview;