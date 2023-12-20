import * as employeeService from "../../services/EmployeeService";
import {GET_INFO_EMPLOYEE, UPDATE_INFO_EMPLOYEE} from "../constant";

export const getInfoByIdAccount = (id) => async (dispatch) => {
    try {
        let res = await employeeService.getInfoEmployeeById(id);
        dispatch({
            type: GET_INFO_EMPLOYEE,
            payload: res,
        });
        return res
    } catch (error) {
        return undefined;
    }
};
export const updateInfoEmployee = (values) => async (dispatch) => {
    try {
        await employeeService.updateInfoEmployee(values);
        dispatch({
            type: UPDATE_INFO_EMPLOYEE,
            payload: values,
        });
        return true
    } catch (error) {
        return false;
    }
};