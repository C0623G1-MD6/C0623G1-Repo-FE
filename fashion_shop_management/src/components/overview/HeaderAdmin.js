import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getInfoByIdAccount} from "../../redux/middlewares/EmployeeMiddleware";
import {CountNotification} from "../notification/CountNotification";

function HeaderAdmin() {
    const user = JSON.parse(localStorage.getItem('user'));
    const role = [...user.roles]+""
    const employeeInfo = useSelector((store) => store.employee);
    const dispatch = useDispatch();
    let roleName = "";
    switch (role) {
        case "ROLE_SALES":
            roleName = "Nhân viên :"
            break;
        case "ROLE_MANAGER":
            roleName = "Quản lý: "
            break;
        case "ROLE_WAREHOUSE":
            roleName = "Quản lý kho: "
            break;

    }
    useEffect(() => {
        if (user) {
            getInfoEmployee();
        }
    }, []);

    const getInfoEmployee = async () => {
        await dispatch(getInfoByIdAccount(user.id));
    };
    return (
        <div id="header-dashboard" className="nav">
            <nav className="navbar navbar-expand-md">
                <div className="container-fluid">
                    <div className="justify-content-end" id="navbarSupportedContent">
                        <div className="user d-flex">
                            <CountNotification/>
                            <img
                                src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                                alt=""/>
                            <p className="mt-2"><span>{roleName} </span><span
                                className="name">{employeeInfo.name}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default HeaderAdmin;