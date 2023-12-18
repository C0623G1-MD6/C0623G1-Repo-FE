import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './content.css';
import * as service from "../../services/news/service";
import {formatLocalDateTime, TextWithNewLines} from "../../services/news/currentDate";
import HomeHeader from "../home/HomeHeader";
import HomeFooter from "../home/HomeFooter";


function NewsDetail() {
    const {id} = useParams();
    const [detail, setDetail] = useState({});
    const [another, setAnother] = useState([]);
    const navigate = useNavigate();

    const goDetailsPage = (id) => {
        navigate(`/newsdetail/${id}`);

    }

    const displayDetail = async () => {
        const res = await service.getNewsDetails(id)
        console.log(res)
        setDetail(res.data);
    }

    const displayAnother = async () => {
        try {
            const res = await service.getAllAnother()
            setAnother(res.data);
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        displayDetail();
        displayAnother();
    }, [id]);

    const getCategoryName = (value) => {
        if (value === 1) {
            return "Thời trang nam";
        } else if (value === 2) {
            return "Thời trang nữ";
        } else if (value === 3) {
            return "Mẹo";
        } else if (value === 4) {
            return "Khuyến mãi";
        } else {
            return "";
        }
    }

    return (
        <>
            <HomeHeader/>
            <div className="ph-new-details-wrapper row">

                <div className="col-xl-8">
                    <p className="ph-new-details-title mt-5 mb-5">
                        {detail.name}
                    </p>
                    <div className="ph-new-detail-head mb-5">
                        <img
                            src={detail.image}
                            alt="new img" className="ph-new-details-img"/>
                    </div>
                    <div className="">

                        <strong>{getCategoryName(detail.newsCategoryId)}</strong>
                        <hr/>
                        <p className="ph-new-details-content">
                            <TextWithNewLines text={detail.content}/>
                        </p>
                        <center className="fst-italic">Tác giả: Phước Hưng</center>
                        <p className="ph-new-details-date">
                            Ngày tạo: {formatLocalDateTime(detail.dateCreate)}
                        </p>
                    </div>
                </div>


                <div className="col-xl-4">
                    <div className="more-news mt-5 mb-3">
                        Tin tức khác
                    </div>
                    <div style={{overflow: "scroll",maxHeight:"500px"}}>
                        {another &&
                            another.map((item, index) =>
                                (
                                    <div className="hlpdetail" onClick={() => goDetailsPage(item.id)}>
                                        <div className="hlpdetail-img"
                                             style={{backgroundImage: `url("${item.image}")`}}>
                                        </div>
                                        <div className="hlpdetail-content">
                                            <h4>{item.name}</h4>

                                        </div>
                                    </div>
                                ))}
                    </div>
                </div>
            </div>
            <HomeFooter/>
        </>
    )
}


export default NewsDetail;