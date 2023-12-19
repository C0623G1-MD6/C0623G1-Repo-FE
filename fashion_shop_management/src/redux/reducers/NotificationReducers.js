import {GET_ALL_NOTIFICATION, GET_NOTIFICATION_NOT_VIEW_BY_ID, VIEW_NOTIFICATION_ID} from "../constant";

const initValue = {
    notifications: [],
    notificationNotView: []
};

export const notificationReducer = (state = initValue, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_ALL_NOTIFICATION:
            return {
                ...state,
                notifications: payload
            };
        case GET_NOTIFICATION_NOT_VIEW_BY_ID:
            return {
                ...state,
                notificationNotView: payload
            };
        case VIEW_NOTIFICATION_ID:
            return {
                ...state,
                notificationNotView: state.notificationNotView.filter(item => item.id !== payload)
            };
        default:
            return state;
    }
};
