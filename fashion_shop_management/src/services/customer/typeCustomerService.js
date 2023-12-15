import axios from "axios";

export const getAllCustomerType = async () => {
    try {
        const res = await axios.get(`http://localhost:8080/api/customerType`);
        return res.data;
    } catch (e) {
        return e;
    }
}