import axios from "axios";
import authHeader from "../AuthService";

export const getAllProducts = async () => {
    try {
        let response = await axios.get(`http://localhost:8080/api/warehouses/products`,{headers: authHeader()});
        return response.data;
    } catch (e) {
        return undefined;
    }
};

export const getCode = async () => {
    try {
        let response = await axios.get(`http://localhost:8080/api/warehouses/code`,{headers: authHeader()});
        console.log(response.data);
        return response.data;
    } catch (e) {
        return undefined;
    }


};


export const saveWarehouse = async (warehouse) => {
    try {
        await axios.post(`http://localhost:8080/api/warehouses/inputWarehouseDetail`,warehouse,{headers: authHeader()});
    } catch (e) {
        return undefined;
    }


};