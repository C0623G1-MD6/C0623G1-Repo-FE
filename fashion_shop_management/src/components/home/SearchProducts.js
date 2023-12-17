import React, { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
import { useSearchParams } from "react-router-dom";
import {
  searchProduct,
  searchProductForMen,
  searchProductForWomen,
} from "../../services/home/homeService";

const SearchProducts = () => {
  const [searchList, setSearchList] = useState([]);
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("keyword")); // 'name'
  const keyword = searchParams.get("keyword");
  const gender = searchParams.get("gender");
  useEffect(() => {
    keyword && findProductByName();
  }, [keyword]);
  const findProductByName = async () => {
    let res = await searchProduct(keyword);
    setSearchList(res.content ?? []);
  };
  const getProductsForGender = async (gender) => {
    let res = null;
    if (gender == 0) {
      res = await searchProductForMen();
    } else {
      res = await searchProductForWomen();
    }
    console.log(res?.content);
    setSearchList(res?.content ?? []);
  };
  useEffect(() => {
    getProductsForGender(gender);
  }, [gender]);

  return (
    <>
      <HomeHeader></HomeHeader>
      <div className="container">
        {searchList.length == 0 ? (
          <div className="text-center" style={{ height: "50vh" }}>
            <p style={{ marginTop: "20%" }}>Không có sản phẩm!</p>
          </div>
        ) : (
          <div className="row">
            {searchList.map((item) => (
              <div className="col col-3 mb-4 ">
                <div className="card search-card" style={{ width: "18rem" }}>
                  <img
                    src={item.productImage}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.productName}</h5>
                    <p
                      className="card-text product-size"
                      style={{ opacity: 0.7, fontSize: "14px" }}
                    >
                      XS - S - M - L - XL - XXL
                    </p>
                    <p className="card-text">
                      <del>
                        {item.price.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </del>
                    </p>
                    <p className="card-text sale-price">
                      <span>
                        {(
                          item.price -
                          item.price * item.percent
                        ).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <HomeFooter></HomeFooter>
    </>
  );
};

export default SearchProducts;
