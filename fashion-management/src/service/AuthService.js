import axios from "axios";

export const login = async (account) => {
    try {
        let res = await axios.post("http://localhost:8080/api/login", account);
        return res.data;
    } catch (e) {
        return e.res.data;
    }
}
