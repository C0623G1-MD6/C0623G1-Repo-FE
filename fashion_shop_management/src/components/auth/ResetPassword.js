import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {resetPassword, savePasswordNew} from "../../services/AuthService";
import AccessDenied from "./AccessDenied";
import ErrorRecover from "./ErrorRecover";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {BarLoader} from "react-spinners";

function ResetPassword() {
    const {token} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [checkToken, setCheckToken] = useState();
    const initValues = {
        passwordNew: "",
        passwordNewAgain: ""
    }

    const validateFormResetPassword = Yup.object({
        passwordNew: Yup.string()
            .required("Vui lòng nhập mật khẩu mới.")
            .min(8, "Mật khẩu mới phải trên 8 kí tự.")
            .max(100, "Mật khẩu mới không được quá 100 kí tự."),
        passwordNewAgain: Yup.string()
            .required("Vui lòng nhập lại mật khẩu mới.")
            .oneOf([Yup.ref('passwordNew'), null], 'Nhập lại mật khẩu mới không khớp.')
    });
    useEffect(() => {
        checkValidToken()
    }, []);
    const checkValidToken = async () => {
        let isBoolean = await resetPassword(token);
        setCheckToken(isBoolean);
    };
    if (checkToken == undefined) {
        return
    } else if (!checkToken) {
        return <ErrorRecover/>
    }
    const handleSubmitForm = async (values) => {
        setIsLoading(true); // Bắt đầu loading
        let isBoolean = await savePasswordNew(token, values);
        if (isBoolean) {
            toast.success("Đặt lại mật khẩu thành công, Bạn có thể đăng nhập lại bằng mật khẩu mới !")
            navigate("/");
            setIsLoading(false);
        } else {
            toast.error("Link đặt lại mật khẩu đã hết hạn !")
            navigate(`/resetPassword/${token}`);
            setIsLoading(false);
        }
    };

    const loading = () => {
        if (isLoading) {
            return (
                <>
                    <div>
                        <BarLoader color="#36d7b7" width={"100%"}/>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <section id="login">
                <div className="container">
                    <div className="row content">
                        <div
                            className="col-lg-6 col-sm-12 d-flex align-items-center justify-content-center mb-md-4">
                            <div className="content w-75">
                                <h2>Đặt lại mật khẩu</h2>
                                <p>Vui lòng nhập mật khẩu mà bạn muốn thay đổi</p>
                                <Formik initialValues={initValues}
                                        onSubmit={(values) => handleSubmitForm(values)}
                                        validationSchema={validateFormResetPassword}
                                >
                                    <Form>
                                        <div className="mb-3">
                                            <label htmlFor="passwordNew" className="form-label">Mật khẩu mới</label>
                                            <Field type="password" className="form-control" name="passwordNew"
                                                   id="passwordNew"/>
                                            <ErrorMessage name="passwordNew" className="text-danger" component="p"/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="passwordNewAgain" className="form-label">Nhập lại mật khẩu
                                                mới</label>
                                            <Field type="password" className="form-control" id="passwordNewAgain"
                                                   name="passwordNewAgain"/>
                                            <ErrorMessage name="passwordNewAgain" className="text-danger"
                                                          component="p"/>
                                        </div>
                                        <div>
                                            {loading()}
                                            <button type="submit" disabled={isLoading} className="btn btn-primary">Xác nhận
                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                        <div className="col-lg-6 img-login">
                            <img src="/images/3807931.jpg"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ResetPassword;