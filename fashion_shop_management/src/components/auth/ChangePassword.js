import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {changePassword} from "../../services/AuthService";

function ChangePassword() {
    const user = JSON.parse(localStorage.getItem('user'));
    const initValues = {
        username: user.username.toString(),
        password: "",
        passwordNew: "",
        passwordNewAgain: ""
    }

    const validateFormChangePassword = Yup.object({
        password: Yup.string()
            .required("Trường password bắt buộc nhập !")
            .matches(/^[a-zA-Z0-9_]+$/, "Chỉ được chứa ký tự alphabet, số và dấu gạch dưới."),
        passwordNew: Yup.string()
            .required("Trường mật khẩu mới bắt buộc nhập !")
            .matches(/^[a-zA-Z0-9_]+$/, "Chỉ được chứa ký tự alphabet, số và dấu gạch dưới.")
            .min(8,"Mật khẩu mới phải trên 8 kí tự")
            .max(100,"Mật khẩu không được quá 100 kí tự"),
        passwordNewAgain: Yup.string()
            .required("Trường nhập lại mật khẩu mới bắt buộc nhập !")
            .matches(/^[a-zA-Z0-9_]+$/, "Chỉ được chứa ký tự alphabet, số và dấu gạch dưới.")
            .oneOf([Yup.ref('passwordNew'), null], 'Mật khẩu nhập lại không khớp.')
    });
    const handleSubmitFormChangePass = async (values, {setErrors}) => {
        try {
            await changePassword(values);
            toast.success("Đổi mật khẩu thành công !")
        } catch (e) {
            setErrors(e.data);
        }
    };
    return (
        <>
            <section id="change-password">
                <div className="row my-5">
                    <div className="col-lg-12">
                        <Formik initialValues={initValues} onSubmit={(values, { setErrors }) => handleSubmitFormChangePass(values, {setErrors})} validationSchema={validateFormChangePassword}>
                            <div className="input-pass">
                                <Form>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Mật khẩu cũ</label>
                                        <Field type="password" className="form-control" name="password" id="password" />
                                        <ErrorMessage name="password" className="text-danger" component="p"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="passwordNew" className="form-label">Mật khẩu mới</label>
                                        <Field type="password" className="form-control" name="passwordNew" id="passwordNew"/>
                                        <ErrorMessage name="passwordNew" className="text-danger" component="p"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="passwordNewAgain" className="form-label">Nhập lại mật khẩu mới</label>
                                        <Field type="password" className="form-control" id="passwordNewAgain" name="passwordNewAgain"/>
                                        <ErrorMessage name="passwordNewAgain" className="text-danger" component="p"/>
                                    </div>
                                    <div className="btn-submit">
                                        <button type="submit" className="btn">Cập nhật</button>
                                    </div>
                                </Form>
                            </div>
                        </Formik>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ChangePassword;