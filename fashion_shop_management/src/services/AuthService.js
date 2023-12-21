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
export const login = async (account) => {
    try {
        let res = await axios.post("http://localhost:8080/api/login", account);
        return res.data;
    } catch (e) {
        throw e.response;
    }
}
export const changePassword = async (account) => {
    try {
        let res = await axios.patch("http://localhost:8080/api/changePassword", account, {headers: authHeader()});
        return res.data;
    } catch (e) {
        throw e.response;
    }
};

export const recoverPassword = async (email) => {
    try {
        let res = await axios.post("http://localhost:8080/api/recoverPassword", null, {
            params: {
                emailRecover: email
            },
            headers: authHeader()
        });

        return res.data;
    } catch (e) {
        throw e.response;
    }
};

export const resetPassword = async (token) => {
    try {
        await axios.get(`http://localhost:8080/api/resetPassword/${token}`, null, {
            headers: authHeader()
        });
        return true;
    } catch (e) {
        return false;
    }
};

export const savePasswordNew = async (token,values) => {
    try {
        await axios.post(`http://localhost:8080/api/resetPassword/${token}`, values, {
            headers: authHeader()
        });
        return true;
    } catch (e) {
        return false;
    }
};