import axios from "axios";

export const getAllProducts = async (currentPage, productName, sizeName, minPrice, maxPrice, sortDirection) => {
    try {
        let response = await axios.get(`http://localhost:8080/api/product/list?page=${currentPage - 1}&productName=${productName}&sizeName=${sizeName}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortDirection=${sortDirection}`);
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