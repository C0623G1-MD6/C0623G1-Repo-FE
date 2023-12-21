import React, { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
import { useSearchParams } from "react-router-dom";
import {
  searchProduct,
  searchProductForMen,
  searchProductForWomen,
  getListSizeByProductCode,
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
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [productCode, setProductCode] = useState("");

  // paganation
  const prePage = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const nextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  useEffect(() => {
    keyword && findProductByName();
  }, [keyword, currentPage]);
  const findProductByName = async () => {
    let res = await searchProduct(keyword, currentPage);
    setSearchList(res?.content ?? []);
    setTotalPages(res.totalPages);
  };
  const getProductsForGender = async (gender) => {
    let res = null;
    if (gender == 0) {
      res = await searchProductForMen(currentPage);
      setSearchList(res?.content ?? []);
      setTotalPages(res.totalPages);
    } else if (gender == 1) {
      res = await searchProductForWomen(currentPage);
      setSearchList(res?.content ?? []);
      setTotalPages(res.totalPages);
    }
  };
  useEffect(() => {
    getProductsForGender(gender);
  }, [gender, currentPage]);
  // get sizes for product
  useEffect(() => {
    getAllSizeProduct();
  }, [productCode]);
  const getAllSizeProduct = async () => {
    if (productCode !== "") {
      const res = await getListSizeByProductCode(productCode);
      console.log(res);
      setSizes(res.data);
    }
  };
  const handleSelectProductView = (product) => {
    handleShowModal();
    setProductModal(product);
    setProductCode(product.productCode);
    console.log(productModal.prdDescription);
  };
  // const limitCharacters = (text, limit) => {
  //   if (text.length <= limit) {
  //     return text;
  //   } else {
  //     return text.slice(0, limit) + "...";
  //   }
  // };
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
                {keyword == null && (
                  <h3 className="title-product">
                    Bộ sưu tập sản phẩm dành cho {gender == 0 ? "Nam" : "Nữ"}
                  </h3>
                )}
                {keyword !== null && (
                  <h3 className="title-product">
                    Bộ sưu tập sản phẩm " {keyword} "
                  </h3>
                )}
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
                    alt={item.productName}
                  />
                  <div className="card-body px-0">
                    <h5 className="card-title">{item.productName}</h5>

                    <hr />
                    <p className="card-description">
                      {item.prdDescription}
                    </p>

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
              <p className="card-text-code">{productModal.productCode}</p>
              {sizes.map((size, index) => (
                <span key={index} className="size-product">
                  {size.name}{" "}
                </span>
              ))}

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
                <div>
                  <span className="description-title">Mô tả: </span>
                  <br />
                  <span className="mt-3 modal-description">
                    {productModal.prdDescription}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* pagation */}
      <nav aria-label="Page navigation example">
        <ul className="pagination" style={{ marginLeft: "44%" }}>
          <li className="page-item">
            <button
              className="page-link  text-secondary"
              aria-label="Previous"
              onClick={() => prePage()}
              tabIndex={-1}
              disabled={currentPage + 1 <= 1}
            >
              <span aria-hidden="true">Trước</span>
            </button>
          </li>
          <li className="page-item">
            <button className="page-link  text-secondary">
              {currentPage + 1}-{totalPages}
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link text-secondary"
              aria-label="Next"
              disabled={currentPage + 1 >= totalPages}
              onClick={() => nextPage()}
            >
              <span aria-hidden="true">Sau</span>
            </button>
          </li>
        </ul>
      </nav>
      <HomeFooter></HomeFooter>
    </>
  );
};

export default SearchProducts;
