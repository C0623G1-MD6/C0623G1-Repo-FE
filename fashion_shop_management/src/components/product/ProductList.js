import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getAllProducts, getAllSizes} from "../../services/product/ProductService";
import Pagination from "antd/es/pagination";
import AccessDenied from "../auth/AccessDenied";
import DashboardManager from "../DashboardManager";
import DashboardWarehouse from "../DashboardWarehouse";
import DashboardSale from "../DashboardSale";


function ProductList() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    console.log(user)
    const [products, setProducts] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [pageable, setPageable] = useState({
        currentPage: 1,
        totalPages: "",
        productName: "",
        sizeName: "",
        minPrice: 100000,
        maxPrice: 100000000,
        sortDirection: "asc"
    });

    const getAll = async (currentPage, productName, sizeName, minPrice, maxPrice, sortDirection) => {
        let data = await getAllProducts(currentPage, productName, sizeName, minPrice, maxPrice, sortDirection);
        console.log(data)
        setProducts(data.content);
        setPageable({
            ...pageable,
            totalPages: data.totalElements,
            currentPage: currentPage
        });
    };

    useEffect(() => {
        getAll(pageable.currentPage, pageable.productName, pageable.sizeName, pageable.minPrice, pageable.maxPrice, pageable.sortDirection);
    }, [pageable.sortDirection]);


    // show item size dropdown
    const getAllSize = () => {
        getAllSizes().then(r => setSizes(r));
    };

    useEffect(() => {
        getAllSize();
    }, []);

    const changeSize = async (e) => {
        setPageable({
            ...pageable,
            sizeName: e.target.value
        })
    };

    const changePrice = async (e) => {
        const price = [
            {
                minPrice: 0,
                maxPrice: 100000000
            },
            {
                minPrice: 500000,
                maxPrice: 1000000
            },
            {
                minPrice: 1000001,
                maxPrice: 2000000
            },
            {
                minPrice: 2000001,
                maxPrice: 100000000
            }
        ];
        const index = +e.target.value;
        setPageable({
            ...pageable,
            minPrice: price.at(index).minPrice,
            maxPrice: price.at(index).maxPrice
        });
    };

    const changeProductName = async (e) => {
        setPageable({
            ...pageable,
            productName: e.target.value
        })
    };

    const searching = () => {
        getAll(1, pageable.productName, pageable.sizeName, pageable.minPrice, pageable.maxPrice, pageable.sortDirection);
    };

    const sortByQuantity = async () => {
        const newSortDirection = pageable.sortDirection === "asc" ? "desc" : "asc";
        setPageable({
            ...pageable,
            sortDirection: newSortDirection
        });
        console.log(pageable.sortDirection);
        // getAll(pageable.currentPage, pageable.productName, pageable.sizeName, pageable.minPrice, pageable.maxPrice, pageable.sortDirection);
    };


    //pagination
    const handleChange = (page) => {
        getAll(page, pageable.productName, pageable.sizeName, pageable.minPrice, pageable.maxPrice, pageable.sortDirection);
    };

    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a className='btn btn-outline-primary' type='button'>&laquo;</a>
        }
        if (type === 'next') {
            return <a className='btn btn-outline-primary' type='button'>&raquo;</a>
        }
        return originalElement;
    };

    if (!products) return null;

    // if (!sizes) return null
    return (
        <>
            <div className="col-lg-12 container">
                <div id="loan-products">
                    <div className="product-list shadow-lg border border-light p-3">
                        <div className="text-center text-primary my-3">
                            <h2>Danh sách hàng hóa</h2>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 title">
                                {user.roles[0] === "ROLE_WAREHOUSE" ? (
                                    <Link to={"/product/create"}>
                                        <i className="bi bi-plus-lg"/><span> Thêm sản phẩm mới</span>
                                    </Link>
                                ) :
                                    ("")
                                }
                            </div>
                            <div className="col-lg-9 search d-flex justify-content-between">
                                <div className="col-lg-auto">
                                    <select defaultValue="" onChange={changeSize} className="form-select rounded-0"
                                            aria-label="Default select example">
                                        <option value="" selected>Kích thước</option>
                                        {sizes.map((item) =>
                                            <option value={item.name} key={item.id}>{item.name}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-lg-auto">
                                    <select defaultValue="0" onChange={changePrice}
                                            className="form-select rounded-0"
                                            aria-label="Default select example">
                                        <option value="0" selected>Giá</option>
                                        <option value="1">100.000 - 500.000 VNĐ</option>
                                        <option value="2">500.000 - 1.000.000 VNĐ</option>
                                        <option value="3">1.000.000 - 2.000.000 VNĐ</option>
                                        <option value="4">Trên 2.000.000 VNĐ</option>
                                    </select>
                                </div>
                                <div className="col-lg-auto">
                                    <input onChange={changeProductName} type="text"
                                           className="form-control rounded-0"
                                           id="searchByName" name="productName"
                                           placeholder="Tìm kiếm tên sản phẩm..."/>
                                </div>
                                <div className="col-lg-1">
                                    <button onClick={searching} className="btn btn-outline-dark rounded-0"><i
                                        className="bi bi-search"/>
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
                                    <button onClick={sortByQuantity} className="btn btn-border-none"><i
                                        className="bi bi-sort-down"/></button>
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
                                    <td className="text-lg-start">
                                        {/*<td className="product-img">*/}
                                        {/*<div className="col-lg-auto">*/}
                                        {/*    <img*/}
                                        {/*        src={item.productImage.split(",")[0]}*/}
                                        {/*        alt="product image"/>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-lg-auto">*/}
                                        <span>{item.productName}</span>
                                        {/*</div>*/}
                                    </td>
                                    <td className={item.productQuantity <= 5 ? 'text-danger' : 'text-dark'}>{item.productQuantity}</td>
                                    <td>{item.sizeName}</td>
                                    <td>{item.productPrice.toLocaleString('vi-VN')} VNĐ</td>
                                </tr>
                            )}
                            </tbody>
                        </table>

                        <div style={{textAlign: 'right', marginTop: '15px', marginBottom: '15px'}}>
                            <Pagination current={pageable.currentPage} hideOnSinglePage={true}
                                        total={pageable.totalPages} pageSize={5} onChange={handleChange}
                                        itemRender={itemRender}/>
                        </div>
                    </div>
                </div>
            </div>
        </>);

}

export default ProductList;