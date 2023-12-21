import axios from "axios";
import authHeader from "../AuthService";

export const getAllSreach = async (startDate, endDate) => {
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    console.log(formattedStartDate);
    console.log(formattedEndDate);
    try {
        const res = await axios.get(`http://localhost:8080/api/sales-report/statistical?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,{headers: authHeader()});
        console.log(res)
        return res.data;
    } catch (e) {
        // alert("Không có dữ liệu");
        return [];
    }
};

export const getRevenue = async (startDate, endDate) => {
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    console.log(formattedStartDate);
    console.log(formattedEndDate);
    try {
        const res = await axios.get(`http://localhost:8080/api/sales-report/revenue?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,{headers: authHeader()});
        console.log(res)
        return res.data;
    } catch (e) {
        // alert("Không có dữ liệu");
        return [];
    }
};

export const getSpend = async (startDate, endDate) => {
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    console.log(formattedStartDate);
    console.log(formattedEndDate);
    try {
        const res = await axios.get(`http://localhost:8080/api/sales-report/spend?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,{headers: authHeader()});
        console.log(res)
        return res.data;
    } catch (e) {
        // alert("Không có dữ liệu");
        return [];
    }
};