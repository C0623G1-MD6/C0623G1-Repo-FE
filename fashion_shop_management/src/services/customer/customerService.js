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

const URL_CUSTOMER = "http://localhost:8080/api/customer";

export const getCustomerByIdService = async (id) => {
    try {
        const res = await axios.get(URL_CUSTOMER + `/${id}`,{ headers: authHeader() })
        return res.data
    } catch (e) {
        alert("error Service get Customer")
    }
}

export const editCustomerService = async (value) => {
    try {
        const res = await axios.patch(URL_CUSTOMER + `/${value.id}`, value,{ headers: authHeader() })
        return res
    } catch (e) {
        alert("error Service Edit")
    }
}
export const createCustomerService = async (value) => {
    try {
        const res = await axios.post(URL_CUSTOMER, value,{ headers: authHeader() })
        console.log(res)
        return res
    } catch (e) {
        alert("error Service create Customer")
    }
}
export const getCustomerTypeListService = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/customerType",{ headers: authHeader() })
        return res.data
    } catch (e) {
        alert("error Service get List")
    }
}
export const removeCustomer = async (id) => {
    try {
        return await axios.delete(`http://localhost:8080/api/customer/delete/${id}`,{ headers: authHeader() });
    } catch (e) {
        return e;
    }
}