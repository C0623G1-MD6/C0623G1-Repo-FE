import React, {useEffect, useState} from 'react';
import {
    CreateCustomerService,
    GetCustomerByIdService,
    GetCustomerTypeListService
} from "../../services/customerService/CustomerService";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {date} from "yup";

function EditCustomer() {
    const [typeList, setTypeList] = useState([])
    const [customer, setCustomer] = useState()
    const navigate = useNavigate();
    // const {id} = useParams();
    const id = 1;
    const getList = async () => {
        try {
            const res = await GetCustomerTypeListService
            setTypeList(res)
        } catch (e) {
            alert("Error")
        }
    }

    const getCustomer = async () => {
        try {
            const res = await GetCustomerByIdService(id)
            setCustomer(res)
            console.log(res)
        } catch (e) {
            alert("Error")
        }
    }

    const editCustomer = async (data) => {
        try {
            const res = await EditCustomer(data)
            if (res.status === 200) {
                navigate("/customer");
                toast("Edit Successfully")
            } else toast("Edit failed")
        } catch (e) {
            alert("Error")
        }
    }

    useEffect(() => {
        getList()
        getCustomer()
    }, [id]);

    const initialValue = {
        "id": customer.id,
        "customerCode": customer.customerCode,
        "name": customer.name,
        "gender": customer.gender,
        "birthday": customer.birthday,
        "phone": customer.phone,
        "point": customer.point,
        "email": customer.email,
        "address": customer.address,
        "isDeleted": customer.idDeleted,
        "customerTypeId": customer.customerType.id,
    }

    const customerValidation = {}
    if (!customer) {
        return null
    }
    return (
        <>
            <Formik initialValues={initialValue} onSubmit={(values) => {
                editCustomer(values)
            }}>
                <div className="col-lg-10">
                    <div
                        className="d-flex justify-content-center bg-light pb-3 pt-5"
                        style={{padding: 0}}
                    >
                        <div className="col-7">
                            <div className="form-control shadow rounded-0 p-3">
                                <h2
                                    className="text-primary fw-bold text-center"
                                    style={{fontFamily: "Helvetica Neue,sans-serif"}}
                                >
                                    Chỉnh sửa khách hàng
                                </h2>
                                <Form className="thienlch-form">
                                    <div className="thienlch-group">
                                        <Field
                                            type="text"
                                            id="code"
                                            name="customerCode"
                                            readOnly=""
                                        />
                                        <label htmlFor="code">Mã khách hàng<span style={{color: "red"}}>*</span></label>
                                    </div>
                                    <div className="thienlch-group">
                                        <Field name="name"
                                               type="text"
                                               id="name"
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
                                                name="gender"
                                                value="false"
                                                data-sb-validations="required"
                                                defaultChecked=""
                                            />
                                            <label className="form-check-label" htmlFor="nam">
                                                Nam
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <Field
                                                className="form-check-input"
                                                id="nữ"
                                                as="radio"
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
                                        <Field as="date" type="date" id="birthday" name="birthday" required=""/>
                                        <label htmlFor="birthday">Ngày sinh</label>
                                        <ErrorMessage className="text text-danger" name="birthday"
                                                      component="div"></ErrorMessage>
                                    </div>
                                    <div className="thienlch-group">
                                        <Field name="address"
                                               type="text"
                                               id="address"
                                               required=""
                                        />
                                        <label htmlFor="address">Địa chỉ</label>
                                        <ErrorMessage className="text text-danger" name="address"
                                                      component="div"></ErrorMessage>
                                    </div>
                                    <div className="row d-flex">
                                        <div className="thienlch-group col-6">
                                            <Field name="email"
                                                   type="email"
                                                   id="email"
                                                   required=""
                                            />
                                            <label htmlFor="email">Email<span style={{color: "red"}}>*</span></label>
                                            <ErrorMessage className="text text-danger" name="email"
                                                          component="div"></ErrorMessage>
                                        </div>
                                        <div className="thienlch-group col-6">
                                            <Field name="phone"
                                                   as="number"
                                                   id="phone"
                                                   required=""
                                            />
                                            <label htmlFor="phone">Số điện thoại<span
                                                style={{color: "red"}}>*</span></label>
                                            <ErrorMessage className="text text-danger" name="phone"
                                                          component="div"></ErrorMessage>
                                        </div>
                                    </div>
                                    <div className="row d-flex">
                                        <div className="thienlch-group col-6">
                                            <Field name="point"
                                                   as="number"
                                                   id="score"
                                            />
                                            <label htmlFor="score">Điểm</label>
                                            <ErrorMessage className="text text-danger" name="point"
                                                          component="div"></ErrorMessage>
                                        </div>
                                        <div className="thienlch-group col-6">
                                            <Field as="select" name="level"
                                                   id="level"
                                                   className="form-control"
                                                   style={{height: 46}}>
                                                <option value="">---Chọn---</option>
                                                {typeList.map(types => (
                                                    <option key={types.id} value={types.id}>{types.name}</option>
                                                ))}
                                            </Field>
                                            <label htmlFor="level">Cấp Bậc</label>
                                            <ErrorMessage className="text text-danger" name="level"
                                                          component="div"></ErrorMessage>
                                        </div>
                                    </div>
                                    <div className="thienlch-group d-flex me-5 justify-content-center">
                                        <NavLink to={"/customer"}>
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