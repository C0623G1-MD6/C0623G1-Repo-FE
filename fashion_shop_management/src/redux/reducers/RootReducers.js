// RootReducers.js
import { combineReducers } from 'redux';
import {authReducer} from './AuthReducers';
import {employeeReducer} from "./EmployeeReducers";
import {notificationReducer} from "./NotificationReducers";

export const rootReducers = combineReducers({
    auth: authReducer,
    employee: employeeReducer,
    notification: notificationReducer,
});

