import axios from "axios";

export const getAllCustomer = async (nameCustomer, typeCustomer, page) => {
    if (typeCustomer === "") {
        try {
            return await axios.get(`http://localhost:8080/api/customer?nameCustomer=${nameCustomer}&page=${page}`);
        } catch (e) {
            return e;
        }
    } else {
        try {
            return await axios.get(`http://localhost:8080/api/customer?nameCustomer=${nameCustomer}&typeCustomer=${typeCustomer}&page=${page}`);
        } catch (e) {
            return e;
        }
    }
}

export const removeCustomer = async (id) => {
    try {
        return await axios.delete(`http://localhost:8080/api/customer/delete/${id}`, id);
    }catch (e) {
        return e;
    }
}