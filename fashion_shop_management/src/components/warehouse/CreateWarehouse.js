import React, {useEffect, useState} from 'react';
import {getAllSizeDetail, importWarehouse} from "../../services/size/SizeService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import FormikReactSelect from "./FormikReactSelect";
import {toast} from "react-toastify";
import {Modal} from "react-bootstrap";
import * as Yup from "yup";

function CreateWarehouse() {
    const [detailList, setDetailList] = useState([]);
    const [productSizes, setProductSizes] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const initValues = {}
    useEffect(() => {
        getSizeDetails()
    }, []);

    const getSizeDetails = async () => {
        let res = await getAllSizeDetail();
        setProductSizes(res);
    }
    const selectOptions = productSizes.map(item => ({
        value: JSON.stringify(item),
        label: `${item.product.productCode} - ${item.product.name} - ${item.sizes.name}`,
        key: item.id
    }));
    const handleSubmit = (values, {resetForm}) => {
        let data = JSON.parse(values.productWarehouse.value);
        let obj = {
            productCode: data.product.productCode,
            productName: data.product.name,
            sizeName: data.sizes.name,
            sizeDetailId: data.id,
            inputPrice: values.price,
            inputQuantity: values.quantity
        };
        const isProductExist = detailList.some(detail => detail.sizeDetailId === obj.sizeDetailId);

        if (!isProductExist) {
            setDetailList(detailList => [...detailList, obj]);
        } else {
            toast.error("Sản phẩm này đã có trong danh sách !");
        }
    };
    const handleDelete = (sizeDetailId) => {
        setDetailList(detailList.filter(detail => detail.sizeDetailId !== sizeDetailId));
    };
    const openModal = (product) => {
        setEditingProduct(product);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setEditingProduct(null);
    };
    const handleSubmitEdit = (values) => {
        let data = {
            ...editingProduct,
            ...values
        };
        setDetailList(detailList.map(item =>
            item.sizeDetailId === data.sizeDetailId ? data : item
        ));
        closeModal();
    };
    const formatterCurrency = (price) => {
        return price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    }
    const validationSchemaTable = Yup.object({
        quantity: Yup.number().required('Vui lòng nhập số lượng nhập').positive('Số lượng phải là số dương').integer('Số lượng phải là số nguyên !'),
        price: Yup.number().required('Vui lòng nhập giá nhập của sản phẩm').positive('Số lượng phải là số dương'),
    });

    const validationSchemaEdit = Yup.object({
        inputQuantity: Yup.number().required('Vui lòng nhập số lượng nhập').positive('Số lượng phải là số dương').integer('Số lượng phải là số nguyên !'),
        inputPrice: Yup.number().required('Vui lòng nhập giá nhập của sản phẩm').positive('Giá nhập phải là số dương'),
    });
    const insertToDatabase = async () => {
        let isUpdate = await importWarehouse(detailList);
        if (isUpdate) {
            toast.success("Nhập kho thành công !")
            setDetailList([])
        } else {
            toast.error("Nhập kho thất bại !")
        }
    };
    return (
        <>
            <div className="row">
                <div className="side-right bg-light">
                    <div className="form-control rounded-0 shadow p-3">
                        <div className="p-3">
                            <div className="text-center"><h2 className="fw-bold text-primary pt-3">PHIẾU NHẬP KHO</h2>
                            </div>
                            <div className="col-lg-12">
                                <Formik initialValues={initValues} onSubmit={(values,{resetForm}) => handleSubmit(values,{resetForm})} validationSchema={validationSchemaTable}>
                                    <Form>
                                        <div className="mb-3">
                                            <label htmlFor="productWarehouse" className="form-label">Chọn loại sản
                                                phẩm </label>
                                            <FormikReactSelect
                                                name="productWarehouse"
                                                options={selectOptions}
                                            />
                                            <ErrorMessage name="productWarehouse" className="text-danger" component="small"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="quantity" className="form-label">Số lượng nhập</label>
                                            <Field type="number" className="form-control" name="quantity"
                                                   id="quantity"/>
                                            <ErrorMessage name="quantity" className="text-danger" component="small"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="price" className="form-label">Đơn giá nhập</label>
                                            <Field type="number" className="form-control" name="price" id="price"/>
                                            <ErrorMessage name="price" className="text-danger" component="small"/>
                                        </div>
                                        <div className="mb-3">
                                            <button className="btn warehouse" type="submit"><i
                                                className="bi bi-plus-lg"></i><span> Thêm mới sản phẩm vào bảng</span>
                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                            <table className="table table-bordered table-hover">
                                <thead className="table-secondary">
                                <tr className="text-center">
                                    <th scope="col" className="col-1">STT</th>
                                    <th scope="col" className="col-1">Mã hàng</th>
                                    <th scope="col" className="col-4">Tên hàng</th>
                                    <th scope="col" className="col-1">Size</th>
                                    <th scope="col" className="col-1">Số lượng</th>
                                    <th scope="col" className="col-1">Giá nhập</th>
                                    <th scope="col" className="col-2">Thành tiền</th>
                                    <th scope="col" className="col-1">Hành động</th>
                                </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                {detailList.length === 0 ? (
                                    <tr>
                                        <td className="text-center" colSpan={"100%"}>Hiện chưa có dữ liệu nào cần thêm
                                        </td>
                                    </tr>
                                ) : (
                                    detailList.map((detail, index) => (
                                        <tr key={detail.id} className="text-center">
                                            <td>{index + 1}</td>
                                            <td>{detail.productCode}</td>
                                            <td>{detail.productName}</td>
                                            <td>{detail.sizeName}</td>
                                            <td>{detail.inputQuantity}</td>
                                            <td>{formatterCurrency(detail.inputPrice)}</td>
                                            <td>{formatterCurrency(detail.inputPrice * detail.inputQuantity)}</td>
                                            <td>
                                                <button className="btn btn-outline-danger btn-sm rounded-0 me-2"
                                                        onClick={() => handleDelete(detail.sizeDetailId)}><i
                                                    className="bi bi-trash"></i></button>
                                                <button className="btn btn-outline-secondary btn-sm rounded-0 me-2"
                                                        onClick={() => openModal(detail)}><i
                                                    className="bi bi-pencil-square"></i></button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                            {detailList.length !== 0 ? (
                                <div className="text-center">
                                    <button onClick={insertToDatabase} className="btn btn-outline-primary btn-sm rounded-0 ms-3">Nhập kho</button>
                                </div>
                                ) : ""
                            }
                            <Modal
                                className="modal-view-product content"
                                show={modalIsOpen}
                                onHide={closeModal}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered>
                                <Modal.Body>
                                    <Formik
                                        initialValues={{
                                            inputQuantity: editingProduct?.inputQuantity,
                                            inputPrice: editingProduct?.inputPrice
                                        }}
                                        onSubmit={(values, {setSubmitting}) => {
                                            setSubmitting(false);
                                            handleSubmitEdit(values)
                                        }}
                                        validationSchema={validationSchemaEdit}
                                    >
                                        {({isSubmitting}) => (
                                            <Form>
                                                <h3>Chỉnh sửa nhập hàng</h3>
                                                <p>Mặt
                                                    hàng {editingProduct?.productCode + " - " + editingProduct?.productName + " - " + editingProduct?.sizeName}</p>
                                                <div className="mb-3">
                                                    <label htmlFor="inputQuantity" className="form-label">Số lượng
                                                        nhập</label>
                                                    <Field type="number" className="form-control" name="inputQuantity"
                                                           id="inputQuantity"/>
                                                    <ErrorMessage name="inputQuantity" className="text-danger" component="small"/>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="inputPrice" className="form-label">Giá nhập</label>
                                                    <Field type="number" className="form-control" name="inputPrice"
                                                           id="inputPrice"/>
                                                    <ErrorMessage name="inputPrice" className="text-danger" component="small"/>
                                                </div>
                                                <button className="btn btn-outline-primary btn-sm rounded-0" type="submit" disabled={isSubmitting}>
                                                    Lưu Thay Đổi
                                                </button>
                                            </Form>
                                        )}
                                    </Formik>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateWarehouse;