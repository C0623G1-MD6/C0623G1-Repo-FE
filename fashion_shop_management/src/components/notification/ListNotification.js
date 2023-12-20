import "../notification/form_css.css"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllNotificationById, readNotificationMiddleware} from "../../redux/middlewares/NotificationMiddleware";
import Pagination from "../pagination/Pagination";

export function ListNotification() {
    const user = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    const notificationRedux = useSelector((store) => store.notification.notifications);
    const notification = notificationRedux.content;
    const notificationNotView = useSelector((store) => store.notification.notificationNotView);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getAllNoti()
    }, [dispatch,page]);
    //
    const getAllNoti = async () => {
        await dispatch(getAllNotificationById(page, user.id));
    }
    const handlePageChange = async (pageNumber) => {
        setPage(pageNumber);
    };

    const readNotification = async (notificationId) => {
       await dispatch(readNotificationMiddleware(notificationId));
    };

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
            <div className="my-3">
                <Pagination totalPages={notificationRedux.totalPages} page={notificationRedux.number} onPageChange={handlePageChange}/>
            </div>
        </>
    )
}