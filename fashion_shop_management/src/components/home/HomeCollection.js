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
                                <div className="ly-news-title">TINH TẾ.</div>
                                <div className="ly-news-content">
                                    Bộ sưu tập giới thiệu các thiết kế mang phong cách học đường
                                    cổ điển pha chút hiện đại.
                                </div>
                            </div>
                            <div className="ly-news-container">
                                <div
                                    className="ly-news-image"
                                    style={{
                                        backgroundImage: `url(${"https://www.uniqlo.com/jp/ja/contents/feature/masterpiece/common_23fw/img/product/item_13_kv.jpg?230731"})`,
                                    }}
                                ></div>
                                <div className="ly-news-title">LÀ CHÍNH MÌNH.</div>
                                <div className="ly-news-content">
                                    Thoải mái thể hiện cá tính thời trang đa dạng cùng dòng sản
                                    phẩm làm từ vải nỉ chất lượng cao, với những thiết kế liên tục
                                    được cải tiến, phom dáng tinh tế, mang lại cảm giác dễ chịu
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
                                <div className="ly-news-title">LÀ CHÍNH MÌNH.</div>
                                <div className="ly-news-content">
                                    Thoải mái thể hiện cá tính thời trang đa dạng cùng dòng sản
                                    phẩm làm từ vải nỉ chất lượng cao, với những thiết kế liên tục
                                    được cải tiến, phom dáng tinh tế, mang lại cảm giác dễ chịu
                                    khi mặc.
                                </div>
                            </div>
                            <div className="ly-news-container">
                                <div
                                    className="ly-news-image"
                                    style={{
                                        backgroundImage: `url(${"https://im.uniqlo.com/global-cms/spa/res97322c88ae3341e45dd65aa3ab4e373bfr.jpg"})`,
                                    }}
                                ></div>
                                <div className="ly-news-title">TINH TẾ</div>
                                <div className="ly-news-content">
                                    Bộ sưu tập giới thiệu các thiết kế mang phong cách học đường
                                    cổ điển pha chút hiện đại.
                                </div>
                            </div>

                            {/* <div className="collection overflow-item">
                <div className="img-container">
                  <img
                    className="collection-img"
                    src="https://image.uniqlo.com/UQ/ST3/ph/imagesother/Feature-Pages/2023_LocalSweat/Women-2.jpg"
                    alt
                  />
                </div>
                <div className="collection-content">
                  <h5 style={{ padding: "0 10px" }}>LÀ CHÍNH MÌNH.</h5>
                  <p style={{ textAlign: "justify" }}>
                    Thoải mái thể hiện cá tính thời trang đa dạng cùng dòng sản
                    phẩm làm từ vải nỉ chất lượng cao, với những thiết kế liên
                    tục được cải tiến, phom dáng tinh tế, mang lại cảm giác dễ
                    chịu khi mặc.
                  </p>
                </div>
              </div> */}

                            {/* <div className="collection overflow-item">
                <div className="img-container">
                  <img
                    className="collection-img"
                    src="https://www.uniqlo.com/jp/ja/news/topics/2023120401/img/mimg_1_m.jpg"
                    alt
                  />
                </div>
                <div className="collection-content">
                  <h5 style={{ padding: "0 10px" }}>ĐA DẠNG.</h5>
                  <p style={{ textAlign: "justify" }}>
                    Thời trang vải nỉ CITY 6 được tạo ra dành cho tất cả mọi
                    người, mặc đi mọi nơi, phù hợp cho mọi dịp.
                  </p>
                </div>
              </div>
              <div className="collection overflow-item">
                <div className="img-container">
                  <img
                    className="collection-img"
                    src="https://www.uniqlo.com/jp/ja/news/topics/2023120101/img/2439T_231128BagbwV.jpg"
                    alt
                  />
                </div>
                <div className="collection-content">
                  <h5 style={{ padding: "0 10px" }}>THOẢI MÁI.</h5>
                  <p style={{ textAlign: "justify" }}>
                    100% cotton mang lại cảm giác mềm mại, thoải mái và dễ chịu
                    khi mặc, giảm hiện tượng vón cục xơ vải và giữ được phom
                    dáng tối đa.
                  </p>
                </div>
              </div>
              <div className="collection overflow-item">
                <div className="img-container">
                  <img
                    className="collection-img"
                    src="https://www.uniqlo.com/jp/ja/news/topics/2023120401/img/2440T_231129Rw0kYY.jpg"
                    alt
                  />
                </div>
                <div className="collection-content">
                  <h5 style={{ padding: "0 10px" }}>CÁ TÍNH.</h5>
                  <p style={{ textAlign: "justify" }}>
                    Kiểu dáng và chất liệu tinh tế, sử dụng chất nỉ DRY cao cấp
                    với khả năng co giãn tối đa.
                  </p>
                </div>
              </div>
              <div className="collection overflow-item">
                <div className="img-container">
                  <img
                    className="collection-img"
                    src="https://www.uniqlo.com/jp/ja/news/topics/2023111701/img/2433T_231114wS1Qqk.jpg"
                    alt
                  />
                </div>
                <div className="collection-content">
                  <h5 style={{ padding: "0 10px" }}>THỜI TRANG.</h5>
                  <p style={{ textAlign: "justify" }}>
                    Thành phần 100% cotton mang lại cảm giác thoải mái dễ chịu.
                  </p>
                </div>
              </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeCollection;
