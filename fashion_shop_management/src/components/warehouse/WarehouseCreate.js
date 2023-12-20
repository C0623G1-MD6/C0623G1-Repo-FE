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
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [productId, setProductId] = useState(null);
    const [product, setProduct] = useState(null);
    const vnd = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })


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

    const getAllSizeProduct = async () => {
        if (productName!==""){
            const sizes = await WarehouseReceiptService.getAllSizeProduct(productName);
            setSizes(sizes);
        }

    };

    const add = async (warehouseReceiptDetailDto) => {
        try {
            let isSuccess = await WarehouseReceiptService.saveWarehouse(warehouseReceiptDetailDto);
            if (isSuccess) {
                toast(`Thêm mới đơn hàng thành công!`)
            } else {
                toast(`Thêm mới đơn hàng không thành công!`)
            }
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        getAllProducts();
    }, []);

    useEffect(() => {
        if (productName !== "") {
            getAllSizeProduct();
        }
    }, [productName]);

    // const handleChange = (event) => {
    //     const {name, value} = event.target;
    //     setInputValues((prevValues) => ({
    //         ...prevValues,
    //         [name]: value,
    //     }));
    // };
    // console.log(productId)
    //
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setItems((prevItems) => [...prevItems, inputValues]);
    //     setInputValues({});
    // };
    const getProduct = async () => {
        if(productName!== null){
            const data = await WarehouseReceiptService.getProduct(productName);
            setProduct(data);
            setProductId(data.id);
        }

    }
    console.log(
        productId
    )
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
                                        productId: "",
                                        sizeId: "",
                                        inputPrice: 0,
                                        inputQuantity: 1
                                    }
                                }
                                        onSubmit={(values) => {
                                            add(values)
                                        }
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
                                                .max(2000, "Số lượng không quá 2000")
                                        })}>{
                                    ({setFieldValue})=>(
                                        <Form>
                                            <div className="mb-3">
                                                <label htmlFor="exampleDataList1">Tên sản phẩm</label>
                                                <Field
                                                    name="productId"
                                                    list="datalistOptions"
                                                    id="exampleDataList1"
                                                    placeholder=""
                                                    className="form-control"
                                                    onChange={e => {setProductName(e.target.value)
                                                        setFieldValue("productId",productId)}}
                                                />
                                                <datalist id="datalistOptions">
                                                    {products.map((product) => (
                                                        <option key={product.id} value={product.id}>
                                                            {product.productName}
                                                        </option>
                                                    ))}
                                                </datalist>
                                                <ErrorMessage
                                                    name="productId"
                                                    component="span"
                                                    className="err-name"
                                                ></ErrorMessage>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleDataList">Size</label>
                                                <Field
                                                    name="sizeId"
                                                    list="datalistOptions2"
                                                    id="exampleDataList"
                                                    placeholder=""
                                                    className="form-control"
                                                    onChange={event => {
                                                        setSizeName(event.target.value)
                                                        setFieldValue("sizeId",sizeId)
                                                    }}
                                                />
                                                <datalist id="datalistOptions2">
                                                    {sizes.map((size) => (
                                                        <option key={size.id} value={size.id}>
                                                            {size.name}
                                                        </option>
                                                    ))}
                                                </datalist>
                                                <ErrorMessage
                                                    name="productId"
                                                    component="span"
                                                    className="err-name"
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
                                                        className="btn btn-outline-primary rounded-0 text-center btn-create-news mb-2">Thêm
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
                                    <button className="btn btn-outline-secondary btn-sm rounded-0 ms-3">Hủy</button>
                                    <button className="btn btn-outline-primary btn-sm rounded-0 ms-3">Xác nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

        // <>
        //   <div class="container  mt-3 p-5">
        //     <div class="d-flex justify-content-center">
        //       <div class="input-card form-control shadow-lg ">
        //         <h2 class="input-title">Nhập Kho</h2>
        //         <Formik
        //             initialValues={initValue}
        //             onSubmit={() => {
        //               handleSubmit();
        //             }}
        //             validationSchema={Yup.object({
        //               inputQuantity: Yup.number()
        //                   .typeError('Vui lòng chỉ nhập số')
        //                   .integer("Vui lòng nhập số nguyên dương")
        //                   .required("Vui lòng không để trống trường này")
        //                   .min(1, "Vui lòng nhập số lớn hơn 0")
        //                   .max(2000, "Vui lòng không nhập số lớn hơn 2000"),
        //               inputPrice: Yup.number()
        //                   .required("Vui lòng không để trống trường này")
        //                   .min(1, "Vui lòng nhập số lớn hơn 0")
        //                   .max(1000000000, "Vui lòng không nhập số lớn hơn 10000000"),
        //             })}
        //         >
        //           <Form class="input-form">
        //             <div class="input-group">
        //               <Field
        //                   placeholder=""
        //                   type="text"
        //                   name="receiptCode"
        //                   id="validationDefault01"
        //                   disabled
        //                   onChange={handleChange}
        //               />
        //               <label for="validationDefault01">Mã phiếu</label>
        //             </div>
        //             <div class="input-group">
        //               <Field
        //                   placeholder=""
        //                   type="text"
        //                   name="receiptDate"
        //                   id="validationDefault01"
        //                   onChange={handleChange}
        //                   disabled
        //               />
        //               <label for="validationDefault01">Ngày nhập kho</label>
        //             </div>
        //             <div class="input-group">
        //               <Field
        //                   name="productId"
        //                   list="datalistOptions"
        //                   id="exampleDataList"
        //                   placeholder=""
        //                   value={inputValues.productId}
        //                   onChange={handleChange}
        //               />
        //               <label for="exampleDataList">Tên sản phẩm</label>
        //               <datalist id="datalistOptions">
        //                 {products.map((product) => (
        //                     <option key={product.id} value={product.productName}>
        //
        //                     </option>
        //                 ))}
        //               </datalist>
        //               <ErrorMessage
        //                   name="productId"
        //                   component="span"
        //                   className="err-name"
        //               ></ErrorMessage>
        //             </div>
        //             <div class="input-group">
        //               <Field
        //                   placeholder=""
        //                   type="text"
        //                   name="sizeId"
        //                   id="validationDefault01"
        //               />
        //               <label for="validationDefault01">Size</label>
        //             </div>
        //             <div class="input-group">
        //               <Field
        //                   placeholder=""
        //                   type="number"
        //                   name="inputQuantity"
        //                   id="validationDefault01"
        //                   value={inputValues.inputQuantity}
        //                   onChange={handleChange}
        //               />
        //               <label for="validationDefault01">Số lượng</label>
        //               <ErrorMessage
        //                   name="inputQuantity"
        //                   component="span"
        //                   className="err-name"
        //               ></ErrorMessage>
        //             </div>
        //             <div class="input-group">
        //               <Field
        //                   placeholder=""
        //                   type="number"
        //                   name="inputPrice"
        //                   id="validationDefault01"
        //                   value={inputValues.inputPrice}
        //                   onChange={handleChange}
        //               />
        //               <label for="validationDefault01">Đơn giá</label>
        //               <ErrorMessage
        //                   name="inputPrice"
        //                   component="span"
        //                   className="err-name"
        //               ></ErrorMessage>
        //             </div>
        //
        //             <div class="mt-5 confirm d-flex justify-content-md-center">
        //               <div>
        //                 <button
        //                     type="button"
        //                     class="btn btn-outline-primary rounded-0"
        //                 >
        //                   Thêm vào bảng
        //                 </button>
        //               </div>
        //             </div>
        //           </Form>
        //         </Formik>
        //
        //         <div class="mt-5 d-flex justify-content-evenly ">
        //           <table class="table">
        //             <thead class="table-secondary">
        //             <tr>
        //               <th>STT</th>
        //               <th>Mã Hàng</th>
        //               <th>Tên</th>
        //               <th>Số Lượng</th>
        //               <th>Size</th>
        //               <th>Đơn Giá</th>
        //             </tr>
        //             </thead>
        //             <tbody>
        //             {items.map((item, index) => (
        //                 <tr key={index}>
        //                   <td>{index + 1}</td>
        //                   <td>{item.productId}</td>
        //                   <td>{item.productId}</td>
        //                   <td>{item.inputQuantity}</td>
        //                   <td>{item.inputQuantity}</td>
        //                   <td>{item.inputPrice}</td>
        //                 </tr>
        //             ))}
        //             </tbody>
        //           </table>
        //         </div>
        //         <div class="mt-5 confirm d-flex justify-content-md-center">
        //           <div>
        //             <a class="btn btn-outline-secondary me-3 rounded-0">Hủy</a>
        //           </div>
        //           <div>
        //             <a class="btn btn-outline-primary rounded-0">Xác Nhận</a>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </>
    );
}
