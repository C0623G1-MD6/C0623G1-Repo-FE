import {GET_INFO_EMPLOYEE} from "../constant";

export const employeeReducer = (employee = {}, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_INFO_EMPLOYEE:
            return payload;
        default:
            return employee;
    }
};