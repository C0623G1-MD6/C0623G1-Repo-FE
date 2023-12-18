import React, {useEffect, useState} from 'react';
import {NotFound} from "../NotFound";
import {getInfoByIdAccount} from "../../redux/middlewares/EmployeeMiddleware";
import {useDispatch, useSelector} from "react-redux";

function InformationUser() {
    const [roleUser, setRoleUser] = useState("");
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        if (user) {
            getInfoEmployee();
        } else {
            return <NotFound/>
        }
    }, []);

    const getInfoEmployee = async () => {
        await dispatch(getInfoByIdAccount(user.id));
    };

    const role = [...user.roles];
    const employee = useSelector((store) => store.employee);
    const dispatch = useDispatch();
    useEffect(() => {
        setRole();
    }, [role]);
    const setRole = () => {
        switch (role[0]) {
            case "ROLE_MANAGER":
                setRoleUser("Quản lý cửa hàng");
                break;
            case "ROLE_WAREHOUSE":
                setRoleUser("Quản lý kho hàng");
                break;
            case "ROLE_SALES":
                setRoleUser("Nhân viên bán hàng");
                break;
            default:
                setRoleUser("Nhân viên");
                break;
        }
    }
    return (
        <>
            <section id="information">
                <div className="row my-2">
                    <div className="col-lg-12">
                        <div className="content">
                            <div className="row">
                                <div className="col-lg-5 col-sm-12 box-avatar">
                                    <div className="avatar">
                                        <img src="/images/avatar-mockup.png" alt="Avatar User" width={100}/>
                                        <h4>Thông tin nhân viên</h4>
                                        <p>Thông tin cá nhân của {employee.name}</p>
                                        <h3>Chức vụ: {roleUser}</h3>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-sm-12">
                                    <div className="content-information">
                                        <div>
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">Tên nhân
                                                    viên</label>
                                                <input readOnly={true} type="text" className="form-control" id="name"
                                                       value={employee.name}/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="codeEmployee" className="form-label">Mã nhân
                                                    viên</label>
                                                <input readOnly={true} type="text" className="form-control" id="codeEmployee"
                                                       value={employee.employeeCode}/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="birthday" className="form-label">Ngày
                                                    sinh</label>
                                                <input readOnly={true} type="text" className="form-control" id="birthday"
                                                       value={new Date(employee.birthday).toLocaleDateString('vi-VN')}/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="address" className="form-label">Địa chỉ</label>
                                                <input readOnly={true} type="text" className="form-control" id="address"
                                                       value={employee.address}/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="phone" className="form-label">Số điện
                                                    thoại</label>
                                                <input readOnly={true} type="text" className="form-control" id="phone"
                                                       value={employee.phone}/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="phone" className="form-label">Địa chỉ email</label>
                                                <input readOnly={true} type="email" className="form-control" id="email"
                                                       value={employee.email}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default InformationUser;