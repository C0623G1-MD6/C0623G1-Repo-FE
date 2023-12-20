import {useNavigate} from "react-router-dom";
import {refImage, storage} from "../../services/news/firebase";
import {getDownloadURL, uploadBytes} from "firebase/storage";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import * as service from "../../services/news/service";
import * as Yup from "yup";
import {ErrorMessage, Field, Formik, Form} from "formik";


export function NewsCreate() {
    const [image, setImage] = useState("https://media.istockphoto.com/id/1219543807/ko/%EB%B2%A1%ED%84%B0/%EA%B7%B8%EB%A6%BC-%EA%B0%A4%EB%9F%AC%EB%A6%AC-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%A1%9C%EA%B3%A0-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%9D%B4%EC%85%98-%EC%82%AC%EC%A7%84-%EA%B0%A4%EB%9F%AC%EB%A6%AC-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%94%94%EC%9E%90%EC%9D%B8-%EB%B2%A1%ED%84%B0-%ED%85%9C%ED%94%8C%EB%A6%BF%EC%9E%85%EB%8B%88%EB%8B%A4-%EC%9B%B9-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EA%B8%B0%ED%98%B8-%EB%A1%9C%EA%B3%A0-%EC%95%84%EC%9D%B4%EC%BD%98-%EA%B8%B0%ED%98%B8-%EC%9D%91%EC%9A%A9-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%A8-ui%EC%97%90-%EB%8C%80%ED%95%9C-%EC%B5%9C%EC%8B%A0-%EC%9C%A0%ED%96%89-%EC%82%AC%EC%A7%84-%EA%B0%A4%EB%9F%AC%EB%A6%AC.jpg?s=170667a&w=0&k=20&c=q1q3pEdGVDSXOf46Dua9Dbplh6WZHui_sG2yL_muJfw=");
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
                    navigate("/dashboard/news/create")
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
            .required("Vui lòng nhập tiêu đề.")
            .max(200, "Vượt quá số lượng kí tự cho phép̣.")
            .min(10, "Tiêu đề phải có tối thiểu 10 ký tự.")
            .matches("^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+( ([AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ]|[aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz])[aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+)+$", "Tiêu đề không đúng định dạng."),
        content: Yup.string()
            .required("Vui lòng nhập nội dung.")
            .max(20000, "Vượt quá số lượng kí tự cho phép̣.")
            .min(50, "Nội dung phải có tối thiểu 50 ký tự.")
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
                                            <h2 className="hlptitle hlptitle fw-bold text-primary mt-3">ĐĂNG TIN TỨC</h2>
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
                                                <div className="text-center">
                                                    <button type="submit"
                                                            className="btn btn-outline-primary rounded-0 text-center">Đăng
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
