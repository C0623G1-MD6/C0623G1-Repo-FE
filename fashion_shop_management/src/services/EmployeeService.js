import axios from "axios";
import authHeader from "./AuthService";
export const getInfoEmployeeById = async (id) => {
    try {
        let res = await axios.get(`http://localhost:8080/api/employee/${id}`, { headers: authHeader() });
        return res.data;
    } catch (e) {
        console.log(e)
    }
}

export const updateInfoEmployee = async (values) => {
    try {
        await axios.post(`http://localhost:8080/api/employee`,values, { headers: authHeader() });
    } catch (e) {
        throw e;
    }
}

