import {removeCustomer} from "../../services/customer/customerService";
import {toast} from "react-toastify";
import React from "react";

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
                            <div className="modal-content text-center">
                                <div className="modal-header">
                                    <h5 className="modal-title">Xóa Khách Hàng</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                            onClick={close}/>
                                </div>
                                <div className="modal-body">
                                    {/* eslint-disable-next-line react/prop-types */}
                                    <i className="bi bi-exclamation-triangle text-danger" style={{fontSize: "60px"}} id="icon-warning"/>
                                    <h5>Bạn chắn chắn muốn xóa khách hàng <span className="text-danger">{selected.name}</span> này khỏi danh sách ?</h5>
                                                  Hành động này không thể hoàn tác!
                                </div>
                                <div className="modal-footer justify-content-center">
                                    <button type="button" className="btn btn-sm btn-outline-secondary rounded-0" data-bs-dismiss="modal"
                                            onClick={close}>Close
                                    </button>
                                    <button type="button" className="btn btn-sm btn-outline-danger rounded-0 ms-3"
                                            onClick={() => handleDelete(selected)}>Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    // <div className="modal fade" id="staticBackdrop" tabIndex="-1" aria-labelledby="exampleModalLabel"
                    //      aria-hidden="true">
                    //     <div className="modal-dialog">
                    //         <div className="modal-content text-center">
                    //             <div className="modal-body">
                    //                 <i className="bi bi-exclamation-triangle text-danger" style={{fontSize: "60px"}} id="icon-warning"/>
                    //                 <h5>Bạn chắn chắn muốn xóa khách hàng <span className="text-danger">{selected.name}</span> này khỏi danh sách ?</h5>
                    //                 Hành động này không thể hoàn tác!
                    //             </div>
                    //             <div className="modal-footer justify-content-center">
                    //                 <button type="button" className="btn btn-sm btn-outline-secondary rounded-0"
                    //                         data-bs-dismiss="modal" onClick={close}>Hủy
                    //                 </button>
                    //                 <button type="button" className="btn btn-sm btn-outline-danger rounded-0 ms-3"
                    //                         data-bs-dismiss="modal"onClick={()=>handleDelete(selected)}>Xác nhận
                    //                 </button>
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>
                )
            }

        </>
    )
}