import axios from "axios";
import authHeader from "../AuthService";

export const getAll = async (page,accountId) => {
  try {
      let res =  await axios.get(`http://localhost:8080/api/notification/list?id=${accountId}`,{ headers: authHeader() })
      return res;
  }catch (e) {
      console.log(e)
  }
}

export const getAllNotificationIsView = async (accountId) => {
    try {
        let res =  await axios.get(`http://localhost:8080/api/notification/view?id=${accountId}`,{ headers: authHeader() })
        return res;
    }catch (e) {
        console.log(e)
    }
}
export const createNotification = async (value,roleId) => {
  try {
      return await  axios.post(`http://localhost:8080/api/notification/add?roleId=${roleId}`, value,{ headers: authHeader() })
  }catch (e) {
      alert("Thêm mới không thành công")
  }
}
export const getCount = async () => {
  try {
      const  res = await axios.get("http://localhost:8080/api/notification/list/count", { headers: authHeader() })
        return res.data
  }catch (e) {
      // alert("Đếm số lương bị lỗi")
  }
}

export const readNotificationById = async (id) => {
    try {
        let res = await axios.patch(`http://localhost:8080/api/notification/read/${id}`, null,{ headers: authHeader() });
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