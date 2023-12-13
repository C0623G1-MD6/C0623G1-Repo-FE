import axios from "axios";

export const getAllCustomer = async (name, typeCustomer, page) => {
    if (typeCustomer === "") {
        try {
            const res = await axios.get(`http://localhost:8080/api/customer?nameCustomer=${name}&page=${page}`);
            return res.data;
        } catch (e) {
            return e;
        }
    } else {
        try {
            const res = await axios.get(`http://localhost:8080/api/customer?nameCustomer=${name}&typeCustomer=${typeCustomer}&page=${page}`);
            return res.data;
        } catch (e) {
            return e;
        }
    }

}