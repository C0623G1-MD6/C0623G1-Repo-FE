import axios from "axios";
import authHeader from "../AuthService";

export const getAllProducts = async (currentPage, productName, sizeName, minPrice, maxPrice, sortDirection) => {
    try {
        let response = await axios.get(`http://localhost:8080/api/product/list?page=${currentPage - 1}&productName=${productName}&sizeName=${sizeName}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortDirection=${sortDirection}`,{ headers: authHeader() });
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

export const getAllPromotions = async () => {
    try {
        let response = await axios.get("http://localhost:8080/api/product/promotion");
        return response.data;
    } catch (e) {
        return undefined;
    }
};

export const getAllCategories = async () => {
    try {
        let response = await axios.get("http://localhost:8080/api/product/category");
        return response.data;
    } catch (e) {
        return undefined;
    }
};

export const createProduct = async (product) => {
    try {
        let response = await axios.post("http://localhost:8080/api/product/create", product, {headers: authHeader()});
        return response.data
    } catch (e) {
        return e.response;
    }
};

