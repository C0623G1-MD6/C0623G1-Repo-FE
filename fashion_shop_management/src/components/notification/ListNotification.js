import "../notification/form_css.css"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllNotificationById, readNotificationMiddleware} from "../../redux/middlewares/NotificationMiddleware";

export function ListNotification() {
    const user = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    const notificationRedux = useSelector((store) => store.notification.notifications);
    const notification = notificationRedux.content;
    const notificationNotView = useSelector((store) => store.notification.notificationNotView);
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        getAllNoti()
    }, [dispatch]);
    //
    const getAllNoti = async () => {
        await dispatch(getAllNotificationById(page, user.id));
    }

    const readNotification = async (notificationId) => {
       await dispatch(readNotificationMiddleware(notificationId));
    };


    const nextPage = async () => {
        if (page < notificationRedux.totalPages - 1) {
            setPage(page + 1);
        }
        await dispatch(getAllNotificationById(page, user.id));
    }
    const prevPage = async () => {
        if (page > 0) {
            setPage(page - 1);
        }
        await dispatch(getAllNotificationById(page, user.id));
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

    if (!notification || !notificationNotView) {
        return undefined;
    }
    return (

        <>
            <div className="box-title  p-3">
                <h6 className="m-0">Thông báo quan trọng cần xem !</h6>
            </div>
            <div className="box-body p-0 bg-light" style={{height: "32rem"}}>
                {notification.map((notifi) => (
                    <div key={notifi.id}
                         className="p-3 d-flex  bg-light border-bottom osahan-post-header justify-content-between">
                        <div className="font-weight-bold mr-3 ">
                            <div>
                                <div
                                    className="text-truncate fw-bolder">{notifi.title} </div>
                                <div
                                    className="small fw-semibold">{formatDateTime(notifi.noticePostingDate)}</div>
                                <div className="small fw-normal">{notifi.content}</div>
                            </div>
                        </div>
                        {notificationNotView.some((notView) => notView.id === notifi.id) ? (
                            <div className="form-check">
                                <label className="form-check-label" htmlFor={`flexSwitchCheckChecked-${notifi.id}`}>
                                    Đánh dấu đã đọc
                                </label>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`flexSwitchCheckChecked-${notifi.id}`}
                                    onChange={() => readNotification(notifi.id)}
                                />
                            </div>
                        ) : (
                            <div>
                                <i className="bi bi-check2-circle"></i> Đã đọc
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-end bg-light  osahan-post-header pt-3">
                <div className="font-weight-bold mr-3 ">
                    <div>
                        {notification && notification.length !== 0 ? (
                            <div className="col-md-6 d-flex justify-content-between  mb-3">
                                <button disabled={notificationRedux.number === 0} className="btn btn-outline-secondary "
                                        onClick={() => prevPage()}>
                                    <i className="bi bi-skip-backward"></i>
                                </button>
                                <span className="btn btn-outline-secondary ">
                                     {notificationRedux.number + 1}/{notificationRedux.totalPages}
                                 </span>
                                <button disabled={notificationRedux.number === notificationRedux.totalPages - 1} className="btn btn-outline-secondary " onClick={() => nextPage()}>
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