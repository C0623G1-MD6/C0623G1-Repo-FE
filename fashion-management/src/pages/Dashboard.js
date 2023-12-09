import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getInfoByIdAccount} from "../redux/middlewares/EmployeeMiddleware";


function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const employeeInfo = useSelector((store) => store.employee);
    const dispatch = useDispatch();
    useEffect(() => {
        getInfoEmployee();
    }, []);
    const getInfoEmployee = async () => {
     debugger;
      await dispatch(getInfoByIdAccount(user.id));
    }
    return (
        <>
            <div className="container">
                <p>Xin chào, {user.username}</p>
                <p>{employeeInfo.id}</p>
                <p>{employeeInfo.employeeCode}</p>
                <p>{employeeInfo.name}</p>
                <p>{employeeInfo.birthday}</p>
                <p>{employeeInfo.phone}</p>
                <p>{employeeInfo.email}</p>
                <p>{employeeInfo.address}</p>
            </div>
        </>
    );
}

export default Dashboard;
