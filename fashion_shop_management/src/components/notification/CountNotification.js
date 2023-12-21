import {useEffect, useState} from "react";
import {getCount} from "../../services/notification/notificationService";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getNotificationNotView, readNotificationMiddleware} from "../../redux/middlewares/NotificationMiddleware";
import Dropdown from "react-bootstrap/Dropdown";
import {Button} from "antd";
import {ButtonGroup} from "react-bootstrap";

export function CountNotification() {
    const dispatch = useDispatch();
    const listNotificationNotView = useSelector((store) => store.notification.notificationNotView);
    let count = listNotificationNotView.length;
    useEffect(() => {
        getListNotificationNotView()
    }, [dispatch]);

    const getListNotificationNotView = async () => {
        await dispatch(getNotificationNotView());
    }

    const readNotification = async (notificationId) => {
        await dispatch(readNotificationMiddleware(notificationId));
    };
    if (!listNotificationNotView) {
        return undefined;
    }
    return (
        <>
            <div>
                <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle id="dropdown-custom-1" className="bg-white border-0">
                        <i className="bi bi-bell text-dark"></i>
                        <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{count}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="p-0" style={{maxHeight: "32rem", overflowY: 'auto'}}>
                        {count === 0 ? (
                            <div className="box-title p-3">
                                <h6 className="m-0">Hiện không có thông báo mới !</h6>
                            </div>
                        ) : (
                            <>
                                <div className="box-title p-3">
                                    <h6 className="m-0">Thông báo quan trọng cần xem!</h6>
                                </div>
                                <div id="drowdown-notification" className="box-body p-0 bg-light">
                                    {listNotificationNotView.map((notifi) => (
                                        <div key={notifi.id}
                                             className="p-3 d-flex bg-light border-bottom justify-content-between">
                                            <div className="col-lg-11 mr-3 ">
                                                <div className="fw-bolder">{notifi.title}</div>
                                                <div className="small fw-semibold">{notifi.noticePostingDate}</div>
                                                <div className="small fw-normal">{notifi.content}</div>
                                            </div>
                                            <div className="col-lg-1 form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    id={`flexSwitchCheckChecked-${notifi.id}`}
                                                    onChange={() => readNotification(notifi.id)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )
                        }

                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    );
}