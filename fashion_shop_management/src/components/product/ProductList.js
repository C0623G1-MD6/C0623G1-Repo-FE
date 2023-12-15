import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getAllProducts, getAllSizes, getSizeById} from "../../services/product/ProductService";


function ProductList() {
    const [products, setProducts] = useState([]);
    // const [productName, setProductName] = useState();
    // const [minPrice, setMinPrice] = useState();
    // const [maxPrice, setMaxPrice] = useState();
    // const [sizes, setSizes] = useState([]);
    const [pageable, setPageable] = useState({
        currentPage: 1,
        totalPages: ""
    });

    const getAll = () => {
        getAllProducts().then(res => {
            setProducts(res.content);
            setPageable({...pageable,
            totalPages: res.totalPages})
        });
    };

    useEffect( () => {
        getAll();
    }, []);

    //show item size dropdown
    // const getAllSize = () => {
    //     getAllSizes().then(r => setSizes(r));
    // };
    //
    // useEffect(() => {
    //     getAllSize();
    // }, []);

    // const changeSize = async (e) => {
    //     getAllProducts(e.target.value).then(res => setProducts(res))
    // };

    //pagination
    const hasPrevious = () => {
        const newCurrentPage = pageable.currentPage - 1;
        setPageable({
            ...pageable,
            currentPage: newCurrentPage});
        getAllProducts(newCurrentPage).then(r => setProducts(r.content))
    };

    const hasNext = () => {
        const newCurrentPage = pageable.currentPage + 1;
        setPageable({
            ...pageable,
            currentPage: newCurrentPage});
        getAllProducts(newCurrentPage).then(r => setProducts(r.content))
    };


    if (!products) return null
    // if (!sizes) return null
    return (
        <>
            <div className="col-lg-10 container">
                <div id="loan-products">
                    <div className="product-list shadow-lg border border-light p-3">
                        <div className="text-center text-primary my-3">
                            <h2>Danh sách hàng hóa</h2>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 title">
                                <Link to={"/product/create"}>
                                    <i className="bi bi-plus-lg"/><span> Thêm sản phẩm mới</span></Link>
                            </div>
                            <div className="col-lg-9 search d-flex justify-content-between">
                                <div className="col-lg-auto">
                                    {/*<select onChange={changeSize} className="form-select rounded-0" aria-label="Default select example">*/}
                                    <select className="form-select rounded-0" aria-label="Default select example">
                                        <option selected>Kích thước</option>
                                        {/*{sizes.map((item) =>*/}
                                        {/*    <option value={item.name} key={item.id}>{item.name}</option>*/}
                                        {/*)}*/}
                                    </select>
                                </div>
                                <div className="col-lg-auto">
                                    <select className="form-select rounded-0" aria-label="Default select example">
                                        <option selected>Giá</option>
                                        <option value="1">0 - 500.000 VNĐ</option>
                                        <option value="1">500.000 - 1.000.000 VNĐ</option>
                                        <option value="2">1.000.000 - 2.000.000 VNĐ</option>
                                        <option value="3">Trên 2.000.000 VNĐ</option>
                                    </select>
                                </div>
                                <div className="col-lg-auto">
                                    {/*<input onChange={(e) => setProductName(e.target.value)} value={productName}*/}
                                    {/*       type="text" className="form-control rounded-0" id="searchByName" name="productName"*/}
                                    {/*       placeholder="Tìm kiếm tên sản phẩm..." />*/}
                                    <input type="text" className="form-control rounded-0" id="searchByName" name="productName"
                                           placeholder="Tìm kiếm tên sản phẩm..." />
                                </div>
                                <div className="col-lg-1">
                                    <button className="btn btn-outline-dark rounded-0"><i className="bi bi-search"/>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <table className="table table-hover text-center">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Mã sản phẩm</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Số lượng
                                    <button className="btn btn-border-none"><i className="bi bi-sort-down"/></button>
                                </th>
                                <th scope="col">Kích thước</th>
                                <th scope="col">Đơn giá</th>
                            </tr>
                            </thead>
                            <tbody className="table-group-divider">
                            {products.map((item, index) =>
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.productCode}</td>
                                <td className="product-img">
                                    <div className="col-lg-auto">
                                        <img
                                            src="https://static.zara.net/photos///2024/V/0/1/p/3067/001/400/2/w/563/3067001400_6_1_1.jpg?ts=1701419215549"
                                            alt=""/>
                                    </div>
                                    <div className="col-lg-auto">
                                        <span>{item.productName}</span>
                                    </div>
                                </td>
                                <td>{item.productQuantity}</td>
                                <td>{item.sizeName}</td>
                                <td>{item.productPrice} VNĐ</td>
                            </tr>
                            )}
                            {/*<tr>*/}
                            {/*    <td>1</td>*/}
                            {/*    <td>BL-01</td>*/}
                            {/*    <td className="product-img">*/}
                            {/*        /!*<div className="col-lg-auto">*!/*/}
                            {/*        /!*    <img*!/*/}
                            {/*        /!*        src="https://static.zara.net/photos///2022/I/0/1/p/2753/232/505/2/w/563/2753232505_6_1_1.jpg?ts=1659633117619"*!/*/}
                            {/*        /!*        alt=""/>*!/*/}
                            {/*        /!*</div>*!/*/}
                            {/*        <div className="col-lg-auto">*/}
                            {/*            <span>Áo Blazer</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td>10</td>*/}
                            {/*    <td>M</td>*/}
                            {/*    <td>1.699.000 VNĐ</td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>1</td>*/}
                            {/*    <td>BL-01</td>*/}
                            {/*    <td className="product-img">*/}
                            {/*        /!*<div className="col-lg-auto">*!/*/}
                            {/*        /!*    <img*!/*/}
                            {/*        /!*        src="https://static.zara.net/photos///2022/I/0/1/p/2753/232/505/2/w/563/2753232505_6_1_1.jpg?ts=1659633117619"*!/*/}
                            {/*        /!*        alt=""/>*!/*/}
                            {/*        /!*</div>*!/*/}
                            {/*        <div className="col-lg-auto">*/}
                            {/*            <span>Áo Blazer dáng rộng</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td>10</td>*/}
                            {/*    <td>M</td>*/}
                            {/*    <td>1.699.000 VNĐ</td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>1</td>*/}
                            {/*    <td>BL-01</td>*/}
                            {/*    <td className="product-img">*/}
                            {/*        /!*<div className="col-lg-auto">*!/*/}
                            {/*        /!*    <img*!/*/}
                            {/*        /!*        src="https://static.zara.net/photos///2022/I/0/1/p/2753/232/505/2/w/563/2753232505_6_1_1.jpg?ts=1659633117619"*!/*/}
                            {/*        /!*        alt=""/>*!/*/}
                            {/*        /!*</div>*!/*/}
                            {/*        <div className="col-lg-auto">*/}
                            {/*            <span>Áo Blazer dáng rộng</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td>10</td>*/}
                            {/*    <td>M</td>*/}
                            {/*    <td>1.699.000 VNĐ</td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>1</td>*/}
                            {/*    <td>BL-01</td>*/}
                            {/*    <td className="product-img">*/}
                            {/*        /!*<div className="col-lg-auto">*!/*/}
                            {/*        /!*    <img*!/*/}
                            {/*        /!*        src="https://static.zara.net/photos///2022/I/0/1/p/2753/232/505/2/w/563/2753232505_6_1_1.jpg?ts=1659633117619"*!/*/}
                            {/*        /!*        alt=""/>*!/*/}
                            {/*        /!*</div>*!/*/}
                            {/*        <div className="col-lg-auto">*/}
                            {/*            <span>Áo Blazer dáng rộng</span>*/}
                            {/*        </div>*/}
                            {/*    </td>*/}
                            {/*    <td>10</td>*/}
                            {/*    <td>M</td>*/}
                            {/*    <td>1.699.000 VNĐ</td>*/}
                            {/*</tr>*/}
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end">
                                <li className="page-item disabled">
                                    <button className="page-link" type="button" disabled={pageable.currentPage === 1} onClick={hasPrevious}>&laquo;</button>
                                </li>
                                <li className="page-item"><span className="page-link text-dark" >{pageable.currentPage}</span></li>
                                {/*<li className="page-item"><a className="page-link text-dark" href="#">2</a></li>*/}
                                {/*<li className="page-item"><a className="page-link text-dark" href="#">3</a></li>*/}
                                <li className="page-item">
                                    <button className="page-link text-dark" type="button" disabled={pageable.currentPage === pageable.totalPages} onClick={hasNext}>&raquo;</button>
                                </li>
                            </ul>
                        </nav>


                    </div>
                </div>
            </div>
        </>);

}

export default ProductList;