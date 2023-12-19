import {useEffect, useState} from "react";
import * as paymentService from "../../services/payment/paymentService"
import {Link, NavLink} from "react-router-dom";
import Pagination from "./Pagination";

export function LookUpCustomer() {
    const [customers, setCustomers] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(0);
    const [customer, setCustomer] = useState({});
    // const [totalPages, setTotalPages] = useState()
    // console.log(totalPages)
    const totalPages = 8;
    useEffect(() => {
        getAllCustomer()
    }, [page, keyword]);


    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const getAllCustomer = async () => {
        const res = await paymentService.getAllCustomer(page, keyword);
        setCustomers(res.data.content);
        // setTotalPages(res.data.totalPages)
    }

    const arr = (number) => {
        const pages = []
        for (let i = 0; i < number; i++) {
            pages[i].push(i + 1)
        }
        return pages;
    }

    return (
        <>
            <div className="form-control rounded-0">
                <div className="text-center pt-5">
                    <h2 className="ms-3 fw-bold text-primary">TRA CỨU KHÁCH HÀNG</h2>
                </div>
                <div className="p-3">
                    <div className="d-flex">
                        <input className="form-control form-control-sm rounded-0 border-dark"
                               placeholder="Nhập mã khách hàng, tên khách hàng hoặc số diện thoại"
                               onChange={event => setKeyword(event.target.value)}
                        />
                        <button className="btn btn-outline-dark btn-sm rounded-0 ms-3"><span className="text-center"><i
                            className="bi bi-search ms-3"></i></span></button>
                        <Link role="button" to={`/payment`} state={{cus: customer}}
                              className="btn btn-outline-dark btn-sm rounded-0 ms-3">Chọn</Link>
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
                            <tbody className="table-group-divider">
                            {
                                !customers ?
                                    <tr>
                                        <td colSpan="4" className="text-danger">Không tìm thấy khách hàng</td>
                                    </tr>
                                    :
                                    customers.map((c, index) => (
                                        <tr key={c.id} onClick={() =>
                                            setCustomer(c)
                                        }
                                            className={c.id === customer.id ? "bg-secondary bg-opacity-25" : ''}
                                        >
                                            <td>{index + 1}</td>
                                            <td>{c.customer_code}</td>
                                            <td>{c.name}</td>
                                            <td>{c.phone}</td>
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </table>
                    </div>
                    {/*<div>*/}
                    {/*    <nav aria-label="Page navigation example">*/}
                    {/*        <ul className="pagination pagination-sm justify-content-end">*/}
                    {/*            <li className="page-item">*/}
                    {/*                <a className="page-link rounded-0 border-secondary text-dark" href="#"*/}
                    {/*                   aria-label="Previous">*/}
                    {/*                    <span aria-hidden="true">&laquo;</span>*/}
                    {/*                </a>*/}
                    {/*            </li>*/}
                    {/*            /!*<li className="page-item"><a className="page-link border-secondary text-dark"*!/*/}
                    {/*            /!*                             href="#">1</a></li>*!/*/}
                    {/*            /!*<li className="page-item"><a className="page-link border-secondary text-dark"*!/*/}
                    {/*            /!*                             href="#">2</a></li>*!/*/}
                    {/*            /!*<li className="page-item"><a className="page-link border-secondary text-dark"*!/*/}
                    {/*            /!*                             href="#">3</a></li>*!/*/}

                    {/*            {*/}
                    {/*                */}

                    {/*                // totalPages.map((item, index) => (*/}
                    {/*                //     <li className="page-item"><a*/}
                    {/*                //         className="page-link border-secondary text-dark"*/}
                    {/*                //         href="#">{index + 1}</a></li>*/}
                    {/*                // ))*/}
                    {/*            }*/}
                    {/*            <li className="page-item">*/}
                    {/*                <a className="page-link rounded-0 border-secondary text-dark" href="#"*/}
                    {/*                   aria-label="Next">*/}
                    {/*                    <span aria-hidden="true">&raquo;</span>*/}
                    {/*                </a>*/}
                    {/*            </li>*/}
                    {/*        </ul>*/}
                    {/*    </nav>*/}
                    {/*</div>*/}

                    <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>
        </>
    )
}