import {ErrorMessage, Field, Form, Formik, useFormikContext} from 'formik';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {createNotification, getAllRole} from '../../services/notification/notificationService';
import {toast} from 'react-toastify';
import '../notification/form_css.css';
import * as Yup from "yup";

export function CreateNotification() {
    const [role, setRole] = useState([]);
    const initialValues = {
        noticePostingDate: new Date().toLocaleDateString(),
        title: '',
        content: '',
        role: []
    }
    const validationSchema = Yup.object().shape({
        noticePostingDate: Yup.string().required('Ngày đăng là bắt buộc'),
        title: Yup.string().required('Tiêu đề là bắt buộc'),
        content: Yup.string().required('Nội dung là bắt buộc'),
        role: Yup.array().min(1, 'Bạn phải chọn ít nhất một đối tượng nhận thông báo')
    });
    const RoleCheckboxes = () => {
        const {values, setFieldValue} = useFormikContext();

        const handleChangeCheckbox = (roleId, isChecked) => {
            const updatedRoles = isChecked
                ? [...values.role, roleId]
                : values.role.filter(id => id !== roleId);
            setFieldValue('role', updatedRoles);
        };

        return (
            <>
                {role.map((item, index) => (
                    <div key={index} className="form-check form-check-inline">
                        <Field
                            name="role"
                            className="form-check-input"
                            type="checkbox"
                            value={item.id}
                            checked={values.role.includes(item.id)}
                            onChange={(e) => handleChangeCheckbox(item.id, e.target.checked)}
                        />
                        <label className="form-check-label">{renderRole(item.name)}</label>
                    </div>
                ))}
                <ErrorMessage name="role" className="text-danger" component="p"/>
            </>
        );
    };

    useEffect(() => {
        displayRole()
    }, []);
    const add = async (values, {resetForm}) => {
        values.noticePostingDate = convertDate(values.noticePostingDate);
        let res = await createNotification(values);
        if (res) {
            toast('Thêm mới thành công');
            resetForm();
        } else {
            toast.error("Them moi that bai")
        }
    };
    function convertDate(dateString) {
        const parts = dateString.split('/');
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return `${year}-${month}-${day}`;
    }
    const displayRole = async () => {
        const res = await getAllRole();
        setRole(res);
    };
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
                initialValues={initialValues}
                onSubmit={add}
                validationSchema={validationSchema}
            >
                {({resetForm}) => (
                    <>
                        <div className="create-noti">
                            <Form>
                                <h3 className="mb-4">Đăng thông báo</h3>
                                <div className="mb-3">
                                    <label htmlFor="noticePostingDate" className="form-label">Ngày đăng</label>
                                    <Field type="text" className="form-control" name="noticePostingDate"
                                           id="noticePostingDate" readOnly/>
                                    <ErrorMessage name="noticePostingDate" className="text-danger" component="p"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Tiêu đề</label>
                                    <Field type="text" className="form-control" id="title" name="title"/>
                                    <ErrorMessage name="title" className="text-danger" component="p"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">Nội dung thông báo</label>
                                    <Field as="textarea" rows="10" className="form-control" name="content"
                                           id="passwordNew"/>
                                    <ErrorMessage name="content" className="text-danger" component="p"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">Đối tượng nhận thông báo</label>
                                    <br/>
                                    <RoleCheckboxes/>
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
