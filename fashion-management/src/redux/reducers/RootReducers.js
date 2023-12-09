// RootReducers.js
import { combineReducers } from 'redux';
import {authReducer} from './AuthReducers';
import {employeeReducer} from "./EmployeeReducers";

export const rootReducers = combineReducers({
    // Bạn cần cung cấp một reducer cho key "auth"
    auth: authReducer,
    employee: employeeReducer,
    // Các reducers khác nếu có
});

