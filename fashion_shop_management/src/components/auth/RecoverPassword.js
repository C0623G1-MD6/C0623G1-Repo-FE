import React from 'react';
import {Field, Form, Formik} from "formik";
import {recoverPassword} from "../../services/AuthService";

function RecoverPassword(props) {
    const initValue =  {
        emailRecover: ""
    }
    const handleSubmitFormRecover = async (values) => {
        try {
            let res = await recoverPassword(values);
            console.log(res);
        } catch (e) {
            console.log(e)
        }
    };
    return (
        <section id="recover-password">
            <div className="container">
                <div className="row">
                    <div
                        className="col-lg-6 col-sm-12 d-flex align-items-center justify-content-center mb-md-4">
                        <div className="content w-75">
                            <a role="button" onClick={props.onClick}><i class="bi bi-arrow-return-left"></i> Quay lại
                                trang
                                đăng nhập</a>
                            <h3 className="mt-5">Bạn quên mật khẩu ?</h3>
                            <p>Vui lòng nhập email liên kết với tài khoản để lấy lại mật khẩu</p>
                            <Formik initialValues={initValue} onSubmit={(values) => handleSubmitFormRecover(values)}>
                                <Form>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Email đăng kí tài khoản</label>
                                        <Field type="email" className="form-control" name="emailRecover"
                                               placeholder="username@gmail.com"/>
                                    </div>
                                    <button type="submit"
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