import axios from "axios";
import authHeader from "../AuthService";

export const getAllCustomerType = async () => {
    try {
        const res = await axios.get(`http://localhost:8080/api/customerType`,{ headers: authHeader() });
        return res.data;
    } catch (e) {
        return e;
    }
}