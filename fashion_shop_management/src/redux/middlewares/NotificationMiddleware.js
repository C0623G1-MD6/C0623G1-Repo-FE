import * as notificationService from "../../services/notification/notificationService";
import {GET_ALL_NOTIFICATION, GET_NOTIFICATION_NOT_VIEW_BY_ID, VIEW_NOTIFICATION_ID} from "../constant";
import axios from "axios";

export const getAllNotificationById = (page,id) => async (dispatch) => {
    try {
        let res = await notificationService.getAll(page,id);
        dispatch({
            type: GET_ALL_NOTIFICATION,
            payload: res,
        });
    } catch (error) {
        throw error
    }
};
export const getNotificationNotView = () => async (dispatch) => {
    try {
        let res = await notificationService.getCount();
        dispatch({
            type: GET_NOTIFICATION_NOT_VIEW_BY_ID,
            payload: res,
        });
    } catch (error) {
        throw error
    }
};

export const readNotificationMiddleware = (id) => async (dispatch) => {
    try {
        await notificationService.readNotificationById(id);
        dispatch({
            type: VIEW_NOTIFICATION_ID,
            payload: id,
        });
    } catch (error) {
        throw error;
    }
};

