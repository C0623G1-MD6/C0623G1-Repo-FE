import {useEffect, useState} from "react";
import * as paymentService from "../../services/payment/paymentService"
import {Link, NavLink} from "react-router-dom";

export function LookUpCustomer() {
    const [customers, setCustomers] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(0);

    useEffect(() => {
        getAllCustomer()
    }, [page, keyword]);

    const getAllCustomer = async () => {
        const res = await paymentService.getAllCustomer(page, keyword);
        setCustomers(res.data.content);
    }

    return (
        <>
            <div className="container border p-0 mt-5">
                <div className="title text-center pt-5">
                    <h2 className="ms-3 fw-bold text-primary">TRA CỨU KHÁCH HÀNG</h2>
                </div>
                <div className="p-5">
                    <div className="d-flex">
                        <input className="form-control form-control-sm rounded-0 border-dark"
                               placeholder="Nhập mã khách hàng, tên khách hàng hoặc số diện thoại"
                               onChange={event => setKeyword(event.target.value)}
                        />
                        <button className="btn btn-outline-dark btn-sm rounded-0 ms-3"><span className="text-center"><i
                            className="bi bi-search ms-3"></i></span></button>
                        <NavLink role="button" to="/sale-staff/payment"
                              className="btn btn-outline-dark btn-sm rounded-0 ms-3">Chọn</NavLink>
                    </div>
                    <div>
                        <table className="table table-hover border mt-4">
                            <thead className="table-secondary">
                            <tr>
                                <th scope="col" className="col-1">STT</th>
                                <th scope="col" className="col-3">Mã khách hàng</th>
                                <th scope="col" className="col-5">Tên khách hàng</th>
                                <th scope="col" className="col-3">Số điện thoại</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                !customers ?
                                    <tr>
                                        <td colSpan="4" className="text-danger">Không tìm thấy khách hàng</td>
                                    </tr>
                                    :
                                    customers.map((customer, index) => (
                                        <tr key={customer.id}>
                                            <td>{index + 1}</td>
                                            <td>{customer.customer_code}</td>
                                            <td>{customer.name}</td>
                                            <td>{customer.phone}</td>
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end">
                                <li className="page-item">
                                    <a className="page-link rounded-0 border-secondary text-dark" href="#"
                                       aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li className="page-item"><a className="page-link border-secondary text-dark"
                                                             href="#">1</a></li>
                                <li className="page-item"><a className="page-link border-secondary text-dark"
                                                             href="#">2</a></li>
                                <li className="page-item"><a className="page-link border-secondary text-dark"
                                                             href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link rounded-0 border-secondary text-dark" href="#"
                                       aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}