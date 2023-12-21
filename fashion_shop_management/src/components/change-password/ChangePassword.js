import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {changePassword} from "../../services/AuthService";
import {useNavigate} from "react-router-dom";

function ChangePassword() {
    const [disableSubmit, setDisableSubmit] = useState(false);
    const navigate = useNavigate();
    const initValues = {
        password: "",
        passwordNew: "",
        passwordNewAgain: ""
    }

    const validateFormChangePassword = Yup.object({
        password: Yup.string()
            .required("Vui lòng nhập mật khẩu."),
        passwordNew: Yup.string()
            .required("Vui lòng nhập mật khẩu mới.")
            .min(8,"Mật khẩu mới phải trên 8 kí tự.")
            .max(100,"Mật khẩu mới không được quá 100 kí tự."),
        passwordNewAgain: Yup.string()
            .required("Vui lòng nhập lại mật khẩu mới.")
            .oneOf([Yup.ref('passwordNew'), null], 'Nhập lại mật khẩu mới không khớp.')
    });
    const handleSubmitFormChangePass = async (values, {setErrors}) => {
        try {
            setDisableSubmit(true);
            await changePassword(values);
            localStorage.removeItem("user");
            navigate("/")
            toast.success("Đổi mật khẩu thành công, vui lòng đăng nhập lại để tiếp tục!")
        } catch (e) {
            setDisableSubmit(false);
            setErrors(e.data);
        }
    };
    return (
        <>
            <section id="change-password" className="shadow">
                <div className="row">
                    <div className="col-lg-12">
                        <Formik initialValues={initValues} onSubmit={(values, { setErrors }) => handleSubmitFormChangePass(values, {setErrors})} validationSchema={validateFormChangePassword}>
                            <div className="input-pass">
                                <h2 className="mb-4 text-primary fw-bold pt-3 text-center">ĐỔI MẬT KHẨU</h2>
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
                                    <div className="text-center">
                                        <button disabled={disableSubmit} type="submit" className="btn btn-outline-primary rounded-0">Cập nhật</button>
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