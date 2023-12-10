// RootReducers.js
import { combineReducers } from 'redux';
import {authReducer} from './AuthReducers';
import {employeeReducer} from "./EmployeeReducers";

export const rootReducers = combineReducers({
    auth: authReducer,
    employee: employeeReducer,
});

