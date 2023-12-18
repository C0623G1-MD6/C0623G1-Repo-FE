import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {createNotification, getAllRole} from '../../services/notification/notificationService';
import {toast} from 'react-toastify';
import '../notification/form_css.css';

export function CreateNotification() {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState('');

    const [role, setRole] = useState([]);

    useEffect(() => {
        setCurrentDate(getCurrentDate());
        displayRole()
    }, []);

    const add = async (values, {resetForm}) => {
        await createNotification({...values, roleId: role});
        toast('Thêm mới thành công');
        resetForm();
    };
    const displayRole = async () => {
        const res = await getAllRole();
        setRole(res);
    };

    const handleChangeRole = (event) => {
        const selectedRoles = Array.from(event.target.selectedOptions, (option) => JSON.parse(option.value));
        setRole(selectedRoles);
    };

    function getCurrentDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        return day + '/' + month + '/' + year;
    }

    function renderRole(role) {
        if (role === "ROLE_SALES") {
            return <>Nhân viên bán hàng</>
        } else if (role === "ROLE_WAREHOUSE") {
            return <>Quản lý kho</>
        } else if (role === "ROLE_MANAGER") {
            return <>Quản lý cửa hàng</>
        }
    }
    return (
        <>
            <Formik
                initialValues={{
                    noticePostingDate: currentDate,
                    title: '',
                    content: '',
                    inlineRadioOptions: '',
                }}
                onSubmit={add}
            >
                {({resetForm}) => (
                    <>
                        <div className="create-noti">
                            <Form>
                                <h3 className="mb-4">Đăng thông báo</h3>
                                <div className="mb-3">
                                    <label htmlFor="noticePostingDate" className="form-label">Ngày đăng</label>
                                    <Field type="text" className="form-control" name="noticePostingDate"
                                           id="noticePostingDate" value={currentDate} readOnly/>
                                    <ErrorMessage name="noticePostingDate" className="text-danger" component="p"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Tiêu đề</label>
                                    <Field type="text" className="form-control" id="title" name="title"/>
                                    <ErrorMessage name="title" className="text-danger" component="p"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">Nội dung thông báo</label>
                                    <Field as="textarea" rows="10" className="form-control" name="content" id="passwordNew"/>
                                    <ErrorMessage name="content" className="text-danger" component="p"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">Đối tượng nhận thông báo</label>
                                    <Field className="form-select" as="select" name="role">
                                        {
                                            role.map((r) => (
                                                <option key={r.id} value={JSON.stringify(r)}>{renderRole(r.name)}</option>
                                            ))
                                        }
                                    </Field>
                                    <ErrorMessage name="role" className="text-danger" component="p"/>
                                </div>
                                <div className="btn-submit text-center">
                                    <button type="submit" className="btn btn-add-noti">Thêm thông báo</button>
                                </div>
                            </Form>
                        </div>
                    </>
                    // <div className="col-lg-12 d-flex justify-content-end">
                    //     <div className="d-flex justify-content-center form-control">
                    //         <div className="trivn-card">
                    //             <h2 className="trivn-title">Đăng thông báo</h2>
                    //             <Form className="trivn-form">
                    //                 <div className="trivn-group">
                    //                     <Field
                    //                         placeholder=""
                    //                         type="text"
                    //                         id="tieude"
                    //                         name="title"
                    //                         required=""
                    //                     />
                    //                     <label htmlFor="tieude">
                    //                         Tiêu đề <span style={{ color: 'red' }}>*</span>
                    //                     </label>
                    //                 </div>
                    //                 <div className="trivn-group">
                    //                     <Field
                    //                         as="textarea"
                    //                         placeholder=""
                    //                         id="content"
                    //                         name="content"
                    //                         rows="5"
                    //                         required=""
                    //                     />
                    //                     <label htmlFor="content">
                    //                         Nội dung <span style={{ color: 'red' }}>*</span>
                    //                     </label>
                    //                 </div>
                    //                 <div className="trivn-group">
                    //                     <label className="form-label" htmlFor="type">Đối tượng</label>
                    //                     <Field as="select" className="form-select" name='role' id="role" aria-label="role" onChange={handleChangeRole}>
                    //                         {
                    //                             role.map((r)=>(
                    //                                 <option key={r.id} value={JSON.stringify(r)}>{r.name}</option>
                    //                             ))
                    //                         }
                    //                     </Field>
                    //
                    //                 </div>
                    //
                    //                 <div className="trivn-button">
                    //                     <button
                    //                         className="btn btn-outline-secondary rounded-0 me-2"
                    //                         type="reset">
                    //                         Hủy
                    //                     </button>
                    //                     <button className="btn btn-outline-primary rounded-0 ms-1" type="submit">
                    //                         Thêm
                    //                     </button>
                    //                 </div>
                    //             </Form>
                    //         </div>
                    //     </div>
                    // </div>
                )}
            </Formik>
        </>
    );
}
