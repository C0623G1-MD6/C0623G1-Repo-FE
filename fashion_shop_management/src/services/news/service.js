import axios from "axios";


export const findAll = async (newsCategoryId) => {
    let res = await axios.get(`http://localhost:8080/api/news/${newsCategoryId}`)
    return res

}

export const create = async () => {
    try {
        let res = await axios.post("http://localhost:8080/api/news/create")
        return res.status
    } catch (e) {
        alert("Access denied")

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