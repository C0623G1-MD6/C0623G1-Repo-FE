import {removeCustomer} from "../../services/customer/customerService";
import {toast} from "react-toastify";

export function DeleteCustomer(props) {
    const {show, selected, close} = props

    const handleDelete = async (data) => {
        const res = await removeCustomer(data.id)
        if (res.status === 200) {
            close();
            toast.success("Xóa Thành Công")
        } else {
            toast.error("Lỗi")
        }
    }
    return (
        <>
            {
                show && (
                    <div className="modal" tabIndex="-1" style={{display: 'block'}}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Xóa Khách Hàng</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                            onClick={close}/>
                                </div>
                                <div className="modal-body">
                                    {/* eslint-disable-next-line react/prop-types */}
                                    <p>Bạn Có Chắc Chắn Muốn Xóa {selected.name}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                            onClick={close}>Close
                                    </button>
                                    <button type="button" className="btn btn-primary"
                                            onClick={() => handleDelete(selected)}>Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}