import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {useState, useEffect} from "react";
import {Pagination} from "swiper/modules";
import "swiper/css/pagination";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import {Navigation, Autoplay} from "swiper/modules";
import {
    getProductsHasPromotion,
    getNewestProducts,
    getListSizeByProductCode,
} from "../../services/home/homeService";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Button, Modal} from "react-bootstrap";
import ImageGallery from "./ImageGallery/ImageGallery";

const HomeShowProducts = () => {
    const [products, setProducts] = useState([]);
    const [productModal, setProductModal] = useState({});
    const [option, setOption] = useState("");
    const [sort, setSort] = useState("ASC");
    const [newestProducts, setNewestProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [productCode, setProductCode] = useState("");

    const imagesModal = [
        {
            original: "https://picsum.photos/id/1018/1000/600/",
            thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
            original: "https://picsum.photos/id/1015/1000/600/",
            thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
            original: "https://picsum.photos/id/1019/1000/600/",
            thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
    ];

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    useEffect(() => {
        getProductPromotion();
    }, [sort]);

    useEffect(() => {
        getNewProducts();
    }, []);

    const getNewProducts = async () => {
        let res = await getNewestProducts();
        setNewestProducts(res?.content ?? []);
    };

    const getProductPromotion = async () => {
        let res = await getProductsHasPromotion(option, sort);
        console.log(res);
        setProducts(res?.content ?? []);
    };

    const changeSortList = async (value) => {
        setSort(value.target.value);
    };
    const sortNewProduct = (value) => {
        let sortList = [...newestProducts];
        if (value.target.value === "DESC") {
            sortList = sortList.sort((a, b) => b.price - a.price);
        } else {
            sortList = sortList.sort((a, b) => a.price - b.price);
        }
        setNewestProducts([...sortList]);
    };
    // get sizes for a product

    useEffect(() => {
        getAllSizeProduct();
    }, [productCode]);
    const handleSelectProductView = (product) => {
        handleShowModal();
        setProductModal(product);
        setProductCode(product.productCode);
        console.log(product.productCode);
    };

    const getAllSizeProduct = async () => {
        if (productCode !== "") {
            const res = await getListSizeByProductCode(productCode);
            console.log(res);
            setSizes(res.data);
        }
    };
    const limitCharacters = (text, limit) => {
        if (text.length <= limit) {
            return text;
        } else {
            return text.slice(0, limit) + "...";
        }
    };
    if (!products) return <div>load</div>
        return (
            <>
                <div className="container" id="product-home">
                    <div>
                        <div className="row my-3 justify-content-between align-items-end">
                            <div className="col-auto">
                                <h3 className="title-product">SẢN PHẨM KHUYẾN MÃI</h3>
                                <p>Các sản phẩm đang được khuyến mãi</p>
                            </div>
                            <div className="col-auto sort">
                                <span>Sắp xếp theo:</span>
                                <select
                                    className="form-select"
                                    onChange={(value) => changeSortList(value)}
                                >
                                    <option value="ASC">Giá tăng dần</option>
                                    <option value="DESC">Giá giảm dần</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            {products.length == 0 ? (
                                <div className="text-center" style={{height: "50vh"}}>
                                    <p style={{marginTop: "20%"}}>Không có sản phẩm!</p>
                                </div>
                            ) : (
                                <Swiper
                                    breakpoints={{
                                        320: {
                                            slidesPerView: 1,
                                            spaceBetween: 20,
                                        },
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
                                    spaceBetween={50}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    autoplay={{
                                        delay: 100000,
                                        disableOnInteraction: false,
                                    }}
                                    navigation={true}
                                    modules={[Pagination, Navigation, Autoplay]}
                                    loop={true}
                                    className="mySwiper"
                                >
                                    {products.map((item) => (
                                        <SwiperSlide key={item.productId}>
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

                                                    <hr/>

                                                    <p className="card-description">
                                                        {limitCharacters(item.prdDescription, 200)}
                                                    </p>

                                                    {/* <p className="size-product">
                          XS - S - M - L - XL - XXL
                        </p> */}

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
                                                            <span className="percent">
                              {item.percent * 100}%
                            </span>
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
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="row my-3 justify-content-between align-items-end">
                                <div className="col-auto">
                                    <h3 className="title-product">SẢN PHẨM MỚI</h3>
                                    <p>Các sản phẩm mới được cập nhật</p>
                                </div>
                                <div className="col-auto sort">
                                    <span>Sắp xếp theo:</span>
                                    <select
                                        className="form-select"
                                        onChange={(value) => sortNewProduct(value)}
                                    >
                                        <option value="ASC">Giá tăng dần</option>
                                        <option value="DESC">Giá giảm dần</option>
                                    </select>
                                </div>
                            </div>
                            {newestProducts.length == 0 ? (
                                <div className="text-center" style={{height: "50vh"}}>
                                    <p style={{marginTop: "20%"}}>Không có sản phẩm!</p>
                                </div>
                            ) : (
                                <Swiper
                                    breakpoints={{
                                        320: {
                                            slidesPerView: 1,
                                            spaceBetween: 20,
                                        },
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
                                    spaceBetween={50}
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
                                        <SwiperSlide key={item.productId}>
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

                                                    <hr/>
                                                    <p className="card-description">
                                                        {limitCharacters(item.prdDescription, 200)}
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

                                                                <span className="percent">
                                {item.percent * 100}%
                              </span>
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
                                                            <div className="col-lg-auto"></div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    </div>
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
                                    <ImageGallery images={productModal.productImage.split(",")}/>
                                )}
                            </div>
                            <div className="col-lg-6">
                                <h5 className="card-title">{productModal.productName}</h5>
                                <p className="card-text-code">{productModal.productCode}</p>
                                {sizes.map((size) => (
                                    <span className="size-product">{size.name} </span>
                                ))}
                                {/* <p className="size-product">XS - S - M - L - XL - XXL</p> */}
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
                                        <br/>
                                        <span className="mt-3 modal-description">
                    {productModal.prdDescription}{" "}
                  </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
};

export default HomeShowProducts;
