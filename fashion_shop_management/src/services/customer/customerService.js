import axios from "axios";
import authHeader from "../AuthService";

export const getAllCustomer = async (nameCustomer, typeCustomer, page) => {
    if (typeCustomer === "") {
        try {
            return await axios.get(`http://localhost:8080/api/customer/list?nameCustomer=${nameCustomer}&page=${page}`,{ headers: authHeader() });
        } catch (e) {
            return e;
        }
    } else {
        try {
            return await axios.get(`http://localhost:8080/api/customer/list?nameCustomer=${nameCustomer}&typeCustomer=${typeCustomer}&page=${page}`,{ headers: authHeader() });
        } catch (e) {
            return e;
        }
    }
}

export const removeCustomer = async (id) => {
    try {
        return await axios.delete(`http://localhost:8080/api/customer/delete/${id}`,{ headers: authHeader() });
    } catch (e) {
        return e;
    }
}