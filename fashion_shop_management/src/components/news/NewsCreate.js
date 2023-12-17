import {NavLink} from "react-router-dom";
import {refImage,storage} from "../../services/news/firebase";
import {getDownloadURL, uploadBytes} from "firebase/storage";
import {useState} from "react";
import {toast} from "react-toastify";


export function NewsCreate() {
    const [image, setImage] = useState("");

    const handleImageUpload = async (event) => {
        const files = event.target.files;

        try {
            let file = files[0];
            let storageRef = refImage(storage, `image-fashion/` + file.name);
            let snapshot = await uploadBytes(storageRef, file);
            let downloadURL = await getDownloadURL(snapshot.ref);
            console.log(1111111)
            console.log(downloadURL)
            setImage(downloadURL);
        } catch (e) {
            console.log(e);
        }
    };

    const handleUpload = (value) => {
        if (image == ""){
            toast.error("chưa upload ảnh cho tin tức");
        } else {
            value = {
                ...value,
                img: image
            }
        }
    }

    return (
        <>
            {/*<div className="dashboard-content px-3 py-3 pt-4">*/}
                {/*<div className="my-3 mx-3">*/}
                {/*    <div>*/}
                {/*        <div className="my-4">*/}
                {/*            <div className="row">*/}
                {/*                <div className="col-lg-12">*/}
                {/*                    <h2 style="text-align: center" className="hlptitle text-primary ">Đăng tin tức</h2>*/}
                {/*                    <form>*/}
                {/*                        <div className="mb-3">*/}
                {/*                            <label>Tiêu đề</label>*/}
                {/*                            <input className="form-control"/>*/}
                {/*                        </div>*/}
                {/*                        <div className="mb-3">*/}
                {/*                            <label>Nội dung</label>*/}
                {/*                            <textarea className="form-control"> </textarea>*/}
                {/*                        </div>*/}

                {/*                        <div className="mb-3">*/}
                {/*                            <label>Ngày đăng</label>*/}
                {/*                            <input type="date" className="form-control"/>*/}
                {/*                        </div>*/}
                {/*                        <div className="mb-3">*/}
                {/*                            <label>Chủ đề</label>*/}
                {/*                            <select className="form-control">*/}
                {/*                                <option>Thời trang nam</option>*/}
                {/*                                <option>Thời trang nữ</option>*/}
                {/*                                <option>Mẹo</option>*/}
                {/*                                <option>Khác</option>*/}
                {/*                            </select>*/}
                {/*                        </div>*/}
                {/*                        <div className="mb-3">*/}
                {/*                            <label>Ảnh</label>*/}
            <div style={
                {
                    backgroundImage: `url(${image})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    width: "400px",
                    height: "200px",
                    backgroundColor: "red"
                }
            }></div>
                                            <input type={"file"} onChange={(e) => {handleImageUpload(e)}} className="form-control"/>
        {/*                                </div>*/}
        {/*                                <button style="position: relative;left: 575px" type="submit"*/}
        {/*                                        className="btn btn-outline-primary rounded-0">Đăng tin*/}
        {/*                                </button>*/}
        {/*                            </form>*/}
        {/*                        </div>*/}
        {/*                    </div>*/}
        {/*                </div>*/}
        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        </>
    )
}