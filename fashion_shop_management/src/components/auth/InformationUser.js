import React, {useEffect, useState} from 'react';
import {NotFound} from "../NotFound";
import {getInfoByIdAccount, updateInfoEmployee} from "../../redux/middlewares/EmployeeMiddleware";
import {useDispatch, useSelector} from "react-redux";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";

function InformationUser() {
    const [roleUser, setRoleUser] = useState("");
    const user = JSON.parse(localStorage.getItem('user'));
    const employee = useSelector((store) => store.employee);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            getInfoEmployee();
        } else {
            return <NotFound/>
        }
    }, []);
    const getInfoEmployee = async () => {
        await dispatch(getInfoByIdAccount(user.id));
    };
    const validationSchema = Yup.object({
        address: Yup.string()
            .required('Vui lòng nhập địa chỉ.')
            .max(100, 'Địa chỉ không được quá 100 ký tự'),
        birthday: Yup.date()
            .required('Vui lòng nhập ngày sinh.')
            .max(new Date(), 'Không được lớn hơn ngày hiện tại'),
        email: Yup.string()
            .email('Email không hợp lệ.')
            .required('Vui lòng nhập email.'),
        name: Yup.string()
            .required('Vui lòng nhập tên.')
            .min(2, 'Tên phải có ít nhất 2 ký tự.')
            .max(50, 'Tên không được quá 50 ký tự.'),
        phone: Yup.string()
            .required('Vui lòng nhập số điện thoại.')
            .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ.'),
    });
    const role = [...user.roles];
    useEffect(() => {
        setRole();
    }, [role]);
    const setRole = () => {
        switch (role[0]) {
            case "ROLE_MANAGER":
                setRoleUser("Quản lý cửa hàng");
                break;
            case "ROLE_WAREHOUSE":
                setRoleUser("Quản lý kho hàng");
                break;
            case "ROLE_SALES":
                setRoleUser("Nhân viên bán hàng");
                break;
            default:
                setRoleUser("Nhân viên");
                break;
        }
    }
    const handleSubmitForm = async (values) => {
        if (JSON.stringify(values) === JSON.stringify(employee)) {
            toast.error("Bạn chưa thay đổi dữ liệu nào !")
        } else {
            let res = await dispatch(updateInfoEmployee(values));
            if (res) {
                toast.success("Cập nhật thành công !")
            } else {
                toast.success("Cập nhật thất bại !")
            }
        }
    };
    return (
        <>
            <section id="information">
                <div className="row my-2">
                    <div className="col-lg-12">
                        <div className="content">
                            <Formik
                                initialValues={{...employee}}
                                enableReinitialize
                                onSubmit={(values) => handleSubmitForm(values)}
                                validationSchema={validationSchema}
                            >
                                {({dirty }) => (
                                    <Form>
                                    <div className="row">
                                        <div className="col-lg-6 col-sm-12 box-avatar">
                                            <div className="avatar">
                                                <img src="/images/Default_pfp.svg.png" alt="Avatar User" width={100}/>
                                                <h4>Thông tin nhân viên</h4>
                                                <p>Thông tin cá nhân của {employee.name}</p>
                                                <h3>Chức vụ: {roleUser}</h3>
                                                <p>Mã nhân viên: {employee.employeeCode}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-sm-12">
                                            <div className="content-information">
                                                <div>
                                                    <div className="mb-3">
                                                        <label htmlFor="name" className="form-label">Tên nhân
                                                            viên</label>
                                                        <Field name="name" type="text" className="form-control"
                                                               id="name"/>
                                                        <ErrorMessage name="name" className="text-danger" component="p"/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="birthday" className="form-label">Ngày
                                                            sinh</label>
                                                        <Field type="date" className="form-control"
                                                               name="birthday"/>
                                                        <ErrorMessage name="birthday" className="text-danger" component="p"/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="address" className="form-label">Địa chỉ</label>
                                                        <Field type="text" className="form-control" id="address"
                                                               name="address"/>
                                                        <ErrorMessage name="address" className="text-danger" component="p"/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="phone" className="form-label">Số điện
                                                            thoại</label>
                                                        <Field type="text" className="form-control"
                                                               name="phone"/>
                                                        <ErrorMessage name="phone" className="text-danger" component="p"/>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="phone" className="form-label">Địa chỉ
                                                            email</label>
                                                        <Field type="email" className="form-control" name="email"/>
                                                        <ErrorMessage name="email" className="text-danger" component="p"/>
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="submit" className="btn btn-submit" disabled={!dirty}>Cập nhật</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
        ;
}

export default InformationUser;