import React, {useEffect, useState} from 'react';
import {
    editCustomerService, getCustomerByIdService,
    getCustomerTypeListService,
} from "../../services/customer/customerService";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import "./thienLCHFrom.css"

function EditCustomer() {
    const [typeList, setTypeList] = useState([])
    const [customer, setCustomer] = useState()
    const navigate = useNavigate();
    const {id} = useParams();

    const getList = async () => {
        try {
            const res = await getCustomerTypeListService()
            setTypeList(res)
        } catch (e) {
            alert("Error")
        }
    }

    const getCustomer = async (id) => {
        try {
            if (id) {
                const res = await getCustomerByIdService(id)
                setCustomer(res)
            }
        } catch (e) {
            alert("Error")
        }
    }

    const editCustomer = async (data, setErrors) => {
        try {
            console.log(data)
            const res = await editCustomerService(data)
            console.log(res)
            if (res.status === 200) {
                navigate("/customer/list");
                toast("Edit Successfully")
            } else if (res.status === 201) {
                toast(" Edit failed")
                setErrors(res.data)
            }
        } catch (e) {
            alert("Error")
        }
    }

    useEffect(() => {
        id && getCustomer(id)
        getList()
    }, [id]);
    if (!customer) {
        return null
    }

    const initialValue = {
        "id": customer.id,
        "customerCode": customer.customerCode,
        "name": customer && customer.name,
        "gender": !!(customer && customer.gender === "true"),
        "birthday": customer && customer.birthday,
        "phone": customer && customer.phone,
        "point": customer && customer.point,
        "email": customer && customer.email,
        "address": customer && customer.address,
        "isDeleted": customer && customer.idDeleted,
        "customerTypeId": customer && customer.customerType.id,
    }
    const dd = new Date();
    const date10 = `${dd.getFullYear() - 10}-${dd.getMonth() + 1}-${dd.getDate()}`;
    const date100 = `${dd.getFullYear() - 100}-${dd.getMonth() + 1}-${dd.getDate()}`;

    const customerValidate = {
        customerCode: Yup.string()
            .required("vui lòng nhập.")
            .matches(/^KH-\d{4}$/, "Không đúng định dạng, ex: KH-0001."),
        name: Yup.string()
            .required("vui lòng nhập.")
            .matches(/^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$/, "Chứa kí tự đặc biệt, hoặc số."),
        phone: Yup.string()
            .required("vui lòng nhập.")
            .matches(/^0[0-9]{9}$/, "SĐT bào gồm 10 số ex:012312312."),
        email: Yup.string()
            .required("vui lòng nhập.")
            .matches(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/, "Không đúng định dạng hoặc chứa kí tự đặc biệt."),
        address: Yup.string()
            .required("vui lòng nhập."),
        birthday: Yup.date()
            .required("vui lòng nhập.")
            .max(date10, "Vui lòng nhập lớn hơn 10 tuổi.")
            .min(date100, "Vui lòng nhập bé hơn 100 tuổi."),
        gender: Yup.string()
            .required("vui lòng chọn giới tính.")
    }

    return (
        <>
            <Formik initialValues={initialValue} onSubmit={(values, {setErrors}) => {
                editCustomer(values, setErrors)
            }} validationSchema={Yup.object(customerValidate)}>
                <div className="col-lg-12">
                    <div
                        className="d-flex justify-content-center bg-light pb-3 pt-5"
                        style={{padding: 0}}
                    >
                        <div className="col-7">
                            <div className="form-control shadow rounded-0 p-3">
                                <h2
                                    className="text-primary fw-bold text-center"
                                >
                                    Chỉnh sửa khách hàng
                                </h2>
                                <Form className="thienlch-form">
                                    <div className="thienlch-group">
                                        <Field
                                            type="text"
                                            id="code"
                                            name="customerCode"
                                            disabled
                                        />
                                        <label htmlFor="code">Mã khách hàng<span style={{color: "red"}}>*</span></label>
                                    </div>
                                    <div className="thienlch-group">
                                        <Field name="name"
                                               type="text"
                                               id="name"
                                        />
                                        <label htmlFor="name">Họ và tên<span style={{color: "red"}}>*</span></label>
                                        <ErrorMessage className="thienlch-error text text-danger" name="name"
                                                      component="div"></ErrorMessage>
                                    </div>
                                    <label htmlFor="gender" className="form-label">
                                        Giới tính
                                    </label>
                                    <div className="mb-3">
                                        <div className="form-check form-check-inline" id="gender">
                                            <Field
                                                className="form-check-input "
                                                id="nam"
                                                type="radio"
                                                name="gender"
                                                value={false}
                                                data-sb-validations="required"
                                                checked={customer.gender === false}
                                            />
                                            <label className="form-check-label" htmlFor="nam">
                                                Nam
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <Field
                                                className="form-check-input"
                                                id="nữ"
                                                type="radio"
                                                value={true}
                                                name="gender"
                                                data-sb-validations="required"
                                                checked={customer.gender === true}
                                            />
                                            <label className="form-check-label" htmlFor="nữ">
                                                Nữ
                                            </label>
                                        </div>
                                    </div>
                                    <ErrorMessage className="text text-danger" name="gender"
                                                  component="div"></ErrorMessage>
                                    <div className="thienlch-group">
                                        <Field type="date" id="birthday" name="birthday" required=""/>
                                        <label htmlFor="birthday">Ngày sinh</label>
                                        <ErrorMessage className="thienlch-error text text-danger" name="birthday"
                                                      component="div"></ErrorMessage>
                                    </div>
                                    <div className="thienlch-group">
                                        <Field name="address"
                                               type="text"
                                               id="address"
                                               required=""
                                        />
                                        <label htmlFor="address">Địa chỉ</label>
                                        <ErrorMessage className="thienlch-error text text-danger" name="address"
                                                      component="div"></ErrorMessage>
                                    </div>
                                    <div className="thienlch-group">
                                        <Field name="email"
                                               type="email"
                                               id="email"
                                               required=""
                                        />
                                        <label htmlFor="email">Email<span style={{color: "red"}}>*</span></label>
                                        <ErrorMessage className="thienlch-error text text-danger" name="email"
                                                      component="div"></ErrorMessage>
                                    </div>
                                    <div className="thienlch-group">
                                        <Field name="phone"
                                               id="phone"
                                               required=""
                                        />
                                        <label htmlFor="phone">Số điện thoại<span
                                            style={{color: "red"}}>*</span></label>
                                        <ErrorMessage className="thienlch-error text text-danger" name="phone"
                                                      component="div"></ErrorMessage>
                                    </div>
                                    <div className="thienlch-group d-flex me-5 justify-content-center">
                                        <NavLink to={"/customer/list"}>
                                            <button className="btn btn-outline-secondary rounded-0 btn-sm me-3">Hủy
                                            </button>
                                        </NavLink>
                                        <button
                                            type='submit'
                                            className="btn btn-outline-primary rounded-0 btn-sm">
                                            Xác nhận
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Formik>
        </>
    );
}

export default EditCustomer;