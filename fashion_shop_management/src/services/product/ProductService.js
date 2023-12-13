import axios from "axios";

export const getAllProducts = async () => {
    try {
        let response = await axios.get("http://localhost:8080/api/product/list");
        return response.data;
    } catch (e) {
        return undefined;
    }
};