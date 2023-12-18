import axios from "axios";
import authHeader from "../AuthService";

export const getAll = async (page) => {
  try {
      return await axios.get(`http://localhost:8080/api/notification/list/sales?page=${page}`,{ headers: authHeader() })
  }catch (e) {
      alert("Hiển thị thông báo thất bại")
  }
}
export const createNotification = async (value,idRole) => {
  try {
      return await  axios.post(`http://localhost:8080/api/notification/add?roleId=${idRole}`,value,{ headers: authHeader() })
  }catch (e) {
      console.log(e)
      alert("Thêm mới không thành công")
  }
}
export const getCount = async () => {
  try {
      const  res = await axios.get("http://localhost:8080/api/notification/list/count", { headers: authHeader() })
        return res.data
  }catch (e) {
      alert("Đếm số lương bị lỗi")
  }
}

export const readNotification = async (id) => {
    try {
        let res = await axios.patch(`http://localhost:8080/api/notification/list/read/${id}`, null,{ headers: authHeader() });
    }catch (e) {
        alert("Doc that bai")
    }
}

export const getAllRole = async () => {
  try {
      const res= await axios.get("http://localhost:8080/api/notification/add/roles", { headers: authHeader() } )
      console.log(res.data)
      return res.data
  }catch (e) {
      alert("Không lấy được role")
  }
}