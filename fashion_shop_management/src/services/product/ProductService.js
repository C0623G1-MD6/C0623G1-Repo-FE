import axios from "axios";
import authHeader from "../AuthService";

export const getAllProducts = async (currentPage, productName, sizeName, minPrice, maxPrice, sortDirection) => {
    try {
        let response = await axios.get(`http://localhost:8080/api/product/list?page=1`,{ headers: authHeader() });
        return response.data;
    } catch (e) {
        return undefined;
    }
};

export const getAllSizes = async () => {
    try {
        let response = await axios.get("http://localhost:8080/api/product/size");
        return response.data;
    } catch (e) {
        return undefined;
    }
};

export const getSizeById = async (sizeId) => {
    try {
        let response = await axios.get(`http://localhost:8080/api/product/size/${sizeId}`);
        return response.data;
    } catch (e) {
        return undefined;
    }
};