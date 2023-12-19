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
    const [selectedRole,setSelectedRole] = useState(0);

    useEffect(() => {
        setCurrentDate(getCurrentDate());
        displayRole()
    }, []);
    const add = async (values, { resetForm }) => {
        try {
            await createNotification(values, selectedRole);
            toast('Thêm mới thành công');
            resetForm();
        }catch (e) {
            alert("Them moi that bai")
        }

    };
    const displayRole = async () => {
        const res = await getAllRole();
        setRole(res);
    };

    const handleChangeRole = (id) => {
        setSelectedRole(id);
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
                                    <Field className="form-select" as="select" name="role" onChange={(event) => handleChangeRole(event.target.value)}>
                                        {
                                            role.map((r) => (
                                                <option key={r.id} value={r.id}>{renderRole(r.name)}</option>
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
                )}
            </Formik>
        </>
    );
}
