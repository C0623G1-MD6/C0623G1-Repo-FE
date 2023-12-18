import axios from "axios";

const URL = "http://localhost:8080/api/invoices"

export const getAllCustomer = async (page,keyword) =>{
    try {
        return await axios.get(URL+`/customers?page=${page}&keyword=${keyword}`);
    } catch (e){
        console.log("Error")
    }
}

export const getListProduct = async (keyword) =>{
    try {
        return await axios.get(URL+`/products?keyword=${keyword}`);
    } catch (e){
        console.log("Error")
    }
}

export const getProductByProductCode = async (productCode) =>{
    try {
        const res = await axios.get(URL+`/products/${productCode}`);
        return res.data;
    } catch (e){
        console.log("Error")
    }
}

export const getListSizeByProductCode = async (productCode) =>{
    try {
        return await axios.get(URL+`/sizes/${productCode}`);
    } catch (e){
        console.log("Error")
    }
}

export const getQuantityByProductCodeAndSizeName = async (productCode, sizeName) =>{
    try {
        return await axios.get(URL+`/size-details/${productCode}/${sizeName}`);
    } catch (e){
        console.log("Error")
    }
}