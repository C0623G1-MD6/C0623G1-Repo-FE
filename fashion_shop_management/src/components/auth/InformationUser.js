import React, {useEffect, useState} from 'react';

function InformationUser({employee,role}) {
    const [roleUser, setRoleUser] = useState("");

    useEffect(() => {
        if (role[0] === "ROLE_MANAGER") {
            setRoleUser("Manager");
        }
    }, [role]);
    return (
        <>
            <section id="information">
                <div className="row my-5">
                    <div className="col-lg-12">
                        <div className="content">
                            <div className="row">
                                <div className="col-5 box-avatar">
                                    <div className="avatar">
                                        <img src="/images/avatar-mockup.png" alt="Avatar User" width={100}/>
                                        <h4>Thông tin nhân viên</h4>
                                        <p>Thông tin cá nhân của {employee.name}</p>
                                        <h3>Chức vụ: {roleUser}</h3>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <div className="content-information">
                                        <div>
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">Tên nhân
                                                    viên</label>
                                                <input type="text" className="form-control" id="name"
                                                       value={employee.name}/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="codeEmployee" className="form-label">Mã nhân
                                                    viên</label>
                                                <input type="text" className="form-control" id="codeEmployee"
                                                       value={employee.employeeCode}/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="birthday" className="form-label">Ngày
                                                    sinh</label>
                                                <input type="text" className="form-control" id="birthday"
                                                       value={employee.birthday}/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="address" className="form-label">Địa chỉ</label>
                                                <input type="text" className="form-control" id="address"
                                                       value={employee.address}/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="phone" className="form-label">Số điện
                                                    thoại</label>
                                                <input type="text" className="form-control" id="phone"
                                                       value={employee.phone}/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="phone" className="form-label">Địa chỉ email</label>
                                                <input type="email" className="form-control" id="email"
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