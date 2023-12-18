import {Formik, Form, Field, ErrorMessage} from "formik";
import {NavLink, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import * as paymentService from "../../services/payment/paymentService";

export function Payment() {
    const initProduct = {
        name: "",
        price: "",
        percent: "",
        productCode: ""
    }

    const [detailList, setDetailList] = useState([]);
    const [products, setProducts] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [productCode, setProductCode] = useState("");
    const [sizeName, setSizeName] = useState("");
    const [keyword, setKeyword] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [sellingQuantity, setSellingQuantity] = useState(0);
    const [customer, setCustomer] = useState({});
    const [customerId, setCustomerId] = useState(0);
    const [product, setProduct] = useState({initProduct});
    const [productId, setProductId] = useState();
    const [total, setTotal] = useState(0);
    const location = useLocation();
    const {cus} = location.state || {cus: null};

    useEffect(() => {
        getAllProduct();
    }, [keyword])

    useEffect(() => {
        if(cus!==null){
            setCustomer(cus);
            setCustomerId(cus.id);
        }
    }, [customerId]);

    useEffect(() => {
        if(productCode!==""){
            getProduct();
        }
    }, [productCode]);

    useEffect(() => {
        if(productId>0){
            getAllSizeProduct();
        }
    }, [productId]);

    useEffect(() => {
        if(productId>0){
            getQuantityProduct();
        }
    }, [productCode, sizeName]);

    const getAllProduct = async () => {
        const res = await paymentService.getListProduct(keyword);
        setProducts(res.data);
    }

    const getAllSizeProduct = async () => {
        const res = await paymentService.getListSizeByProductCode(productCode);
        setSizes(res.data);
    }

    const getQuantityProduct = async () => {
        if(productCode!==""&&sizeName!==""){
            const res = await paymentService.getQuantityByProductCodeAndSizeName(productCode, sizeName);
            setQuantity(res.data.quantity);
        }
    }

    const getProduct = async () => {
        const data = await paymentService.getProductByProductCode(productCode);
        setProduct(data);
        setProductId(data.id);
        if(!sellingQuantity||!data){
            setTotal(0);
        } else {
            setTotal((data.price*sellingQuantity*(1-data.percent)));
        }

    }

    const handleTotal = (e) => {
        setSellingQuantity(e);
        if(!product.price){
            setTotal(0)
        } else {
            setTotal((product.price*e*(1-product.percent)));
        }

    }

    if(!product){
        setProduct(initProduct);
        setSizes([]);
    }

    const initValue = {

    }

    return (
        <>
            <div className="">
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
                                    <label className="col-2 col-form-label">Ngày tháng năm</label>
                                    <label
                                        className="col-10 fw-bold col-form-label">{new Date().toLocaleDateString()}</label>
                                </div>
                                <div className="row mb-4">
                                    <label className="col-2 col-form-label">Mã khách hàng</label>
                                    <div className="col-2 p-0 d-flex align-items-center">
                                        <input className="form-control form-control-sm rounded-0 border-dark fw-bold"
                                               readOnly defaultValue={customer.customer_code}/>
                                    </div>
                                    <div className="col-2 ms-3 d-flex align-items-center">
                                        <NavLink to="/look-up-customer" role="button" href="look_up_customers.html"
                                                 className="btn btn-outline-dark btn-sm rounded-0 w-100">Tra cứu khách
                                            hàng</NavLink>
                                    </div>
                                </div>
                                <Formik initialValues={initValue} onSubmit={}>

                                </Formik>
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
                                                list="datalistOptions"
                                                onChange={event => setProductCode(event.target.value)}/>
                                                <datalist id="datalistOptions">
                                                    {
                                                        products.map(product => (
                                                            <option key={product.product_code} value={product.product_code}></option>
                                                        ))
                                                    }
                                                </datalist>
                                            </th>
                                            <td className="p-1 col-4">
                                                <input
                                                className="p-1 form-control form-control-sm rounded-0 text-end"
                                                defaultValue={product.name} readOnly/>
                                            </td>
                                            <td className="p-1 col-1">
                                                <select
                                                    className="p-1 form-select form-select-sm rounded-0 border-dark text-center"
                                                    onChange={event => setSizeName(event.target.value)}
                                                >
                                                    {
                                                        sizes.map(size => (
                                                            <option key={size.name}
                                                                    value={size.name}>{size.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </td>
                                            <td className="p-1 col-1"><input type="number"
                                                className="p-1 form-control form-control-sm rounded-0 border-dark text-end"
                                                onChange={event => handleTotal(event.target.value)}
                                                                             max={quantity} min="0"
                                            />
                                            </td>
                                            <td className="p-1 col-1">
                                                <input className="p-1 form-control form-control-sm rounded-0 text-end"
                                                       value={!product.price?product.price:parseFloat(product.price).toLocaleString('vi-VN')} readOnly/>
                                            </td>
                                            <td className="p-1 col-1">
                                                <input className="p-1 form-control form-control-sm rounded-0 text-end"
                                                       defaultValue={product.percent} readOnly/>
                                            </td>
                                            <td className="p-1 col-2">
                                                <input className="p-1 form-control form-control-sm rounded-0 text-end"
                                                       value={total!==0?total.toLocaleString("vi-VN"):""} readOnly/>
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

                                        <tr className="fst-italic">
                                            <th colSpan="7" className="">Tổng</th>
                                            <th className="text-end">400.000</th>
                                        </tr>
                                        <tr>
                                            <td colSpan="7" className="fst-italic">Chiết khấu 10%</td>
                                            <td className="text-end fst-italic">10%</td>
                                        </tr>
                                        <tr className="text-danger fst-italic">
                                            <th colSpan="7" className="">Thành tiền</th>
                                            <th className="text-end">360.000</th>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-light btn-sm rounded-0 fs-3 py-0"><i
                                        className="bi bi-qr-code-scan"></i></button>
                                    <button className="btn btn-outline-secondary btn-sm rounded-0 ms-3">Hủy</button>
                                    <button className="btn btn-outline-primary btn-sm rounded-0 ms-3">In hóa đơn
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}