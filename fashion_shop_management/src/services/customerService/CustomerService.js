import axios from "axios";

const URL_CUSTOMER = "http://localhost:8080/api/customer";

export const GetCustomerByIdService = async (id) => {
    try {
        const res = await axios.get(URL_CUSTOMER + `/${id}`)
        return res.data
    } catch (e) {
        alert("error Service get Customer")
    }
}

export const EditCustomerService = async (value) => {
    try {
        const res = await axios.patch(URL_CUSTOMER + `/${value.id}`, value)
        return res
    } catch (e) {
        alert("error Service Edit")
    }
}
export const CreateCustomerService = async (value) => {
    try {
        const res = await axios.post(URL_CUSTOMER, value)
        console.log(res)
        return res
    } catch (e) {
        alert("error Service create Customer")
    }
}
export const GetCustomerTypeListService = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/customerType")
        return res.data
    } catch (e) {
        alert("error Service get List")
    }
}