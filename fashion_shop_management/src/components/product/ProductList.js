import {Link} from "react-router-dom";
import  {useEffect, useState} from "react";
import {getAllProducts, getAllSizes, showMsgWarning} from "../../services/product/ProductService";
import AccessDenied from "../auth/AccessDenied";
import DashboardManager from "../DashboardManager";
import DashboardWarehouse from "../DashboardWarehouse";
import DashboardSale from "../DashboardSale";
// import Pagination from "../pagination/Pagination";
import React from "react"
import {Pagination} from "antd";

function ProductList() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [products, setProducts] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [pageable, setPageable] = useState({
        currentPage: 1,
        totalPage: "",
        productName: "",
        productCode: "",
        sizeName: "",
        minPrice: 100000,
        maxPrice: 100000000,
        sortDirection: "desc",
        sortBy: "createdDate"
    });
    const getAll = (currentPage, productName, productCode, sizeName, minPrice, maxPrice, sortDirection, sortBy) => {
        getAllProducts(currentPage, productName, productCode, sizeName, minPrice, maxPrice, sortDirection, sortBy).then((res) => {
            setProducts(res.content);
            setPageable(prevState => {
                return {...prevState, totalPage: res.totalElements, currentPage: currentPage}
            });
        });

    };

    useEffect(() => {
        getAll(pageable.currentPage, pageable.productName, pageable.productCode, pageable.sizeName, pageable.minPrice, pageable.maxPrice, pageable.sortDirection, pageable.sortBy);
    }, [pageable.sortDirection]);

    const handlePageChange = (pageNumber) => {
        setPageable(prevState => (
            {
                ...prevState,
                currentPage: pageNumber
            }
        ));
    };

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
                minPrice: 100000,
                maxPrice: 500000
            },
            {
                minPrice: 500001,
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
                productName: e.target.value.trim()
            })

    };

    const changeProductCode = async (e) => {
        setPageable({
            ...pageable,
            productCode: e.target.value.trim()
        })
    };

    const searching = () => {
        const isValidProductName = dontContainsSpecialCharacters(pageable.productName);
        const isValidProductCode = dontContainsSpecialCharacters(pageable.productCode);
  
        if (!isValidProductCode && !isValidProductName) {
            showMsgWarning("Tên sản phẩm và mã sản phẩm không hợp lệ!")
        } else if (!isValidProductName && pageable.productName !== "") {
            showMsgWarning("Tên sản phẩm không hợp lệ!")
        } else if (!isValidProductCode) {
            showMsgWarning("Mã sản phẩm không hợp lệ!")
        } else {
            getAll(1, pageable.productName, pageable.productCode, pageable.sizeName,
                pageable.minPrice, pageable.maxPrice, pageable.sortDirection, pageable.sortBy);
        }
        // if (dontContainsSpecialCharacters(pageable.productName) && dontContainsSpecialCharacters(pageable.productCode)) {
        //     getAll(0, pageable.productName, pageable.productCode, pageable.sizeName, pageable.minPrice, pageable.maxPrice, pageable.sortDirection, pageable.sortBy);
        // } else {
        //     showMsgWarning("Tên sản phẩm không hợp lệ!")
        // }
    };

    const sortBy = (e) => {
        const newSortDirection = pageable.sortDirection === "asc" ? "desc" : "asc";
        setPageable({
            ...pageable,
            sortDirection: newSortDirection,
            sortBy: e
        });
    };


    //pagination
    const handleChange = (page) => {
        getAll(page, pageable.productName, pageable.productCode, pageable.sizeName, pageable.minPrice, pageable.maxPrice, pageable.sortDirection, pageable.sortBy);
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

    const dontContainsSpecialCharacters = (string) => {
        const regex = /^[^!@#$%^&*()_+={}\[\]:;,<.>?\\\/'"]*$/;
        return regex.test(string);
    };

    if (!products) return null;

    return (
        <>

            <div className="col-lg-12">
                <div id="loan-products">
                    <div className="product-list shadow border border-light p-3" >
                        <div className="text-center text-primary my-3">
                            <h2 className="fw-bold">DANH SÁCH SẢN PHẨM</h2>
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
                            <div className="col-lg-9 search ">
                                <div className="row justify-content-between">
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
                                        <input onChange={changeProductCode} type="text"
                                               className="form-control rounded-0"
                                               id="searchByCode" name="productCode"
                                               placeholder="Tìm kiếm mã sản phẩm..."/>
                                    </div>
                                    <div className="col-lg-auto">
                                        <input onBlur={changeProductName} type="text"
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
                        </div>
                        <table className="table table-hover table-bordered text-center mb-3">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Mã sản phẩm
                                    <span onClick={() => sortBy("productCode")} className="ms-1"><i
                                        className="bi bi-sort-down"/></span>
                                </th>
                                <th scope="col">Tên sản phẩm
                                    <span onClick={() => sortBy("productName")} className="ms-1"><i
                                        className="bi bi-sort-down"/></span>
                                </th>
                                <th scope="col">
                                    Số lượng
                                    <span onClick={() => sortBy("productQuantity")} className="ms-1"><i
                                        className="bi bi-sort-down"/></span>
                                </th>
                                <th scope="col">Kích thước
                                    <span onClick={() => sortBy("sizeName")} className="ms-1"><i
                                        className="bi bi-sort-down"/></span>
                                </th>
                                <th scope="col">Đơn giá /<sub>1SP</sub>
                                    <span onClick={() => sortBy("productPrice")} className="ms-1"><i
                                        className="bi bi-sort-down"/></span>
                                </th>
                            </tr>
                            </thead>


                                {!products.length ?
                                    <tbody>
                                    <tr className="justify-content-center">
                                        <td colSpan="6" className="text-danger fs-5">
                                            Sản phẩm không tồn tại
                                        </td>
                                    </tr>
                                    </tbody>
                                    :
                                    <>
                                        <tbody className="table-group-divider" >
                                        {products.map((item, index) =>
                                            <tr key={item.id}>
                                                <td style={{width: "5%"}}>{index + 1}</td>
                                                <td style={{width: "15%"}}>{item.productCode}</td>
                                                <td className="text-lg-start" style={{width: "40%"}}>
                                                    {/*<td className="product-img">*/}
                                                    {/*<div className="col-lg-auto">*/}
                                                    {/*    <img*/}
                                                    {/*        src={item.productImage.split(",")[0]}*/}
                                                    {/*        alt="product image"/>*/}
                                                    {/*</div>*/}
                                                    {/*<div className="col-lg-auto">*/}
                                                    {item.productName}
                                                    {/*</div>*/}
                                                </td>
                                                <td style={{width: "10%"}}
                                                    className={item.productQuantity <= 5 ? 'text-danger' : 'text-dark'}>{item.productQuantity}</td>
                                                <td style={{width: "15%"}}>{item.sizeName}</td>
                                                <td style={{width: "15%"}}>{item.productPrice.toLocaleString('vi-VN')} VNĐ</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </>
                                }

                        </table>

                        <div style={{textAlign: 'right', marginTop: '15px', marginBottom: '15px'}}>
                                <Pagination  current={pageable.currentPage} hideOnSinglePage={true}
                                             total={pageable.totalPage} pageSize={5} onChange={handleChange}
                                             itemRender={itemRender} showSizeChanger={false} />
                        </div>

                            {/*{pageable.totalPage > 0 && (<Pagination page={pageable.currentPage} totalPages={pageable.totalPage}*/}
                            {/*                                        onPageChange={handleChange}/>*/}
                            {/*)}*/}


                    </div>
                </div>
            </div>


        </>);

}

export default ProductList;