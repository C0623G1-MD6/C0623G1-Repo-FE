import {Formik, Form, Field, ErrorMessage} from "formik";

export function Payment() {
    return (
        <>
            <div className="col-lg-10">
                <div className="row">
                    <div className="side-right bg-light">
                        <div className="tabs bg-light">
                        </div>
                        <div className="p-3">
                            <div className="form-control rounded-0 shadow p-3">
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a className="nav-link text-dark" aria-current="page" href="#">Hóa đơn 1</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-dark" href="#">Hóa đơn 2</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-dark" href="#">Hóa đơn 3</a>
                                    </li>
                                    <li className="nav-item">
                                        <a role="button" className="nav-link disabled"><i className="bi bi-plus-lg"></i></a>
                                    </li>
                                </ul>
                                <div className="text-center">
                                    <h2 className="fw-bold text-primary pt-3">THANH TOÁN</h2>
                                </div>
                                <div className="row">
                                    <label className="col-2 col-form-label">Mã hóa đơn</label>
                                    <label className="col-10 col-form-label fw-bold">HD-00001</label>
                                </div>
                                <div className="row">
                                    <label className="col-2 col-form-label">Ngày tháng năm</label>
                                    <label className="col-10 fw-bold col-form-label">20/11/2023</label>
                                </div>
                                <div className="row mb-4">
                                    <label className="col-2 col-form-label">Mã khách hàng</label>
                                    <div className="col-2 p-0 d-flex align-items-center">
                                        <input className="form-control form-control-sm rounded-0 border-dark fw-bold"
                                               readOnly/>
                                    </div>
                                    <div className="col-2 ms-3 d-flex align-items-center">
                                        <a role="button" href="look_up_customers.html"
                                           className="btn btn-outline-dark btn-sm rounded-0 w-100">Tra cứu khách
                                            hàng</a>
                                    </div>
                                </div>
                                <div>
                                    <table className="table table-bordered mb-0">
                                        <thead>
                                        <tr>
                                            <td className="p-1 col-1">
                                                <button className="btn btn-sm btn-outline-primary rounded-0 w-100">Nhập
                                                </button>
                                            </td>
                                            <th className="p-1 col-1"><input
                                                className="p-1 form-control form-control-sm rounded-0 border-dark text-center"
                                                value=""/>
                                            </th>
                                            <td className="p-1 col-4">
                                                <input className="p-1 form-control form-control-sm rounded-0 text-end"
                                                       value="" readOnly/>
                                            </td>
                                            <td className="p-1 col-1">
                                                <select className="p-1 form-select form-select-sm rounded-0 border-dark text-center">
                                                    <option value="" selected></option>
                                                    <option>M</option>
                                                    <option>L</option>
                                                    <option>XL</option>
                                                    <option>XXL</option>
                                                    <option>XXXL</option>
                                                </select>
                                            </td>
                                            <td className="p-1 col-1"><input
                                                className="p-1 form-control form-control-sm rounded-0 border-dark text-end"
                                                value=""/>
                                            </td>
                                            <td className="p-1 col-1">
                                                <input className="p-1 form-control form-control-sm rounded-0 text-end"
                                                       value="" readOnly/>
                                            </td>
                                            <td className="p-1 col-1">
                                                <input className="p-1 form-control form-control-sm rounded-0 text-end"
                                                       value="" readOnly/>
                                            </td>
                                            <td className="p-1 col-2">
                                                <input className="p-1 form-control form-control-sm rounded-0 text-end"
                                                       value="" readOnly/>
                                            </td>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div>
                                    <table className="table table-bordered table-hover">
                                        <thead className="table-secondary">
                                        <tr className="text-center">
                                            <th scope="col" className="col-1">STT</th>
                                            <th scope="col" className="col-1">Mã hàng</th>
                                            <th scope="col" className="col-4">Tên hàng</th>
                                            <th scope="col" className="col-1">Size</th>
                                            <th scope="col" className="col-1">Số lượng</th>
                                            <th scope="col" className="col-1">Đơn giá</th>
                                            <th scope="col" className="col-1">Khuyến mãi</th>
                                            <th scope="col" className="col-2">Tổng tiền</th>
                                        </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                        <tr role="button" data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop">
                                            <td className="text-center">01</td>
                                            <td className="text-center">H001</td>
                                            <td>Quần bò</td>
                                            <td className="text-center">L</td>
                                            <td className="p-1"><input
                                                className="form-control form-control-sm border-0 rounded-0 p-1 text-end"
                                                value="01"/></td>
                                            <td className="p-1"><input
                                                className="form-control form-control-sm border-0 rounded-0 p-1 text-end"
                                                value="200.000"/></td>
                                            <td className="p-1"><input
                                                className="form-control form-control-sm border-0 rounded-0 p-1 text-end"
                                                value=""/></td>
                                            <td className="text-end">200.000</td>
                                        </tr>
                                        <tr role="button" data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop">
                                            <td className="text-center">02</td>
                                            <td className="text-center">H002</td>
                                            <td>Quần bò</td>
                                            <td className="text-center">L</td>
                                            <td className="p-1"><input
                                                className="form-control form-control-sm border-0 rounded-0 p-1 text-end"
                                                value="01"/></td>
                                            <td className="p-1"><input
                                                className="form-control form-control-sm border-0 rounded-0 p-1 text-end"
                                                value="200.000"/></td>
                                            <td className="p-1"><input
                                                className="form-control form-control-sm border-0 rounded-0 p-1 text-end"
                                                value=""/></td>
                                            <td className="text-end">200.000</td>
                                        </tr>

                                        <tr className="fst-italic">
                                            <th colspan="7" className="">Tổng</th>
                                            <th className="text-end">400.000</th>
                                        </tr>
                                        <tr>
                                            <td colspan="7" className="fst-italic">Chiết khấu 10%</td>
                                            <td className="text-end fst-italic">10%</td>
                                        </tr>
                                        <tr className="text-danger fst-italic">
                                            <th colspan="7" className="">Thành tiền</th>
                                            <th className="text-end">360.000</th>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-light btn-sm rounded-0 fs-3 py-0"><i className="bi bi-qr-code-scan"></i></button>
                                    <button className="btn btn-outline-secondary btn-sm rounded-0 ms-3">Hủy</button>
                                    <button className="btn btn-outline-primary btn-sm rounded-0 ms-3">In hóa đơn</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}