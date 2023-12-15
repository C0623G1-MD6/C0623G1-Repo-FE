import HeaderAdmin from "../overview/HeaderAdmin";
import React, {useEffect} from "react";
import Sidebar from "../Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {getInfoByIdAccount} from "../../redux/middlewares/EmployeeMiddleware";
import AccessDenied from "../auth/AccessDenied";
import DashboardManager from "../DashboardManager";
function Post() {
    const user = JSON.parse(localStorage.getItem('user'));
    const employeeInfo = useSelector((store) => store.employee);
    const dispatch = useDispatch();
    let item="item3"

    useEffect(() => {
        if (user) {
            getInfoEmployee();
        }
    }, []);

    const getInfoEmployee = async () => {
        await dispatch(getInfoByIdAccount(user.id));
    };

    const renderPost = () => {
        if (!user) {
            return <AccessDenied/>;
        } else if (user.roles.includes("ROLE_MANAGER")) {
            return (
                <>
                    <div className="main-container d-flex">
                        <Sidebar item={item}/>
                        <div className="content">
                            <HeaderAdmin/>
                            <div className="dashboard-content">
                                <div className="py-5 px-5">
                                    {/*Đặt component của mọi người ở đây nhé*/}
                                    <h1>Đây là trang đăng thông báo</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return <DashboardManager/>;
        }
    };
    return <>
        {renderPost()}
    </>;


}

export default Post;