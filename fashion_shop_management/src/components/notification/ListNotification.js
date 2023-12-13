import "../notification/form_css.css"
import {useEffect, useState} from "react";
import {getAll} from "../../services/notification/notificationService";

export function ListNotification() {
    const [notification, setNotification] = useState([]);

    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        display()

    }, [page]);

    const display = async () => {
        const res = await getAll(page);
        console.log(res.data.totalPages)
        setTotalPage(res.data.totalPages);
        console.log(res.data.content)
        setNotification(res.data.content);
    }

    const nextPage = () => {
        if (page + 1 < totalPage) {
            setPage((prev) => prev + 1)
        }
    }
    const prevPage = () => {
        if (page > 0) {
            setPage((prev) => prev - 1)
        }
    }


    function formatDateTime(dateTime) {
        let formattedDate = new Date(dateTime);
        let year = formattedDate.getFullYear();
        let month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
        let day = formattedDate.getDate().toString().padStart(2, "0");
        let hours = formattedDate.getHours().toString().padStart(2, "0");
        let minutes = formattedDate.getMinutes().toString().padStart(2, "0");
        let seconds = formattedDate.getSeconds().toString().padStart(2, "0");
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    return (

        <>
            <div className="row">
                <div className="box shadow-sm rounded bg-white mb-3 p-3">
                    <div className="box-title border-bottom p-3">
                        <h6 className="m-0">Thông báo</h6>
                    </div>
                    <div className="box-body p-0">
                        <div className="p-3 d-flex  bg-light  osahan-post-header"
                             style={{height: "30rem"}}>
                            <div className="font-weight-bold mr-3 pb-3">
                                {notification.map((notifi) => (
                                    <div key={notifi.id}>
                                        <div
                                            className="text-truncate fw-bolder">{notifi.title} </div>
                                        <div className="small mb-3 fw-semibold">{formatDateTime(notifi.noticePostingDate)}</div>
                                        <div className="small mb-3 fw-normal">{notifi.content}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center bg-light  osahan-post-header pt-3">
                        <div className="font-weight-bold mr-3 ">
                            <div>
                                {notification && notification.length !== 0 ? (
                                    <div className="col-md-6 d-flex justify-content-between  mb-3">
                                        <button className="btn btn-outline-secondary "
                                                onClick={() => prevPage()}>
                                            <i className="fa-solid fa-forward fa-rotate-180" ></i>
                                        </button>
                                        <span className="btn btn-outline-secondary " >
                                     {page + 1}/{totalPage}
                                 </span>
                                        <button className="btn btn-outline-secondary " onClick={() => nextPage()}>
                                            <span> <i className="fa-solid fa-forward"></i></span>
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}