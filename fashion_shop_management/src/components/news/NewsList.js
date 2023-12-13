import {useEffect, useState} from "react";
import "./content.css"
import * as service from "../../services/news/service";

export function NewsList() {

    const [news, setNews] = useState([]);
    const [newsCategoryId, setNewsCategoryId] = useState(1);
    const [category, setCategory] = useState([]);


    const display = async () => {
        try {
            const res = await service.findAll(newsCategoryId)
            console.log(res)
            setNews(res.data);

        } catch (e) {
            console.log(e)
        }


    }
    useEffect(() => {
        display()
    }, []);

    return (
        <>
            <div className="container-xl mt-3">
                {
                    news &&
                    <div className="row gy-3">
                        {
                            news.map((news, index) => (
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="card">
                                        <img className="card-img-top" alt="..." src={news.image}/>
                                        <div className="card-body">
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
        </>

    )
}
