import axios from "axios";
import data from "bootstrap/js/src/dom/data";
import authHeader from "../AuthService";

export const getAll = async (page) => {
  try {
      return await axios.get(`http://localhost:8080/api/notification/list/sales?page=${page}`,{ headers: authHeader() })
  }catch (e) {
      alert("Hiển thị thông báo thất bại")
  }
}
export const createNotification = async (value) => {
  try {
      return await  axios.post("http://localhost:8080/api/notification/add", value,{ headers: authHeader() })
  }catch (e) {
      alert("Thêm mới không thành công")
  }
}