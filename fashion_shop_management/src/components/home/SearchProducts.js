import React, { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
import { useSearchParams } from "react-router-dom";
import {
  searchProduct,
  searchProductForMen,
  searchProductForWomen,
} from "../../services/home/homeService";
import { Modal } from "react-bootstrap";
import ImageGallery from "./ImageGallery/ImageGallery";

const SearchProducts = () => {
  const [searchList, setSearchList] = useState([]);
  const [productModal, setProductModal] = useState({});
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const gender = searchParams.get("gender");
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  useEffect(() => {
    keyword && findProductByName();
  }, [keyword]);
  const findProductByName = async () => {
    let res = await searchProduct(keyword);
    setSearchList(res?.content ?? []);
  };
  const getProductsForGender = async (gender) => {
    let res = null;
    if (gender == 0) {
      res = await searchProductForMen();
    } else if (gender == 1) {
      res = await searchProductForWomen();
    } else {
      res = null;
    }
    setSearchList(res?.content ?? []);
  };
  useEffect(() => {
    getProductsForGender(gender);
  }, [gender]);
  const handleSelectProductView = (product) => {
    handleShowModal();
    setProductModal(product);
  };
  return (
    <>
      <HomeHeader></HomeHeader>
      <div className="container" id="product-home">
        {searchList.length == 0 ? (
          <div className="text-center" style={{ height: "50vh" }}>
            <p style={{ marginTop: "20%" }}>Không có sản phẩm!</p>
          </div>
        ) : (
          <div className="row mt-5">
            <div className="row my-3 justify-content-between align-items-end">
              <div className="col-auto">
                <h3 className="title-product">
                  Bộ sưu tập sản phẩm dành cho {gender == 0 ? "Nam" : "Nữ"}
                </h3>
                <p>
                  Những thiết kế thời trang mang phong cách đậm chất retro đi
                  cùng những màu sắc và kiểu dáng sang trọng vô cùng thích hợp
                  cho mùa Thu Đông 2023 đang đến gần
                </p>
              </div>
            </div>
            {searchList.map((item) => (
              <div
                key={item.productId}
                className="col-12 col-md-6 col-lg-3 mb-4 "
              >
                <div
                  className="card"
                  onClick={() => handleSelectProductView(item)}
                >
                  <img
                    src={item.productImage.split(",")[0]}
                    height="333px"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body px-0">
                    <h5 className="card-title">{item.productName}</h5>
                    <p class="card-text">
                      Áo gi lê cổ chữ V, tay sát nách. Bo viền bằng vải gân.
                    </p>
                    <hr />
                    <p className="size-product">XS - S - M - L - XL - XXL</p>
                    {item.percent > 0 && (
                      <div className="row price-product justify-content-between">
                        <div className="col-auto">
                          <span className="price-sale">
                            <del>
                              {item.price.toLocaleString("vi", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </del>
                          </span>
                          <span className="percent">{item.percent * 100}%</span>
                        </div>
                        <div className="col-lg-auto">
                          <span className="price">
                            {(
                              item.price -
                              item.price * item.percent
                            ).toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                      </div>
                    )}
                    {(item.percent < 0 || item.percent === 0) && (
                      <div className="row price-product justify-content-between">
                        <div className="col-auto">
                          <span className="price-normal">
                            {item.price.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        className="modal-view-product"
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body id="body-view-product">
          <div className="row">
            <div className="col-lg-6">
              {!productModal.productImage ? (
                ""
              ) : (
                <ImageGallery images={productModal.productImage.split(",")} />
              )}
            </div>
            <div className="col-lg-6">
              <h5 className="card-title">{productModal.productName}</h5>
              <p className="card-text">
                Áo gi lê cổ chữ V, tay sát nách. Bo viền bằng vải gân.
              </p>
              <p className="size-product">XS - S - M - L - XL - XXL</p>
              <div className="row price-product justify-content-between">
                {productModal.price !== undefined ? (
                  <>
                    <div className="col-auto">
                      <span className="price-sale">
                        {productModal.price.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      <span className="percent">
                        {productModal.percent * 100}%
                      </span>
                    </div>
                    <div className="col-lg-auto">
                      <span className="price">
                        {(
                          productModal.price -
                          productModal.price * productModal.percent
                        ).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="chat-lieu">
                <p>
                  <span>Chất liệu:</span> Chúng tôi đang triển khai các chương
                  trình giám sát nhằm đảm bảo sự tuân thủ các tiêu chuẩn của
                  chúng tôi về xã hội, môi trường, cũng như về độ an toàn và
                  tính lành mạnh của các sản phẩm. Nhằm đánh giá sự tuân thủ các
                  tiêu chuẩn này, chúng tôi đã phát triển một chương trình kiểm
                  toán và các kế hoạch cải thiện liên tục.
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <HomeFooter></HomeFooter>
    </>
  );
};

export default SearchProducts;
