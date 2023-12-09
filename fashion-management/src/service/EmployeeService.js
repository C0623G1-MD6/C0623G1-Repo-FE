import axios from "axios";
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return {
            "Authorization": 'Bearer ' + user.accessToken,
            "Content-Type": 'application/json'
        };
    } else {
        return {};
    }
}
export const getInfoEmployeeById = async (id) => {
    try {
        let res = await axios.get(`http://localhost:8080/api/employee/${id}`, { headers: authHeader() });
        return res.data;
    } catch (e) {
        console.log(e)
    }
}
