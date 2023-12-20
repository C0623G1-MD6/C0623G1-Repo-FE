import axios from "axios";


export const findAll = async (newsCategoryId, roleId,currentPage) => {
    try {
        let res = await axios.get(`http://localhost:8080/api/news/${newsCategoryId}/${roleId}/${currentPage}`)
        return res
    } catch (e) {
        console.log(e)
    }

}

export const createNews = async (value) => {
    try {
        let res = await axios.post("http://localhost:8080/api/news/create", value)
        return res.status
    } catch (e) {
        console.log(e)
    }
}
export const getAllCategory = async () => {
    try {
        const res = await axios.get("http://localhost:8080/api/category");
        return res;
    } catch (e) {
        alert("Hiển thị loại lỗi!");
    }
}

export const getAllByDateCreate = async () => {
    const res = await axios.get("http://localhost:8080/api/news/date");
    return res
}

export const getAllAnother = async () => {
    const res = await axios.get("http://localhost:8080/api/news/another");
    return res
}

export const getAllByPromotion = async () => {
    const res = await axios.get("http://localhost:8080/api/news/promotion");
    return res
}



export const getNewsDetails = async (id) => {
    try {
        const res = await axios.get(`http://localhost:8080/api/news/details/${id}`);
        return res;
    } catch (e) {
        alert("Hiển thị loại lỗi!");
    }
}