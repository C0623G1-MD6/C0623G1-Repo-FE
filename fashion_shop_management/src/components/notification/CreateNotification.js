import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {createNotification, getAllRole} from '../../services/notification/notificationService';
import { toast } from 'react-toastify';
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
                {({ resetForm }) => (
                    <div className="col-lg-12 d-flex justify-content-end">
                        <div className="d-flex justify-content-center form-control">
                            <div className="trivn-card">
                                <h2 className="trivn-title">Đăng thông báo</h2>
                                <Form className="trivn-form">
                                    <div className="trivn-group">
                                        <Field
                                            placeholder=""
                                            type="text"
                                            name="noticePostingDate"
                                            id="validationDefault01"
                                            value={currentDate}
                                            readOnly
                                        />
                                        <label htmlFor="validationDefault01">Ngày Đăng</label>
                                    </div>
                                    <div className="trivn-group">
                                        <Field
                                            placeholder=""
                                            type="text"
                                            id="tieude"
                                            name="title"
                                            required=""
                                        />
                                        <label htmlFor="tieude">
                                            Tiêu đề <span style={{ color: 'red' }}>*</span>
                                        </label>
                                    </div>
                                    <div className="trivn-group">
                                        <Field
                                            as="textarea"
                                            placeholder=""
                                            id="content"
                                            name="content"
                                            rows="5"
                                            required=""
                                        />
                                        <label htmlFor="content">
                                            Nội dung <span style={{ color: 'red' }}>*</span>
                                        </label>
                                    </div>
                                    <div className="trivn-group">
                                        <label className="form-label" htmlFor="type">Đối tượng</label>
                                        <Field as="select" className="form-select" name='role' id="role" aria-label="role" onChange={(event) => handleChangeRole(event.target.value)}>
                                            {
                                                role.map((r)=>(
                                                    <option key={r.id} value={r.id}>{r.name}</option>
                                                ))
                                            }
                                        </Field>

                                    </div>

                                    <div className="trivn-button">
                                        <button
                                            className="btn btn-outline-secondary rounded-0 me-2"
                                            type="reset">
                                            Hủy
                                        </button>
                                        <button className="btn btn-outline-primary rounded-0 ms-1" type="submit">
                                            Thêm
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
}
