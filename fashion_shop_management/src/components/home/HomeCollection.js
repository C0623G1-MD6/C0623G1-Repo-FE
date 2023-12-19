import React from "react";

const HomeCollection = () => {
    return (
        <>
            {/* <!-- today pick up --> */}
            <div className="container">
                <div>
                    <h2
                        className="mt-5 mb-3 w-10"
                        style={{textShadow: "0 10px 25px 5px", textAlign: "center"}}
                    >
                        BỘ SƯU TẬP THU ĐÔNG
                    </h2>

                    <div
                        className="collectionAll"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "3fr 2fr",
                        }}
                    >
                        <div
                            className="collectionLeft"
                            style={{
                                width: "calc(100% - 10px)",
                                height: "100%",
                                marginRight: "10px",
                                backgroundColor: "orange",
                                backgroundImage:
                                    'url("https://www.uniqlo.com/jp/ja/news/topics/2023111701/img/mimg_1_m.jpg")',
                            }}
                        />

                        <div className="overflow-handling">
                            <div className="ly-news-container">
                                <div
                                    className="ly-news-image"
                                    style={{
                                        backgroundImage: `url(${"https://www.uniqlo.com/jp/ja/news/topics/2023112001/img/thumb.jpg"})`,
                                    }}
                                ></div>
                                <div className="ly-news-title">LÀ CHÍNH MÌNH.</div>
                                <div className="ly-news-content">
                                    Thoải mái thể hiện cá tính thời trang đa dạng cùng dòng sản
                                    phẩm làm từ vải nỉ chất lượng cao
                                </div>
                            </div>
                            <div className="ly-news-container">
                                <div
                                    className="ly-news-image"
                                    style={{
                                        backgroundImage: `url(${"https://www.uniqlo.com/jp/ja/contents/feature/masterpiece/common_23fw/img/product/item_15_kv.jpg?230731"})`,
                                    }}
                                ></div>
                                <div className="ly-news-title">CÁ TÍNH.</div>
                                <div className="ly-news-content">
                                    Chất nỉ DRY cao cấp với khả năng co giãn tối đa;
                                    màu sắc đa dạng, độc đáo, phù hợp với từng cá tính.
                                </div>
                            </div>
                            <div className="ly-news-container">
                                <div
                                    className="ly-news-image"
                                    style={{
                                        backgroundImage: `url(${"https://www.uniqlo.com/jp/ja/contents/feature/masterpiece/common_23fw/img/product/item_13_kv.jpg?230731"})`,
                                    }}
                                ></div>
                                <div className="ly-news-title">ĐA DẠNG.</div>
                                <div className="ly-news-content">
                                    Thiết kế liên tục được cải tiến, phom dáng tinh tế, mang lại cảm giác dễ chịu
                                    khi mặc.
                                </div>
                            </div>
                            <div className="ly-news-container">
                                <div
                                    className="ly-news-image"
                                    style={{
                                        backgroundImage: `url(${"https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/449753/item/goods_14_449753.jpg?width=300"})`,
                                    }}
                                ></div>
                                <div className="ly-news-title">THOẢI MÁI.</div>
                                <div className="ly-news-content">
                                    Bộ sưu tập giới thiệu các thiết kế mang phong cách hiện đại, phù hợp với mọi hoàn cảnh.
                                </div>
                            </div>
                            <div className="ly-news-container">
                                <div
                                    className="ly-news-image"
                                    style={{
                                        backgroundImage: `url(${"https://im.uniqlo.com/global-cms/spa/res97322c88ae3341e45dd65aa3ab4e373bfr.jpg"})`,
                                    }}
                                ></div>
                                <div className="ly-news-title">THỜI TRANG</div>
                                <div className="ly-news-content">
                                    Các chi tiết được đầu tư tỉ mỉ, khiến bạn luôn tự tin toả sáng.
                                    100% cotton mang lại cảm giác mềm mại, thoải mái và dễ chịu
                                    khi mặc, giảm hiện tượng vón cục xơ vải và giữ được phom
                                    dáng tối đa.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeCollection;
