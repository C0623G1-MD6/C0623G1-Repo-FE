import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Navigation, Autoplay } from "swiper/modules";
import {
  getProductsHasPromotion,
  getNewestProducts,
} from "../../services/home/homeService";
import { useParams } from "react-router-dom";
import axios from "axios";

const HomeShowProducts = () => {
  const [products, setProducts] = useState([]);
  const [option, setOption] = useState("");
  const [sort, setSort] = useState("ASC");
  const [newestProducts, setNewestProducts] = useState([]);

  useEffect(() => {
    getProductPromotion();
  }, [sort]);

  useEffect(() => {
    getNewProducts();
  }, []);

  const getNewProducts = async () => {
    let res = await getNewestProducts();
    setNewestProducts(res.content);
  };

  const getProductPromotion = async () => {
    let res = await getProductsHasPromotion(option, sort);
    console.log(res);
    setProducts(res.content);
  };

  const changeSortList = async (value) => {
    setSort(value.target.value);
  };
  const sortNewProduct = (value) => {
    console.log("Sort", value.target.value);
    let sortList = [...newestProducts];
    if (value.target.value === "DESC") {
      sortList = sortList.sort((a, b) => b.price - a.price);
      console.log(sortList);
    } else {
      sortList = sortList.sort((a, b) => a.price - b.price);
      console.log(sortList);
    }
    setNewestProducts([...sortList]);
  };

  if (!products) {
    return null;
  }
  return (
    <>
      <div>
        <div className="mx-auto" style={{ width: "90%" }}>
          <h2
            className="mt-3 w-10"
            style={{ textShadow: "0 10px 25px 5px", textAlign: "center" }}
          >
            SẢN PHẨM KHUYẾN MÃI
          </h2>
        </div>

        <div style={{ margin: "0 100px" }}>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <select
              style={{ width: 200, marginBottom: 10 }}
              className="form-select"
              aria-label="Default select example"
              onChange={(value) => changeSortList(value)}
            >
              <option selected hidden>
                Sắp xếp theo
              </option>
              <option value="ASC">Giá tăng dần</option>
              <option value="DESC">Giá giảm dần</option>
            </select>
          </div>
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            loop={true}
            className="mySwiper"
          >
            {products.map((item) => (
              <SwiperSlide>
                {/* <div className="card"> */}
                <div
                  style={{
                    width: "100%",
                    height: 300,
                    backgroundImage: `url("${item.productImage}")`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    transition: "background-image 0.5s ease-in-out",
                  }}
                  id="testId"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <p className="card-text" id="product-name">
                    {item.productName}
                  </p>
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
                      {(item.price - item.price * item.percent).toLocaleString(
                        "vi",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </span>
                  </p>
                </div>
                {/* </div> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div>
        <div className="mx-auto" style={{ width: "90%", marginTop: "60px" }}>
          <h2
            className="mt-3 w-10"
            style={{ textShadow: "0 10px 25px 5px", textAlign: "center" }}
          >
            SẢN PHẨM MỚI
          </h2>
        </div>

        <div style={{ margin: "0 100px" }}>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <select
              style={{ width: 200, marginBottom: 10 }}
              className="form-select"
              onChange={(value) => sortNewProduct(value)}
              aria-label="Default select example"
            >
              <option selected>Sắp xếp theo</option>
              <option value="ASC">Giá tăng dần</option>
              <option value="DESC">Giá giảm dần</option>
            </select>
          </div>
          <Swiper
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            slidesPerView={4}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            loop={true}
            className="mySwiper"
          >
            {newestProducts.map((item) => (
              <SwiperSlide>
                {/* <div className="card"> */}
                <div
                  style={{
                    width: "100%",
                    height: 300,
                    backgroundImage: `url("${item.productImage}")`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    transition: "background-image 0.5s ease-in-out",
                  }}
                  id="testId"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <p className="card-text" id="product-name">
                    {item.productName}
                  </p>
                  <p
                    className="card-text product-size"
                    style={{ opacity: 0.7, fontSize: "14px" }}
                  >
                    XS - S - M - L - XL
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
                      {(item.price - item.price * item.percent).toLocaleString(
                        "vi",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </span>
                  </p>
                </div>
                {/* </div> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HomeShowProducts;
