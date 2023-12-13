import React, {useEffect, useState} from "react";
import {getAllCustomerType} from "../../services/customer/typeCustomerService";
import {getAllCustomer} from "../../services/customer/customerService";
import {Link} from "react-router-dom";

export function CustomerList() {

    const [typeCustomer, setTypeCustomer] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [name, setName] = useState("");
    const [typeSearch, setTypeSearch] = useState("");

    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        displayCustomer()
        displayCustomerType()
    }, [name, typeSearch, page])

    const displayCustomerType = async () => {
        const res = await getAllCustomerType();
        setTypeCustomer(res);
    }

    const displayCustomer = async () => {
        const res = await getAllCustomer(name, typeSearch, page);
        setCustomer(res.data);
        setTotalPage(res.data.totalPages);
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
                                        <th>STT</th>
                                        <th>Mã Khách Hàng</th>
                                        <th>Tên Khách Hàng</th>
                                        <th>Ngày Sinh</th>
                                        <th>Giới Tính</th>
                                        <th>Điện Thoại</th>
                                        <th>Email</th>
                                        <th>Điểm</th>
                                        <th>Bậc</th>
                                        <th>Địa Chỉ</th>
                                        <th>Tính Năng</th>
                                    </tr>
                                    </thead>
                                    {
                                        customer && customer.length !== 0 ?
                                            <tbody className="table-group-divider">
                                            {
                                                customer.map((cus, index) => (
                                                    <tr key={cus.id}>
                                                        <td>{index+1}</td>
                                                        <td>{cus.customerCode}</td>
                                                        <td>{cus.name}</td>
                                                        <td>{cus.birthday}</td>
                                                        <td>{cus.gender}</td>
                                                        <td>{cus.phone}</td>
                                                        <td>{cus.email}</td>
                                                        <td>{cus.point}</td>
                                                        <td>
                                                            <span className="badge rounded-pill text-bg-secondary">{cus.customerType.name}</span>
                                                        </td>
                                                        <td>{cus.address}</td>
                                                        <td className="p-1">
                                                            <a role="button" href="../thienlch/prototypeEdit.html"
                                                               className="btn btn-outline-secondary btn-sm rounded-0 me-2">Sửa</a>
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
                                    <ul class="pagination justify-content-end">
                                        <li class="page-item disabled">
                                            <a class="page-link text-dark" href="#">&laquo;</a>
                                        </li>
                                        <li class="page-item"><a class="page-link text-dark" href="#">1</a></li>
                                        <li class="page-item"><a class="page-link text-dark" href="#">2</a></li>
                                        <li class="page-item"><a class="page-link text-dark" href="#">3</a></li>
                                        <li class="page-item">
                                            <a class="page-link text-dark" href="#">&raquo;</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}