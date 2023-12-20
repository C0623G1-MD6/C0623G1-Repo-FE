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
export const searchProduct = async (name, page) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/home/productName?productName=${name}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const searchProductByCategory = async (categoryName) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/home/category?categoryName=${categoryName}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchProductForMen = async (page) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/home/men?page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const searchProductForWomen = async (page) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/home/women?page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getListSizeByProductCode = async (productCode) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/home/sizes/${productCode}`
    );
    return res;
  } catch (e) {
    console.log("Error");
  }
};
