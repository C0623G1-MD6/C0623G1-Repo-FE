import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./lam.css";
import * as Yup from "yup";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {toast} from "react-toastify";
import * as WarehouseReceiptService from "../../services/warehouse/WarehouseService";


export function WarehouseCreate() {
    const [products, setProducts] = useState([]);
    const [code, setCode] = useState("");
    const [sizes, setSizes] = useState([]);
    const [productName, setProductName] = useState("");
    const [sizeId, setSizeId] = useState(null);
    const [sizeName, setSizeName] = useState(null);
    const [status, setStatus] = useState(null);
    const [warehouseDetailSet, setWarehouseDetailSet] = useState([]);
    const [detailList, setDetailSet] = useState([]);
    const [productId, setProductId] = useState(null);
    const [product, setProduct] = useState(null);
    const [detail, setDetail] = useState(null);
    const vnd = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
    useEffect(() => {
       getCode()
    }, []);

    useEffect(() => {
        if (productName !== "") {
            getProduct();
        }
    }, [productName]);

    const getAllProducts = async () => {
        const products = await WarehouseReceiptService.getAllProducts();
        let res = await WarehouseReceiptService.getCode();
        setCode(res);
        setProducts(products);
    };

    const initValue = {
        productName: "",
        sizeName: "",
        inputPrice: 0,
        inputQuantity: 1
    }
    const getCode = async () =>{
        const res = await WarehouseReceiptService.getCode();
        setCode(res)
    }

    const getAllSizeProduct = async () => {
        if (productName!== "" && product){
            const sizes = await WarehouseReceiptService.getAllSizeProduct(productName);
            setSizes(sizes);
        }

    };
    function handleDetail(e) {
        const {name, value} = e.target
        setDetail({
            ...detail,
            [name]: value
        })
    }

    const addTable = (values) => {
        createWarehouseDetail(values)
        setDetailSet(prevState => {
            return [
                ...prevState, {...values}]
    })
    }
    const createWarehouseDetail = (item) => {
            setWarehouseDetailSet(prevState => {
                return [...prevState, {
                    productName : item.productName,
                    inputQuantity: item.inputQuantity,
                    inputPrice: item.inputPrice,
                    sizeName: item.sizeName
                }]
            })

    }
    const handelReset = () =>{
        setDetailSet([]);
        setDetail(initValue);
        setSizes([]);
        setProducts([])

    }
    const add = async () => {
            const warehouse = {
                receiptCode : code,
                warehouseDetailSet : warehouseDetailSet
            }
        console.log(warehouseDetailSet)

            let isSuccess = await WarehouseReceiptService.saveWarehouse(warehouse);
            console.log(detailList)
            if (!isSuccess) {
                toast(`Thêm mới đơn hàng thành công!`)
                handelReset()
            } else {
                toast(`Thêm mới đơn hàng không thành công!`)
            }
    }



    useEffect(() => {
        getAllProducts();
    }, []);

    useEffect(() => {
        if (productName !== "" && product!==null) {
            getAllSizeProduct();
        }
        setSizes([])
        setProduct(null)
    }, [productId]);

    const getProduct = async () => {
        for (let i = 0; i < products.length; i++) {
            if(productName!== "" && productName!==products.at(i).name){
                const data = await WarehouseReceiptService.getProduct(productName);
                setProduct(data);
                setProductId(data.id);
            }
        }
    }

    if (!products || !sizes ) return null;

    return (
        <>
            <div className="">
                <div className="row">
                    <div className="side-right bg-light">
                        <div className="tabs bg-light">
                        </div>
                        <div className="p-3">
                            <div className="form-control rounded-0 shadow p-3">
                                <div className="text-center">
                                    <h2 className="fw-bold text-primary pt-3">Nhập Kho</h2>
                                </div>
                                <div className="row">
                                    <label className="col-2 col-form-label">Ngày nhập kho:</label>
                                    <label
                                        className="col-10 fw-bold col-form-label">{new Date().toLocaleDateString()}</label>
                                </div>
                                <div className="row mb-4">
                                    <label className="col-2 col-form-label">Mã nhập kho: </label>
                                    <div className="col-2 p-0 d-flex align-items-center">
                                        <label
                                            className="col-10 fw-bold col-form-label ms-3">{code}</label>
                                    </div>
                                    <div className="col-2 ms-3 d-flex align-items-center">

                                    </div>
                                </div>

                                <Formik initialValues={
                                    {
                                               initValue
                                    }
                                }
                                        onSubmit={(values) =>
                                            (addTable(values))
                                        }
                                        validationSchema={Yup.object({
                                            inputPrice: Yup.number()
                                                .typeError("Thông tin giá không đúng định dạng.")
                                                .required("Vui lòng bổ sung thông tin giá.")
                                                .min(1, "Giá không được là số âm.")
                                                .max(300000000, "Giá không quá 300.000.000vnd"),
                                            inputQuantity: Yup.number()
                                                .typeError("Thông tin số lượng không đúng định dạng.")
                                                .integer("Số lượng phải là số nguyên")
                                                .required("Vui lòng bổ sung thông tin số lượng.")
                                                .min(1, "Số lượng không được là số âm.")
                                                .max(2000, "Số lượng không quá 2000"),
                                            productName : Yup.string()
                                                .required("Vui lòng chọn sản phẩm."),
                                            sizeName : Yup.string()
                                                .required("Vui lòng chọn size.")
                                        })}>{
                                    ({setFieldValue})=>(
                                        <Form>
                                            <div className="mb-3">
                                                <label htmlFor="exampleDataList1">Tên sản phẩm</label>
                                                <Field
                                                    name="productName"
                                                    list="datalistOptions"
                                                    id="exampleDataList1"
                                                    placeholder=""
                                                    className="form-control"
                                                    onChange={e => {setProductName(e.target.value)
                                                        setFieldValue("productName",e.target.value)}}
                                                />
                                                <datalist id="datalistOptions">
                                                    {products.map((product) => (
                                                        <option key={product.id} value={product.id}>
                                                            {product.productName}
                                                        </option>
                                                    ))}
                                                </datalist>
                                                <ErrorMessage
                                                    name="productName"
                                                    component="span"
                                                    className="err-name"
                                                    style={{color: "red"}}
                                                ></ErrorMessage>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleDataList">Size</label>
                                                {sizes.length === 0 ? (
                                                    <input
                                                        className="form-control"
                                                        disabled={true}
                                                        placeholder="Hãy chọn sản phẩm"
                                                        style={{color: "red"}}
                                                    />
                                                ) : (
                                                    <Field
                                                        name="sizeName"
                                                        as="select"
                                                        id="exampleDataList"
                                                        placeholder=""
                                                        className="form-select"
                                                        onChange={event => {
                                                            setSizeName(event.target.value)
                                                            setFieldValue("sizeName", event.target.value)
                                                        }}
                                                    >
                                                        <option value="">
                                                            Chọn Size
                                                        </option>
                                                        {sizes.map((size) => (

                                                            <option key={size.id} value={size.id}>
                                                                {size.name}
                                                            </option>
                                                        ))}
                                                    </Field>

                                                )} <ErrorMessage
                                                name="sizeName"
                                                component="span"
                                                className="err-name"
                                                style={{color: "red"}}
                                            ></ErrorMessage>

                                            </div>
                                            <div className="mb-3">
                                                <label>Số lượng</label>
                                                <Field type='text' name="inputQuantity" id='name' className="form-control"
                                                       />
                                                <ErrorMessage name="inputQuantity" component="span"
                                                              style={{color: "red"}}></ErrorMessage>
                                            </div>
                                            <div className="mb-3">
                                                <label>Đơn giá</label>
                                                <Field type='text' name="inputPrice" id='name' className="form-control"/>
                                                <ErrorMessage name="inputPrice" component="span"
                                                              style={{color: "red"}}></ErrorMessage>
                                            </div>


                                            <div>
                                                <button type="submit"
                                                        className="btn btn-outline-primary rounded-0 text-center mb-2">Thêm
                                                    vào bảng
                                                </button>
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
                                        {detailList.map((detail,index)=>(
                                            <tr key={index} className="text-center">
                                                <td>{index+1}</td>
                                                <td>{detail.productName}</td>
                                                <td>{detail.sizeName}</td>
                                                <td>{detail.inputQuantity}</td>
                                                <td>{detail.inputPrice}</td>
                                                <td>{detail.inputPrice * detail.inputQuantity}</td>
                                            </tr>
                                        ))}


                                        </tbody>
                                    </table>
                                </div>
                                <div className="text-center">
                                    <button onClick={handelReset} className="btn btn-outline-secondary btn-sm rounded-0 ms-3">Hủy</button>
                                    <button onClick={add} className="btn btn-outline-primary btn-sm rounded-0 ms-3">Xác nhận
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
