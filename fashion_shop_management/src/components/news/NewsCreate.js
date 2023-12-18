import {useNavigate} from "react-router-dom";
import {refImage, storage} from "../../services/news/firebase";
import {getDownloadURL, uploadBytes} from "firebase/storage";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import * as service from "../../services/news/service";
import * as Yup from "yup";
import {ErrorMessage, Field, Formik, Form} from "formik";


export function NewsCreate() {
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);

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
            toast.error("chưa upload ảnh cho tin tức");
        } else {
            // let cateId = news.newsCategoryId ? news.newsCategoryId.id : null; // Kiểm tra null trước khi lấy id
            // if (cateId !== null) {
            //     news = {
            //         ...news,
            //         image: image,
            //         newsCategoryId: cateId,
            //         deleted: false,
            //         dateCreate: new Date()
            //     }
            //     console.log(news)
            //     // const data = {...news, category: JSON.parse(news.category)}
            const status = await service.createNews(news)
            if (status === 201) {
                toast.success("Create Successfully");
                navigate("/")
            } else {
                toast.error("Create Fail")

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
            console.log(1111111)
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
        dateCreate: Yup.date()
            .required("Vui lòng nhập trường này!"),
        name: Yup.string()
            .required("Vui lòng nhập trường này!"),
        content: Yup.string()
            .required("Vui lòng nhập trường này!"),

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
                                            <h2 className="hlptitle hlptitle fw-bold text-primary">Đăng tin tức</h2>
                                            <Form>
                                                <div className="mb-3">
                                                    <label>Tiêu đề</label>
                                                    <Field type='text' name="name" id='name' className="form-control"/>
                                                    <ErrorMessage name="name" component="span"
                                                                  style={{color: "red"}}></ErrorMessage>
                                                </div>
                                                <div className="mb-3">
                                                    <label>Nội dung</label>
                                                    <Field type='textarea' name="content" id='content'
                                                           className="form-control"/>
                                                    <ErrorMessage name="content" component="span"
                                                                  style={{color: "red"}}></ErrorMessage>
                                                </div>

                                                <div className="mb-3">
                                                    <label>Ngày đăng</label>
                                                    <Field type='datetime-local read-olny' name="dateCreate"
                                                           className='form-control' id='dateCreate'/>
                                                    <ErrorMessage name="dateCreate" component="span"
                                                                  style={{color: "red"}}></ErrorMessage>
                                                </div>
                                                <div className="mb-3">
                                                    <label>Chủ đề</label>
                                                    <Field as="select" className='form-control' name="newsCategoryId">
                                                        {category.map(category => (
                                                            <option key={category.id}
                                                                    value={category.id}>{category.name}</option>
                                                        ))}
                                                    </Field>

                                                </div>
                                                <div className="mb-3">
                                                    <label>Ảnh</label>
                                                    <input type={"file"} onChange={(e) => {
                                                        handleImageUpload(e)
                                                    }} className="form-control"/>
                                                </div>
                                                <div style={
                                                    {
                                                        backgroundImage: `url(${image})`,
                                                        backgroundPosition: "center",
                                                        backgroundSize: "cover",
                                                        width: "400px",
                                                        height: "200px",
                                                        backgroundColor: "gray",
                                                        marginBottom: "10px"
                                                    }
                                                }></div>
                                                <div>
                                                    <button type="submit" className="btn btn-outline-primary rounded-0 text-center btn-create-news">Đăng
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