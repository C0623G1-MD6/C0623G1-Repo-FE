import {useNavigate} from "react-router-dom";
import {refImage, storage} from "../../services/news/firebase";
import {getDownloadURL, uploadBytes} from "firebase/storage";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import * as service from "../../services/news/service";
import * as Yup from "yup";
import {ErrorMessage, Field, Formik, Form} from "formik";


export function NewsCreate() {
    const [image, setImage] = useState("https://t3.ftcdn.net/jpg/01/80/31/10/360_F_180311099_Vlj8ufdHvec4onKSDLxxdrNiP6yX4PnP.jpg");
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const inputImg = useRef();

    useEffect(() => {
        findAllCategory();
    }, [])

    const findAllCategory = async () => {
        let res = await service.getAllCategory()
        setCategory(res.data)
        console.log(res.data);
    }
    const create = async (news) => {
        console.log(news)
        if (image === "") {
            toast.error("Chưa upload ảnh cho tin tức");
        } else {
            let cateId = news.newsCategoryId
            if (cateId !== null) {
                news = {
                    ...news,
                    image: image,
                    newsCategoryId: cateId,
                    deleted: false,
                }
                console.log(news)
                // const data = {...news, category: JSON.parse(news.category)}
                const status = await service.createNews(news)
                if (status === 201) {
                    toast.success("Đăng tin tức thành công");
                    navigate("/")
                } else {
                    toast.error("Đăng tin lỗi")

                }
            }
        }
    }
    const handleImageUpload = async (event) => {
        const files = event.target.files;
        try {
            let file = files[0];
            let storageRef = refImage(storage, `image-fashion/` + file.name);
            let snapshot = await uploadBytes(storageRef, file);
            let downloadURL = await getDownloadURL(snapshot.ref);
            console.log(downloadURL)
            setImage(downloadURL);
        } catch (e) {
            console.log(e);
        }
    };

    const initValues = {
        name: "",
        content: "",
        image: "",
        dateCreate: new Date(),
        newsCategoryId: 1
    }

    const validateObject = {
        name: Yup.string()
            .required("Vui lòng nhập trường này.")
            .max(200, "Vượt quá số lượng kí tự cho phép̣.")
            .min(5, "Vượt quá số lượng kí tự cho phép̣.")
            .matches("^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+( ([AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ]|[aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz])[aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)+$", "Tiêu đề không đúng định dạng."),
        content: Yup.string()
            .required("Vui lòng nhập trường này.")
            .max(20000, "Vượt quá số lượng kí tự cho phép̣.")
            .min(5, "Vượt quá số lượng kí tự cho phép̣.")
            .trim("Không đúng định dạng")
    }

    if (!category) {
        return null;
    } else {
        return (
            <>
                <Formik
                    initialValues={initValues}
                    onSubmit={value => create(value)}
                    validationSchema={Yup.object(validateObject)}
                >
                    <div className="dashboard-content px-3 py-3 pt-4">
                        <div className="my-3 mx-3">
                            <div>
                                <div className="my-4">
                                    <div className="row">
                                        <div className="col-lg-12 create-news">
                                            <h2 className="hlptitle hlptitle fw-bold text-primary">Đăng tin
                                                tức</h2>
                                            <Form>
                                                <div className="mb-3">
                                                    <label>Tiêu đề</label>
                                                    <Field type='text' name="name" id='name'
                                                           className="form-control"/>
                                                    <ErrorMessage name="name" component="span"
                                                                  style={{color: "red"}}></ErrorMessage>
                                                </div>
                                                <div className="mb-3">
                                                    <label>Nội dung</label>
                                                    <Field
                                                        className='form-control'
                                                        as="textarea"
                                                        placeholder=""
                                                        id="content"
                                                        name="content"
                                                        rows="5"
                                                        required=""
                                                    />
                                                    <ErrorMessage name="content" component="span"
                                                                  style={{color: "red"}}></ErrorMessage>
                                                </div>

                                                <div className="mb-3" hidden={true}>
                                                    <label>Ngày đăng</label>
                                                    <Field type='datetime-local ' name="dateCreate"
                                                           className='form-control' id='dateCreate'/>
                                                    <ErrorMessage name="dateCreate" component="span"
                                                                  style={{color: "red"}}></ErrorMessage>
                                                </div>
                                                <div className="mb-3">
                                                    <label>Chủ đề</label>
                                                    <Field as="select" className='form-control'
                                                           name="newsCategoryId">
                                                        {category.map(category => (
                                                            <option key={category.id}
                                                                    value={category.id}>{category.name}</option>
                                                        ))}
                                                    </Field>

                                                </div>
                                                <div className="mb-3">
                                                    <label>Ảnh</label>
                                                    <input ref={inputImg} type={"file"} onChange={(e) => {
                                                        handleImageUpload(e)
                                                    }} className="form-control"
                                                           hidden={true}
                                                    />
                                                </div>
                                                <div style={
                                                    {
                                                        backgroundImage: `url(${image})`,
                                                        backgroundPosition: "center",
                                                        backgroundSize: "cover",
                                                        width: "400px",
                                                        aspectRatio: "16/9",
                                                        backgroundColor: "white",
                                                        border: "black 1px solid",
                                                        marginBottom: "10px",
                                                        cursor: "pointer"
                                                    }
                                                }
                                                     onClick={() => {
                                                         inputImg.current.click()
                                                     }}
                                                ></div>
                                                <div>
                                                    <button type="submit"
                                                            className="btn btn-outline-primary rounded-0 text-center btn-create-news">Đăng
                                                        tin
                                                    </button>
                                                </div>

                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Formik>
            </>
        )
    }
}
