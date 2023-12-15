import axios from "axios";
import authHeader from "../AuthService";

export const getTotalCustomer= async (time)=>{
    try {
        let res=await axios.get(`http://localhost:8080/api/overview/total_customer/${time}`,{ headers: authHeader() });
        return res.data;
    } catch (e){
        return 0;
    }
}
export const getTotalOrder=async (time)=>{
    try {
        let res=await axios.get(`http://localhost:8080/api/overview/total_order/${time}`,{ headers: authHeader() });
        return res.data;
    } catch (e){
        return 0;
    }
}
export const getTotalRevenue=async (time)=>{
    try {
        let res=await axios.get(`http://localhost:8080/api/overview/revenue/${time}`,{ headers: authHeader() });
        return res.data;
    } catch (e){
        return 0;
    }
}
export const getTopFiveSeller=async (time)=>{
    try {
        let res=await axios.get(`http://localhost:8080/api/overview/top_seller/${time}`,{ headers: authHeader() });
        return res.data;
    } catch (e){
        return undefined;
    }
}
export const getFiveNewOrder=async ()=>{
    try {
        let res=await axios.get("http://localhost:8080/api/overview/top_new_order",{ headers: authHeader() });
        return res.data;
    } catch (e){
        return undefined;
    }
}
