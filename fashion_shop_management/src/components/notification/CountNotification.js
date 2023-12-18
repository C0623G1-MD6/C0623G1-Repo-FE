import { useEffect, useState } from "react";
import { getCount } from "../../services/notification/notificationService";
import { Link } from "react-router-dom";

export function CountNotification() {
    const [count, setCount] = useState(0); // Initialize count as 0 instead of an array

    useEffect(() => {
        displayCount();
    }, [count]);

    const displayCount = async () => {
        const res = await getCount();
        setCount(res);
    };

    return (
        <>
            <div>
                <button type="button" className="btn  position-relative">
                    <Link to="">
                        <i style={{ fontSize: "larger" }} className="bi bi-bell"></i>
                    </Link>
                    {count > 0 && ( // Chỉ hiển thị số đếm nếu nó lớn hơn 0
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {count}
                            <span className="visually-hidden">unread messages</span>
            </span>
                    )}
                </button>
            </div>
        </>
    );
}