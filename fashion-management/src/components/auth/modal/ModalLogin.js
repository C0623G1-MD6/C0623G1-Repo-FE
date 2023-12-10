import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {loginUser} from "../../../redux/middlewares/AuthMiddleware";
import {useDispatch} from "react-redux";

function ModalLogin() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const initValues = {
        username: "",
        password: ""
    }

    const validateFormLogin = Yup.object({
        username: Yup.string()
            .required("Trường username buộc nhập !")
            .matches(/^[a-zA-Z0-9_]+$/, "Tên đăng nhập chỉ được chứa ký tự alphabet, số và dấu gạch dưới."),
        password: Yup.string()
            .required("Trường password buộc nhập !")
            .matches(/^[a-zA-Z0-9_]+$/, "Mật khẩu chỉ được chứa ký tự alphabet, số và dấu gạch dưới."),
    });

    const handleSubmitFormLogin = async (values, {setErrors}) => {
        try {
            await dispatch(loginUser(values));
            handleClose();
            navigate("/dashboard")
            toast.success("Đăng nhập thành công !");
        } catch (e) {
            setErrors(e.data);
        }
    }
    if (user !== null) {
        return <><Link to="/dashboard" className="btn btn-primary">Dashboard</Link> </>
    }

    return (
        <>

            <Button onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} fill="currentColor"
                     className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fillRule="evenodd"
                          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
            </Button>
            <Modal
                id="modalLogin"
                show={show} onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <Modal.Header className="modal-login" closeButton/>
                    <section id="login">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 d-flex align-items-center justify-content-center">
                                    <div className="content w-75">
                                        <h2>Xin chào,</h2>
                                        <Formik initialValues={initValues}
                                                onSubmit={(values, {setErrors}) => handleSubmitFormLogin(values, {setErrors})}
                                                validationSchema={validateFormLogin}>
                                            <Form>
                                                <div className="mb-3">
                                                    <label htmlFor="username" className="form-label">Tên đăng
                                                        nhập</label>
                                                    <Field type="text" className="form-control" name="username"
                                                           id="username"/>
                                                    <ErrorMessage name="username" className="text-danger"
                                                                  component="p"/>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="password" className="form-label">Mật
                                                        khẩu</label>
                                                    <Field type="password" className="form-control" name="password"
                                                           id="password"/>
                                                    <ErrorMessage name="password" className="text-danger"
                                                                  component="p"/>
                                                </div>
                                                <div className="mb-3 form-check d-flex justify-content-between">
                                                    <div>
                                                        <Field type="checkbox" className="form-check-input"
                                                               id="exampleCheck1"/>
                                                        <p className="recover-pass">Lưu thông tin</p>
                                                    </div>
                                                    <div>
                                                        <p className="recover-pass">Bạn quên mật khẩu?</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button type="submit" className="btn btn-primary">Đăng nhập
                                                    </button>
                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                </div>
                                <div className="col-lg-6 img-login">
                                    <img src="/images/58f77ef98fd15db294aa17d304917b95.jpg"/>
                                </div>
                            </div>
                        </div>
                    </section>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalLogin;