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
// export const getNewestProducts = async (option, sort) => {
//     try {
//         const res = await axios.get(

//         )

//     } catch (error) {
//         console.log(error);

//     }
// }
