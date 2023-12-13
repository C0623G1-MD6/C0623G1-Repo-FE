import * as employeeService from "../../services/EmployeeService";
import {GET_INFO_EMPLOYEE} from "../constant";

export const getInfoByIdAccount = (id) => async (dispatch) => {
    try {
        let res = await employeeService.getInfoEmployeeById(id);
        console.log(res.data);
        dispatch({
            type: GET_INFO_EMPLOYEE,
            payload: res,
        });
    } catch (error) {
        console.error(error);
        return undefined;
    }
};