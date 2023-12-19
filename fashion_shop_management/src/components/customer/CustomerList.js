import React, {AllHTMLAttributes as input, useEffect, useState} from "react";
import {getAllCustomerType} from "../../services/customer/typeCustomerService";
import {getAllCustomer} from "../../services/customer/customerService";
import {Link} from "react-router-dom";
import {log10, valueOrDefault} from "chart.js/helpers";
import {DeleteCustomer} from "./DeleteCustomer";
import {string} from "yup";

export function CustomerList() {


    const [customer, setCustomer] = useState([]);
    const [typeCustomer, setTypeCustomer] = useState([]);


    const [nameCustomer, setNameCustomer] = useState("");
    const [typeSearch, setTypeSearch] = useState("");


    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    console.log(customer);

    const [status, setStatus] = useState(false);
    const [selectCustomer, setSelectCustomer] = useState();
    // const checkNameCustomer = (value) => {
    //     const rergex = /^[a-zA-Z0-9 ]*$/;
    //     let check = value.match(rergex);
    //     if (check) {
    //         setNameCustomer(value);
    //     } else if (value === "") {
    //         setNameCustomer("");
    //     // } else {
    //     //     setCustomer([]);
    //     }
    // }

    useEffect(() => {
        displayCustomer()
        displayCustomerType()
    }, [page])

    const displayCustomerType = async () => {
        const res = await getAllCustomerType();
        setTypeCustomer(res);
    }

    const displayCustomer = async () => {
        const res = await getAllCustomer(nameCustomer, typeSearch, page);
        console.log(nameCustomer);
        if (res.status === 204) {
            setCustomer([]);
        } else if (res.status === 200) {
            setTotalPage(res.data.totalPages);
            setCustomer(res.data.content);
        }

    }

    const nextPage = () => {
        if (page + 1 < totalPage) {
            setPage((prev) => prev + 1);
        }
    }

    const prevPage = () => {
        if (page > 0) {
            setPage((prev) => prev - 1);
        }
    }

    const handleModal = (value) => {
        setStatus(true);
        setSelectCustomer(value);
    }

    const closeModal = () => {
        setStatus(false);
        displayCustomer()
    }

    function formatDateTime(dateTime) {
        let formattedDate = new Date(dateTime);
        let year = formattedDate.getFullYear();
        let month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
        let day = formattedDate.getDate().toString().padStart(2, "0");
        return `${day}/${month}/${year} `;
    }


    const formatPhone = (phoneNumber) => {
        const match = phoneNumber.match(/^(\d{4})(\d{3})(\d{3})$/);
        return match[1] + '.' + match[2] + '.' + match[3];
    }


    return (
        customer && (
            <div className="row" style={{width: "100%"}}>
                <div className="col-lg-12">
                    <div className="row pt-5">
                        <div className="col-lg-12">
                            <div className="card mb-4" name="customer-table" style={{borderRadius: "0"}}>
                                <div className="shadow container card-header" name="customer-table">
                                    <div className="title_customer" style={{textAlign: "center"}}>
                                        <h2 className="fw-bold text-primary p-3">Danh Sách Khách Hàng</h2>
                                    </div>
                                    <div className="input-group"
                                         style={{
                                             display: "flex",
                                             justifyContent: "spaceBetween",
                                             alignItems: "center"
                                         }}>
                                        <div className="col-8" style={{alignItems: "center", gap: "42%", width: "70%"}}>
                                            <div>
                                                <Link role="button" to="/customer/create"
                                                      className="btn btn-outline-primary btn-sm rounded-0">Thêm
                                                    Mới</Link>
                                            </div>
                                        </div>
                                        <div style={{display: "flex", gap: "0.5rem"}}>
                                            <div className="button-search me-1">
                                                <select className="form-control-sm rounded-0" name="typeSearch"
                                                        id="typeSearch"
                                                        onChange={event => setTypeSearch(event.target.value)}>
                                                    <option value="">Chọn Bậc</option>
                                                    {
                                                        typeCustomer.map(type => (
                                                            <option key={type.id}
                                                                    value={type.names}>{type.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="input-search me-1">
                                                <input type="text" className="form-control-sm rounded-0"
                                                       name="table-search"
                                                       id="table-search"
                                                       onChange={(event) => setNameCustomer(event.target.value)}
                                                       placeholder="Nhập tên" pattern="[a-z0-9A-Z]+"
                                                       title="Không Được Nhập Các Kí Tự Đặc Biệt"/>
                                            </div>
                                            <div className="search-button">
                                                <button className="form-control btn btn-outline-dark btn-sm rounded-0"
                                                        onClick={() => displayCustomer()}>
                                                    <i className="bi bi-search"/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <table className="table table-hover text-center border mt-3"
                                           style={{height: "300px"}}>
                                        <thead className="table-secondary">
                                        <tr>
                                            <th style={{width: "3%", height: "5%"}}>STT</th>
                                            <th style={{width: "8%"}}>Mã</th>
                                            <th style={{width: "20%"}}>Họ & Tên</th>
                                            <th style={{width: "10%"}}>Ngày Sinh</th>
                                            <th style={{width: "8%"}}>Giới Tính</th>
                                            <th style={{width: "10%"}}>Điện Thoại</th>
                                            <th style={{width: "16%"}}>Email</th>
                                            <th style={{width: "6%"}}>Điểm</th>
                                            <th style={{width: "9%"}}>Bậc</th>
                                            {/*<th style={{width: "17%"}}>Địa Chỉ</th>*/}
                                            <th style={{width: "10%"}}>Tính Năng</th>
                                        </tr>
                                        </thead>
                                        {
                                            customer && customer.length !== 0 ?
                                                <tbody className="table-group-divider">
                                                {
                                                    customer.map((cus, index) => (
                                                        <tr key={cus.id}>
                                                            <td>{page * 5 + index + 1}</td>
                                                            <td>{cus.customerCode}</td>
                                                            <td>{cus.name}</td>
                                                            <td>{formatDateTime(cus.birthday)}</td>
                                                            <td>{cus.gender ? 'Nữ' : 'Nam'}</td>
                                                            <td>{formatPhone(cus.phone)}</td>
                                                            <td>{cus.email}</td>
                                                            <td>{cus.point}</td>
                                                            <td>
                                                            <span
                                                                className="badge rounded-pill text-bg-secondary">{cus.customerType.name}</span>
                                                            </td>
                                                            {/*<td>{cus.address}</td>*/}
                                                            <td className="p-1">
                                                                <Link role="button"
                                                                      to={`/customer/edit/${cus.id}`}
                                                                      className="btn btn-outline-secondary btn-sm rounded-0 me-2">Sửa</Link>
                                                                <button
                                                                    className="btn btn-outline-danger btn-sm rounded-0"
                                                                    onClick={() => handleModal(cus)}>Xóa
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                </tbody>
                                                : <tr>
                                                    <td colSpan="8">
                                                        <p id="trivn-p-a">
                                                            Không Có Dữ Liệu. Vui Lòng Nhập Lại !!!
                                                        </p>
                                                    </td>
                                                </tr>
                                        }
                                    </table>
                                    {/*<nav aria-label="Page navigation example" className="">*/}
                                    <ul className="pagination justify-content-end ">
                                        {totalPage > 1 && (
                                            <li className="page-item d-flex">
                                                <button className="page-link" type="button" disabled={page === 0}
                                                        onClick={() => prevPage()}>&laquo;</button>
                                                <li className="page-item"><a
                                                    className="page-link">{page + 1}/{totalPage}</a></li>
                                                <button className="page-link text-dark" type="button"
                                                        disabled={page === totalPage}
                                                        onClick={() => nextPage()}>&raquo;</button>
                                            </li>
                                        )}
                                    </ul>
                                    {/*</nav>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DeleteCustomer
                    show={status}
                    selected={selectCustomer}
                    close={closeModal}
                />
            </div>
        )
    )
}

//<div className="row" style={{alignItems: "center"}}>
//                                                 <div className="col-md-6">
//                                                     <button className="btn btn-outline-primary" style={{marginLeft: "15rem"}} onClick={() => prevPage()}>
//                                                         <i className="fa-solid fa-forward fa-rotate-180"
//                                                            style={{color: "#b966e5"}}/>
//                                                     </button>
//                                                     <span className="btn btn-outline-primary">
//                                                 {page + 1}/{totalPage}
//                                             </span>
//                                                     <button className="btn btn-outline-primary"
//                                                             onClick={() => nextPage()}>
//                                                 <span> <i className="fa-solid fa-forward"
//                                                           style={{color: "#b966e5"}}/>
//                                                 </span>
//                                                     </button>
//                                                 </div>
//                                             </div>