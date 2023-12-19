import "../notification/form_css.css"
import {useEffect, useState} from "react";
import {getAll, readNotification} from "../../services/notification/notificationService";
import {Field} from "formik";

export function ListNotification() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.roles)
    const [notification, setNotification] = useState([]);

    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);


    useEffect(() => {
        display()

    }, [page]);

    const display = async () => {
        const res = await getAll(page,user.roles);
        setTotalPage(res.data.totalPages);
        setNotification(res.data.content);
    }

    const handleDelete = async (notificationId) => {
        await readNotification(notificationId);
        display();
    };


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
                    <div className="box-title  p-3">
                        <h6 className="m-0">Thông báo</h6>
                    </div>
                    <div className="box-body p-0 bg-light" style={{height: "32rem"}}>
                        {notification.map((notifi) => (
                            <div className="p-3 d-flex  bg-light border-bottom  osahan-post-header">
                                <div className="font-weight-bold mr-3 ">
                                    <div key={notifi.id}>
                                        <div
                                            className="text-truncate fw-bolder">{notifi.title} </div>
                                        <div
                                            className="small fw-semibold">{formatDateTime(notifi.noticePostingDate)}</div>
                                        <div className="small fw-normal">{notifi.content}</div>
                                    </div>
                                </div>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id={`flexSwitchCheckChecked-${notifi.id}`}
                                        onChange={() => handleDelete(notifi.id)}
                                        checked={notifi.deleted} // Set checkbox checked if the notification is not deleted
                                        disabled={!notifi.deleted} // Disable checkbox if the notification is already deleted
                                    />
                                    <label className="form-check-label" htmlFor={`flexSwitchCheckChecked-${notifi.id}`}>
                                        Checked switch checkbox input
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-end bg-light  osahan-post-header pt-3">
                        <div className="font-weight-bold mr-3 ">
                            <div>
                                {notification && notification.length !== 0 ? (
                                    <div className="col-md-6 d-flex justify-content-between  mb-3">
                                        <button className="btn btn-outline-secondary "
                                                onClick={() => prevPage()}>
                                            <i className="bi bi-skip-backward"></i>
                                        </button>
                                        <span className="btn btn-outline-secondary ">
                                     {page + 1}/{totalPage}
                                 </span>
                                        <button className="btn btn-outline-secondary " onClick={() => nextPage()}>
                                            <span> <i className="bi bi-skip-forward"></i></span>
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
        </>
    )
}