import axios from "axios";
import authHeader from "../AuthService";
export const getAllSizeDetail = async () => {
    try {
        let res = await axios.get(`http://localhost:8080/api/size-detail`, { headers: authHeader() });
        return res.data;
    } catch (e) {
        console.log(e)
    }
}

export const importWarehouse = async (data) => {
    try {
        await axios.post(`http://localhost:8080/api/size-detail`,data, { headers: authHeader() });
        return true;
    } catch (e) {
        return false;
    }
}

