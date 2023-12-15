import React, {useEffect, useState} from "react";
import {getAllCustomerType} from "../../services/customer/typeCustomerService";
import {getAllCustomer} from "../../services/customer/customerService";
import {Link} from "react-router-dom";

export function CustomerList() {


    const [customer, setCustomer] = useState([]);
    const [typeCustomer, setTypeCustomer] = useState([]);


    const [nameCustomer, setNameCustomer] = useState("");
    const [typeSearch, setTypeSearch] = useState("");


    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    console.log(customer);

    useEffect(() => {
        displayCustomer()
        displayCustomerType()
    }, [nameCustomer, typeSearch, page])

    const displayCustomerType = async () => {
        const res = await getAllCustomerType();
        setTypeCustomer(res);
    }

    const displayCustomer = async () => {
        const res = await getAllCustomer(nameCustomer, typeSearch, page);
        console.log(res)
        setTotalPage(res.data.totalPages);
        setCustomer(res.data.content);

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

    return (
        <>
            <div className="col-lg-10">
                <div className="row pt-5">
                    <div className="col-lg-12">
                        <div className="card mb-4" name="customer-table">
                            <div className="shadow container card-header" name="customer-table">
                                <div className="title_customer" style={{textAlign: "center"}}>
                                    <h2 className="fw-bold text-primary p-3">Danh Sách Khách Hàng</h2>
                                </div>
                                <div className="input-group"
                                     style={{display: "flex", justifyContent: "spaceBetween", alignItems: "center"}}>
                                    <div className="col-8" style={{alignItems: "center", gap: "42%", width: "70%"}}>
                                        <div>
                                            <Link role="button" to="../thienlch/prototypeCreate.html"
                                                  className="btn btn-outline-primary btn-sm rounded-0">Thêm Mới</Link>
                                        </div>
                                    </div>
                                    <div style={{display: "flex", gap: "0.5rem"}}>
                                        <div className="button-search me-1">
                                            <select className="form-control-sm rounded-0" name="typeSearch" id="typeSearch">
                                                <option value="">Chọn</option>
                                                {
                                                    typeCustomer.map(type => (
                                                        <option key={type.id} value={type.id}>{type.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="input-search me-1">
                                            <input type="text" className="form-control-sm rounded-0" name="table-search"
                                                   placeholder="Tìm Kiếm"/>
                                        </div>
                                        <div className="search-button">
                                            <button className="form-control btn btn-outline-dark btn-sm rounded-0">
                                                <i className="bi bi-search"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <table className="table table-hover border mt-3">
                                    <thead className="table-secondary">
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Mã Khách Hàng</th>
                                        <th scope="col">Tên Khách Hàng</th>
                                        <th scope="col">Ngày Sinh</th>
                                        <th scope="col">Giới Tính</th>
                                        <th scope="col">Điện Thoại</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Điểm</th>
                                        <th scope="col">Bậc</th>
                                        <th scope="col">Địa Chỉ</th>
                                        <th>Tính Năng</th>
                                    </tr>
                                    </thead>
                                    {
                                        customer && customer.length !== 0 ?
                                            <tbody className="table-group-divider">
                                            {
                                                customer.map((cus, index) => (
                                                    <tr key={cus.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{cus.customerCode}</td>
                                                        <td>{cus.name}</td>
                                                        <td>{cus.birthday}</td>
                                                        <td>{cus.gender}</td>
                                                        <td>{cus.phone}</td>
                                                        <td>{cus.email}</td>
                                                        <td>{cus.point}</td>
                                                        <td>
                                                            <span
                                                                className="badge rounded-pill text-bg-secondary">{cus.customerType.name}</span>
                                                        </td>
                                                        <td>{cus.address}</td>
                                                        <td className="p-1" >
                                                            <Link role="button" to={`/customer/CustomerEdit/${cus.id}`}
                                                               className="btn btn-outline-secondary btn-sm rounded-0 me-2">Sửa</Link>
                                                            <button className="btn btn-outline-danger btn-sm rounded-0"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#exampleModal">Xóa
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
                                <nav aria-label="Page navigation example">
                                    <div className="row" style={{alignItems: "center"}}>
                                        <div className="col-md-6">
                                            <button className="btn btn-outline-primary" style={{marginLeft: "15rem"}}
                                                    onClick={() => prevPage()}>
                                                <i className="fa-solid fa-forward fa-rotate-180"
                                                   style={{color: "#b966e5"}}/>
                                            </button>
                                            <span className="btn btn-outline-primary">
                                                {page + 1}/{totalPage}
                                            </span>
                                            <button className="btn btn-outline-primary" onClick={() => nextPage()}>
                                                <span> <i className="fa-solid fa-forward"
                                                          style={{color: "#b966e5"}}/>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}