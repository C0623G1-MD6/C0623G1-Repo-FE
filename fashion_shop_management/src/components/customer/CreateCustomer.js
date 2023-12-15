import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {createCustomerService} from "../../services/customer/customerService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import * as Yup from "yup";

function CreateCustomer() {
    const navigate = useNavigate();

    const createCustomer = async (values, setErrors) => {
        try {
            const res = await createCustomerService(values)
            if (res.status === 200) {
                navigate("/customer")
                toast(" Create Successfully")
            } else if (res.status === 201)
                toast(" Create failed")
                setErrors(res.data)

        } catch (e) {
            alert("Error")
        }
    }

    const initialValue = {
        "customerCode": "",
        "name": "",
        "gender": true,
        "birthday": "",
        "phone": "",
        "point": 0,
        "email": "",
        "address": "",
        "isDeleted": 0,
        "customerTypeId": 1,
    }

    const dd = new Date();
    const date10 = `${dd.getFullYear() - 10}-${dd.getMonth() + 1}-${dd.getDate()}`;
    const date100 = `${dd.getFullYear() - 100}-${dd.getMonth() + 1}-${dd.getDate()}`;

    const customerValidate = {
        customerCode: Yup.string()
            .required()
            .matches(/^KH-\d{3}$/, "Không đúng định dạng, ex: KH-001"),
        name: Yup.string()
            .required()
            .matches(/^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$/, "Không đúng định dạng hoặc chứa kí tự đặc biệt"),
        phone: Yup.string()
            .required()
            .matches(/^0[0-9]{9}$/, "SĐT bào gồm 10 số ex:012312312"),
        email: Yup.string()
            .required()
            .matches(/^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/, "Không đúng định dạng hoặc chứa kí tự đặc biệt"),
        address: Yup.string()
            .required(),
        birthday: Yup.date()
            .required()
            .max(date10, "Vui lòng nhập lớn hơn 10 tuổi")
            .min(date100, "Vui lòng nhập bé hơn 100 tuổi")
    }
    return (
        <>
            <Formik initialValues={initialValue} onSubmit={(values, {setErrors}) => {
                createCustomer(values, setErrors)
            }} validationSchema={Yup.object(customerValidate)}>
                <div className="col-lg-10">
                    <div
                        className="d-flex justify-content-center bg-light pb-3 p-5"
                        style={{padding: 0}}
                    >
                        <div className="col-7">
                            <div className="form-control rounded-0 p-3 shadow">
                                <h2
                                    className="text-primary fw-bold text-center pt-3"
                                    style={{fontFamily: "Helvetica Neue,sans-serif"}}
                                >
                                    Thêm mới khách hàng
                                </h2>
                                <Form className="thienlch-form">
                                    <div className="thienlch-group">
                                        <Field
                                            type="text"
                                            id="code"
                                            name="customerCode"
                                            required=""
                                        />
                                        <label htmlFor="code">Mã khách hàng<span style={{color: "red"}}>*</span></label>
                                        <ErrorMessage className="text text-danger" name="customerCode"
                                                      component="div"></ErrorMessage>
                                    </div>
                                    <div className="thienlch-group">
                                        <Field
                                            type="text"
                                            id="name"
                                            name="name"
                                            required=""
                                        />
                                        <label htmlFor="name">Họ và tên<span style={{color: "red"}}>*</span></label>
                                        <ErrorMessage className="text text-danger" name="name"
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
                                                value="false"
                                                name="gender"
                                                data-sb-validations="required"
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
                                                value="true"
                                                name="gender"
                                                data-sb-validations="required"
                                            />
                                            <label className="form-check-label" htmlFor="nữ">
                                                Nữ
                                            </label>
                                        </div>
                                    </div>
                                    <div className="thienlch-group">
                                        <Field
                                            type="date"
                                            id="birthday"
                                            name="birthday"
                                            required=""
                                        />
                                        <label htmlFor="birthday">Ngày sinh</label>
                                        <ErrorMessage className="text text-danger" name="birthday"
                                                      component="div"></ErrorMessage>

                                    </div>
                                    <div className="thienlch-group">
                                        <Field
                                            type="text"
                                            id="address"
                                            name="address"
                                            required=""
                                        />
                                        <label htmlFor="address">Địa chỉ</label>
                                        <ErrorMessage className="text text-danger" name="address"
                                                      component="div"></ErrorMessage>
                                    </div>
                                    <div className="thienlch-group">
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            required=""
                                        />
                                        <label htmlFor="email">Email</label>
                                        <ErrorMessage className="text text-danger" name="email"
                                                      component="div"></ErrorMessage>
                                    </div>
                                    <div className="thienlch-group">
                                        <Field
                                            id="phone"
                                            name="phone"
                                            required=""
                                        />
                                        <label htmlFor="phone">Số điện thoại</label>
                                        <ErrorMessage className="text text-danger" name="phone"
                                                      component="div"></ErrorMessage>
                                    </div>
                                    <div className="thienlch-group d-flex me-5 justify-content-center">
                                        <NavLink
                                            to={"/customer/list"}>
                                            <button className="btn btn-outline-secondary rounded-0 btn-sm me-3">Hủy
                                            </button>
                                        </NavLink>
                                        <button type="submit"
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

export default CreateCustomer;