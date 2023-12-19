import axios from "axios";
import authHeader from "../AuthService";

export const getAll = async (page, accountId) => {
    try {
        let res = await axios.get(`http://localhost:8080/api/notification/list?id=${accountId}`, {headers: authHeader()})
        return res.data;
    } catch (e) {
        throw e
    }
}

export const getAllNotificationIsView = async (accountId) => {
    try {
        let res = await axios.get(`http://localhost:8080/api/notification/view?id=${accountId}`, {headers: authHeader()})
        return res.data;
    } catch (e) {
        throw e
    }
}
export const createNotification = async (value) => {
    try {
        await axios.post(`http://localhost:8080/api/notification/add`, value, {headers: authHeader()})
        return true;
    } catch (e) {
        return false;
    }
}
export const getCount = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/notification/list/count", {headers: authHeader()})
        console.log(res.data)
        return res.data
    } catch (e) {
        // throw e
    }
}

export const readNotificationById = async (id) => {
    try {
        await axios.patch(`http://localhost:8080/api/notification/read/${id}`, null, {headers: authHeader()});
        return true
    } catch (e) {
        return false
    }
}

export const getAllRole = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/notification/add/roles", {headers: authHeader()})
        console.log(res.data)
        return res.data
    } catch (e) {
        alert("Không lấy được role")
    }
}