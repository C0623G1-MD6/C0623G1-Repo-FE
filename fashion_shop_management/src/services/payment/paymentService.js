import axios from "axios";

const URL = "http://localhost:8080/api/invoices/customers"

export const getAllCustomer = async (page,keyword) =>{
    try {
        return await axios.get(URL+`?page=${page}&keyword=${keyword}`);
    } catch (e){
        console.log("Error")
    }
}