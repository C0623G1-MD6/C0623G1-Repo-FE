import {Formik, Form, Field, ErrorMessage} from "formik";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as paymentService from "../../services/payment/paymentService";
import {toast} from "react-toastify";
import {NotFound} from "../NotFound";
import AccessDenied from "../auth/AccessDenied";
import CameraQRScanners from "./CameraQRScanners";

export function Payment() {
    const initProduct = {
        name: "",
        price: "",
        percent: "",
        productCode: ""
    }

    const initValue = {
        productCode: "",
        name: "",
        size: "",
        amount: "",
        price: 0,
        promotion: 0,
        totalDetail: 0,
        sizeDetailId: ""
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const [invoiceDetailSet, setInvoiceDetailSet] = useState([])
    const [detailLists, setDetailLists] = useState([]);
    const [detail, setDetail] = useState(initValue)
    const [products, setProducts] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [productCode, setProductCode] = useState("");
    const [sizeName, setSizeName] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sizeDetail, setSizeDetail] = useState({})
    const [sellingQuantity, setSellingQuantity] = useState(0);
    const [customer, setCustomer] = useState({});
    const [customerId, setCustomerId] = useState(0);
    const [product, setProduct] = useState({initProduct});
    const [productId, setProductId] = useState();
    const [totalDetail, setTotalDetail] = useState(0);
    const [total, setTotal] = useState(0)
    const [totalPayment, setTotalPayment] = useState(0);
    const location = useLocation();
    const {cus} = location.state || {cus: {}};
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    // console.log(productCode);
    // console.log(product);
    console.log(detail);
    useEffect(() => {
        getAllProduct();
        if (!user) {
            return <AccessDenied/>
        }
    }, [keyword])

    useEffect(() => {
        if (cus !== null) {
            setCustomer(cus);
            setCustomerId(cus.id);
        }
    }, [customerId]);

    useEffect(() => {
        if (productCode !== "") {
            getProduct();
        }
    }, [productCode]);

    useEffect(() => {
        if (productId > 0) {
            getAllSizeProduct();
        }
    }, [productId]);

    useEffect(() => {
        if (productId > 0) {
            getSizeDetail();
        }
    }, [productCode, sizeName]);

    const getAllProduct = async () => {
        const res = await paymentService.getListProduct(keyword);
        setProducts(res.data);
    }

    const getAllSizeProduct = async () => {
        const res = await paymentService.getListSizeByProductCode(productCode);
        setSizes(res.data);
        setSizeName(res.data[0].name)
    }

    const getSizeDetail = async () => {
        if (productCode !== "" && sizeName !== "") {
            const res = await paymentService.getQuantityByProductCodeAndSizeName(productCode, sizeName);
            setSizeDetail(res.data);
        }
    }

    const getProduct = async () => {
        const data = await paymentService.getProductByProductCode(productCode);
        console.log(data);
        setProduct(data);
        setProductId(data.id);
        // setDetail({
        //     ...detail,
        //     productCode: data.product_code,
        // })
        if (!sellingQuantity || !data) {
            setTotalDetail(0);
        } else {
            setTotalDetail((data.price * sellingQuantity * (1 - data.percent)));
        }

    }

    const handleTotal = (e) => {
        setSellingQuantity(e);
        if (!product.price) {
            setTotalDetail(0)
        } else {
            setTotalDetail((product.price * e * (1 - product.percent)));
        }

    }

    if (!product) {
        setProduct(initProduct);
        setSizes([]);
    }

    const enter = (values) => {
        values.productCode = product.productCode;
        values.name = product.name;
        values.price = product.price;
        values.promotion = product.percent;
        values.totalDetail = totalDetail;
        values.size = sizeName;
        values.sizeDetailId = sizeDetail.id;
        console.log(values);
        createInvoiceDetail(values);
        setTotal(values.price * values.amount * (1 - values.promotion) + total);
        setTotalPayment((values.price * values.amount * (1 - values.promotion) + total) * (100 - customer.discount_percent) / 100);
        setDetailLists(prevState => {
            return [...prevState, values]
        })
        setProduct(initProduct);
        setDetail(initValue);
        setSizes([])
    }

    const openCamera = () => {
        setIsCameraOpen(true);
    }

    const handelReset = () => {
        setDetailLists([]);
        setCustomer({});
        setProduct(initProduct);
        setDetail(initValue);
        setSizes([]);
        setTotal(0);
        setTotalPayment(0);
        setTotalDetail(0);
        setCustomer({});
    }
    const createInvoiceDetail = (item) => {
        // detailLists.map(item => {
        setInvoiceDetailSet(prevState => {
            return [...prevState, {
                sellingPrice: item.price * (1 - item.promotion) * (1 - customer.discount_percent / 100),
                sellingQuantity: item.amount,
                sizeDetailId: item.sizeDetailId
            }]
        })
        // })
    }

    function handleDetail(e) {
        const {name, value} = e.target
        setDetail({
            ...detail,
            [name]: value
        })
    }

    const saveInvoice = async () => {
        const invoice = {
            customerId: customerId,
            invoiceDetailDtoSet: invoiceDetailSet
        }
        const res = await paymentService.saveInvoice(invoice);
        console.log(res);
        if (!res) {
            toast.error("Lưu hóa đơn thất bại!");
        } else if (res.status === 200) {
            toast.success("Lưu hóa đơn thành công!");
            handelReset();
            navigate("/payment");
        } else {
            toast.error("Lưu hóa đơn thất bại!");
        }
    }

    return (
        <>
            <div className="">
                <div className="side-right">
                    <div className="tabs">
                    </div>
                    <div className="p-0">
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
                                <label className="col-2 col-form-label">Ngày tháng năm</label>
                                <label
                                    className="col-10 fw-bold col-form-label">{new Date().toLocaleDateString()}</label>
                            </div>
                            <div className="row mb-1">
                                <label className="col-2 col-form-label">Mã khách hàng</label>
                                <div className="col-2 p-0 d-flex align-items-center">
                                    <input className="form-control form-control-sm rounded-0 border-dark fw-bold"
                                           readOnly defaultValue={customer.customer_code}
                                    />
                                </div>
                                <div className="col-2 ms-3 d-flex align-items-center">
                                    <NavLink to="/look-up-customer" role="button" href="look_up_customers.html"
                                             className="btn btn-outline-dark btn-sm rounded-0 w-100">Tra cứu khách
                                        hàng</NavLink>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <label className="col-2 col-form-label">Tên khách hàng</label>
                                <div className="col-2 p-0 d-flex align-items-center">
                                    <input className="form-control form-control-sm rounded-0 border-dark fw-bold"
                                           readOnly defaultValue={customer.name}
                                    />
                                </div>
                            </div>
                            <Formik
                                initialValues={initValue}
                                onSubmit={values => {
                                    enter(values);
                                }}>
                                {
                                    ({setFieldValue}) => (
                                        <Form>
                                            <div>
                                                <table className="table table-bordered mb-0">
                                                    <thead>
                                                    <tr>
                                                        <td className="p-1 col-1">
                                                            <button type="submit"
                                                                    className="btn btn-sm btn-outline-primary rounded-0 w-100">Nhập
                                                            </button>
                                                        </td>
                                                        <th className="p-1 col-1"><Field
                                                            className="p-1 form-control form-control-sm rounded-0 border-dark text-center"
                                                            list="datalistOptions"
                                                            onChange={event => {
                                                                setProductCode(event.target.value);
                                                                handleDetail(event);
                                                                setFieldValue("productCode", event.target.value);
                                                            }}
                                                            name="productCode"
                                                            value={detail.productCode}
                                                        />
                                                            <datalist id="datalistOptions">
                                                                {
                                                                    products.map(product => (
                                                                        <option key={product.product_code}
                                                                                value={product.product_code}></option>
                                                                    ))
                                                                }
                                                            </datalist>
                                                        </th>
                                                        <td className="p-1 col-4">
                                                            <Field
                                                                className="p-1 form-control form-control-sm rounded-0 text-end"
                                                                value={product.name}
                                                                onChange={event => setFieldValue("name", event.target.value)}
                                                                name="name"
                                                                readOnly/>
                                                        </td>
                                                        <td className="p-1 col-1">
                                                            {
                                                                sizes.length > 0 ?
                                                                    <Field
                                                                        as="select"
                                                                        className="p-1 form-select form-select-sm rounded-0 border-dark text-center"
                                                                        onChange={event => {
                                                                            setSizeName(event.target.value);
                                                                            handleDetail(event)
                                                                            setFieldValue("size", event.target.value)
                                                                        }}
                                                                        name="size"
                                                                        value={detail.size}
                                                                    >
                                                                        {
                                                                            sizes.map(size => (
                                                                                <option key={size.name}
                                                                                        value={size.name}>{size.name}</option>
                                                                            ))
                                                                        }
                                                                    </Field>
                                                                    :
                                                                    <input
                                                                        className="p-1 form-select form-select-sm rounded-0 border-dark text-center"
                                                                        readOnly/>
                                                            }
                                                        </td>
                                                        <td className="p-1 col-1">
                                                            <Field type="number"
                                                                   className="p-1 form-control form-control-sm rounded-0 border-dark text-end"
                                                                   onChange={event => {
                                                                       handleTotal(event.target.value);
                                                                       handleDetail(event)
                                                                       setFieldValue("amount", event.target.value)
                                                                   }}
                                                                   max={sizeDetail.quantity} min="0"
                                                                   name="amount"
                                                                   value={detail.amount}
                                                            />
                                                        </td>
                                                        <td className="p-1 col-1">
                                                            <Field
                                                                className="p-1 form-control form-control-sm rounded-0 text-end"
                                                                value={!product.price ? product.price : parseFloat(product.price).toLocaleString('vi-VN')}
                                                                onChange={event => setFieldValue("price", event.target.value)}
                                                                name="price"
                                                                readOnly/>
                                                        </td>
                                                        <td className="p-1 col-1">
                                                            <Field
                                                                className="p-1 form-control form-control-sm rounded-0 text-end"
                                                                value={!product.percent ? "" : `${product.percent * 100}%`}
                                                                onChange={event => setFieldValue("promotion", event.target.value)}
                                                                name="promotion"
                                                                readOnly/>
                                                        </td>
                                                        <td className="p-1 col-2">
                                                            <Field
                                                                className="p-1 form-control form-control-sm rounded-0 text-end"
                                                                value={totalDetail !== 0 ? totalDetail.toLocaleString("vi-VN") : ""}
                                                                onChange={event => setFieldValue("totalDetail", event.target.value)}
                                                                name="totalDetail"
                                                                readOnly/>
                                                        </td>
                                                    </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </Form>
                                    )
                                }
                            </Formik>
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
                                    {
                                        detailLists.map((detail, index) => (
                                            <tr key={detail.productCode}>
                                                <td role="button" data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop"
                                                    className="text-center">{index + 1}</td>
                                                <td role="button" data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop"
                                                    className="text-center">{detail.productCode}</td>
                                                <td role="button" data-bs-toggle="modal"
                                                    data-bs-target="#staticBackdrop">{detail.name}</td>
                                                <td className="text-center">{detail.size}</td>
                                                <td className="p-1"><input type="number"
                                                                           className="form-control form-control-sm border-0 rounded-0 p-1 text-end"
                                                                           value={detail.amount}/></td>
                                                <td className="text-end">{detail.price !== 0 ? detail.price.toLocaleString("vi-VN") : 0}</td>
                                                <td className="text-end">{detail.promotion > 0 ? `${detail.promotion * 100}%` : 0}</td>
                                                <td className="text-end">{detail.totalDetail !== 0 ? detail.totalDetail.toLocaleString("vi-VN") : 0}</td>

                                            </tr>
                                        ))
                                    }

                                    <tr className="fst-italic">
                                        <th colSpan="7" className="ps-3">Tổng</th>
                                        <th className="text-end">{total !== 0 ? total.toLocaleString("vi-VN") : 0}</th>
                                    </tr>
                                    <tr className="fst-italic">
                                        <td colSpan="7" className="ps-3">Chiết khấu</td>
                                        <td className="text-end">{customer.discount_percent}%</td>
                                    </tr>
                                    <tr className="text-danger fst-italic">
                                        <th colSpan="7" className="ps-3">Thành tiền</th>
                                        <th className="text-end">{totalPayment !== 0 ? totalPayment.toLocaleString("vi-VN") : 0}</th>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-light btn-sm rounded-0 fs-3 py-0"
                                        onClick={() => openCamera()}
                                ><i className="bi bi-qr-code-scan"></i></button>
                                <button className="btn btn-outline-secondary btn-sm rounded-0 ms-3"
                                        onClick={handelReset}
                                >Hủy
                                </button>
                                <button className="btn btn-outline-primary btn-sm rounded-0 ms-3"
                                        onClick={() => saveInvoice()}>In hóa đơn
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    isCameraOpen &&
                    <CameraQRScanners setProductCode={setProductCode}
                                      setIsCameraOpen={setIsCameraOpen}
                                      cameraOpen={isCameraOpen}
                    />
                }
            </div>

            <div className="modal fade" id="staticBackdrop" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content text-center" tabIndex={2}>
                        <div className="modal-body">
                            <i className="bi bi-exclamation-triangle text-danger" style={{fontSize: "60px"}}
                               id="icon-warning"></i>
                            <h5>Bạn chắn chắn muốn xóa sản phẩm <span className="text-danger">......</span> này khỏi đơn
                                hàng?</h5>
                            Hành động này không thể hoàn tác!
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-sm btn-outline-secondary rounded-0"
                                    data-bs-dismiss="modal">Hủy
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-danger rounded-0 ms-3"
                                    data-bs-dismiss="modal">Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}