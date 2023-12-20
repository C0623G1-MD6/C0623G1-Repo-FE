import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {recoverPassword} from "../../services/AuthService";
import * as Yup from "yup";
import {toast} from "react-toastify";
import {Spinner} from "react-bootstrap";
import {BarLoader} from "react-spinners";

function RecoverPassword(props) {
    const [isLoading, setIsLoading] = useState(false);
    const initValue = {
        emailRecover: ""
    }
    const validateRecoverPass = Yup.object({
        emailRecover: Yup.string()
            .required("Trường email buộc nhập !")
            .email("Bạn phải nhập đúng định dạng email")
    });
    const handleSubmitFormRecover = async (values, {setFieldError}) => {
        setIsLoading(true); // Bắt đầu loading
        let res;
        try {
            res = await recoverPassword(values.emailRecover);
            console.log(res);
        } catch (e) {
            setFieldError('emailRecover', e.data);
        } finally {
            setIsLoading(false); // Kết thúc loading
            toast.success(res);
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
        <section id="recover-password">
            <div className="container">
                <div className="row">
                    <div
                        className="col-lg-6 col-sm-12 d-flex align-items-center justify-content-center mb-md-4">
                        <div className="content w-75">
                            <a role="button" onClick={props.onClick}><i className="bi bi-arrow-return-left"></i> Quay
                                lại
                                trang
                                đăng nhập</a>
                            <h3 className="mt-5">Bạn quên mật khẩu ?</h3>
                            <p>Vui lòng nhập email liên kết với tài khoản để lấy lại mật khẩu</p>
                            <Formik initialValues={initValue} onSubmit={handleSubmitFormRecover}
                                    validationSchema={validateRecoverPass}>
                                <Form>
                                    <div className="mb-3">
                                        <label htmlFor="emailRecover" className="form-label">Email liên kết tài
                                            khoản</label>
                                        <Field type="email" className="form-control" name="emailRecover"
                                               placeholder="example@gmail.com" id="emailRecover"/>
                                        <ErrorMessage name="emailRecover" className="text-danger"
                                                      component="p"/>
                                    </div>
                                    {loading()}
                                    <button disabled={isLoading} type="submit"
                                            className="btn btn-primary">Lấy lại mật khẩu
                                    </button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                    <div className="col-lg-6 img-login">
                        <img src="/images/computer-security-with-login-password-padlock.jpg" width={"100%"}/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RecoverPassword;