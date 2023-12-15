import axios from "axios";

export const getProductsHasPromotion = async (option, sort) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/home/promotion?option=${option}&sort=${sort}`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const getNewestProducts = async () => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/home?option=id&sort=DESC`
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const searchProduct = async (name) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/home/productName?productName=${name}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const searchProductForMen = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/api/home/men`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const searchProductForWomen = async () => {
  try {
    const res = await axios.get(`http://localhost:8080/api/home/women`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
