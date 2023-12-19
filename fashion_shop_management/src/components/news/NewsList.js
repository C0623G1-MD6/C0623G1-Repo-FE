import {useEffect, useRef, useState} from "react";
import "./content.css"
import * as service from "../../services/news/service";
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import {EffectCoverflow} from 'swiper/modules';
import {useNavigate} from "react-router-dom";
import {TextWithNewLines} from "../../services/news/currentDate";
import Header from "../Header";
import HomeHeader from "../home/HomeHeader";
import HomeFooter from "../home/HomeFooter";

export function NewsList() {

    const [news, setNews] = useState([]);
    const [newsCategoryId, setNewsCategoryId] = useState(1);
    const [promotion, setPromotion] = useState([]);
    const [date, setDate] = useState([]);
    const [role, setRole] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(3);
    const navigate = useNavigate();
    const myBtn = useRef();
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        setScrollPosition(window.scrollY);
    };
    const topFunction = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (scrollPosition > 20) {
            myBtn.current.style.display = "block";
        } else {
            myBtn.current.style.display = "none";
        }
    }, [scrollPosition]);
    const display = async () => {
        try {
            const res = await service.findAll(newsCategoryId, role,currentPage);
            setNews(res.data.content);
            setTotalPages(res.data.totalPages)
            console.log(res.data.content)
        } catch (e) {
            console.log(e)
        }
    }
    const prePage = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    }

    const nextPage = () => {
        setCurrentPage((currentPage) => currentPage + 1);

    }

    ///them route o app.js
    const goDetailsPage = (id) => {
        navigate(`/newsdetail/${id}`);

    }

    const displayPromotion = async () => {
        try {
            const res = await service.getAllByPromotion()
            console.log(res)
            setPromotion(res.data);
        } catch (e) {
            console.log(e)
        }
    }


    const displayDate = async () => {
        try {
            const res = await service.getAllByDateCreate()
            console.log(res)
            setDate(res.data);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        display()
        displayPromotion()
        displayDate()
    }, [role,currentPage]);



    return (
        <>
            <HomeHeader/>
            <div className="container-xl mt-3">
                <h2 className="hlptitle">Khuyến mãi, giảm giá</h2>
                <div>
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 1000,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={true}
                        modules={[EffectCoverflow]}
                        className="mySwiper"
                    >
                        {promotion &&
                            promotion.map((item, index) =>
                                (
                                    <SwiperSlide>
                                        <div>
                                            <div className="hlpcurrentnews" key={index}
                                                 onClick={() => goDetailsPage(item.id)}
                                                 style={{backgroundImage: `url("${item.image}")`}}>
                                            </div>
                                        </div>


                                    </SwiperSlide>
                                ))}

                    </Swiper>
                </div>
                <hr/>
                <h2 className="hlptitle">Tin mới nhất</h2>
                <div className="hlpnewsall">
                    {date && date.length > 0 && (
                        <div className="hlpnewsleft"
                             onClick={() => goDetailsPage(date[0].id)}
                             style={{backgroundImage: `url("${date[0].image}")`}}></div>
                    )}
                    <div style={{overflow: "auto"}}>
                        {date &&
                            date.slice(1).map((item, index) =>
                                (
                                    <div className="hlpnews" onClick={() => goDetailsPage(item.id)}>
                                        <div className="hlpnews-img"
                                             style={{backgroundImage: `url("${item.image}")`}}>
                                        </div>
                                        <div className="hlpnews-content">
                                            <h4>{item.name}</h4>
                                            <p className="hlp-date-text">
                                                <TextWithNewLines text={item.content}/>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                    </div>
                </div>
                <hr/>
                <h2 className="mb-3 mt-3 ph-more-news-title">Danh mục tin tức</h2>
                <div className=" hlpbutton">
                    <button type="button"
                            style={{backgroundImage: "url('https://drifttravel.com/wp-content/uploads/2022/11/Minimalist-Style.jpg')"}}
                            onClick={() => {
                                (setRole(1));
                                setCurrentPage(0)
                            }}
                            className="hlpbutton1 ">Nam
                    </button>
                    <button type="button"
                            style={{backgroundImage: "url('https://lh4.googleusercontent.com/YUkRZRdGXocOUyDRwexbYbM0HcJdZwfRSZ8fllEkPqotYOeFJO9IhvJbm1VQLhwEc3fvk8mStaD9a6fXMM2m4psDJa4x6P9cHup32WVVzZYnNdpj58ciZtLcohFlMemjDs0Ik_CU')"}}
                            onClick={() => {
                                (setRole(2));
                                setCurrentPage(0)
                            }}
                            className="hlpbutton1 ">Nữ
                    </button>
                    <button type="button"
                            style={{backgroundImage: "url('https://www.simplifymyhome.co.nz/cdn/shop/articles/Untitled_1800_x_1200_px.png?v=1674877574')"}}
                            onClick={() => {
                                (setRole(3));
                                setCurrentPage(0)
                            }}
                            className="hlpbutton1 ">Mẹo
                    </button>
                    <button type="button"
                            style={{backgroundImage: "url('https://assets.vogue.com/photos/5e6158b2e40455000851ede2/master/w_2560%2Cc_limit/00_story.jpg')"}}
                            onClick={() => {
                                (setRole(4));
                                setCurrentPage(0)
                            }}
                            className="hlpbutton1 ">Khác
                    </button>
                </div>
                {
                    news &&
                    <div className="row gy-3 mb-5">
                        {
                            news.map((news, index) => (
                                <div className="col-xl-3 col-lg-4 col-md-6 ph-news-card mt-4 mb-4">
                                    <div className="card ph-news-card-content">
                                        <i className="ph-card-hover" onClick={() => goDetailsPage(news.id)}>
                                            <img className="card-img-top" alt="..." src={news.image}/>
                                        </i>
                                        <div className="card-body ph-card-body">
                                            <h5 className="card-title">{news.name}</h5>
                                            <p className="card-text">{news.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination" style={{marginLeft: '44%'}}>
                    <li className="page-item">
                        <button className="page-link  text-secondary" aria-label="Previous" onClick={() => prePage()} tabIndex={-1} disabled={currentPage + 1 <= 1}>
                            <span aria-hidden="true">Trước</span>
                        </button>
                    </li>
                    <li className="page-item"><button className="page-link  text-secondary" >{currentPage + 1}-{totalPages}</button></li>
                    <li className="page-item">
                        <button className="page-link text-secondary" aria-label="Next" disabled={currentPage + 1 >= totalPages} onClick={() => nextPage()}>
                            <span aria-hidden="true">Sau</span>
                        </button>
                    </li>
                </ul>
            </nav>
            <button ref={myBtn} onClick={topFunction} id="myBtn" title="Go to top">TOP</button>


            <HomeFooter/>
        </>


    )
}

