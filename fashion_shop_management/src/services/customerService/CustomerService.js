import axios from "axios";

const URL_CUSTOMER = "http://localhost:8080/api/customer";

export const getCustomerByIdService = async () => {
    try {
        const res = await axios.get(URL_CUSTOMER)
        return res.data
    } catch (e) {
        alert("error Service")
    }
}

export const EditCustomerService = async (value) => {
    try {
        const res = await axios.patch(URL_CUSTOMER + `/edit/${value.id}`, value)
        return res.data
    } catch (e) {
        alert("error Service")
    }
}
export const CreateCustomerService = async (value) => {
    try {
        const res = await axios.post(URL_CUSTOMER + `/create/${value.id}`, value)
        return res.data
    } catch (e) {
        alert("error Service")
    }
}