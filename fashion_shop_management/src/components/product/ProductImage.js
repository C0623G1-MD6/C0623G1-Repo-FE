import React, {useEffect, useRef, useState} from "react";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {storage} from "../../services/news/firebase";
import {Button, Card} from "react-bootstrap";
import {showMsg, showMsgWarning} from "../../services/product/ProductService";
import Swal from "sweetalert2";

function ProductImage(props) {
    const {callBack} = props;
    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fileRef = useRef();
    const [filesUpload, setFilesUpload] = useState([]);

    const handleUpload = () => {
        setIsLoading(true);
        uploadFiles(files)
            .then()
            .catch()
            .finally(() => {
                fileRef.current.value = "";
            });
    };

    useEffect(() => {
        if (urls.length === files.length && urls.length > 0) {
            callBack(urls);
        }
    }, [urls]);

    const uploadFiles = async (files) => {
        if (files.length) {
            const temp = [...files];
            temp.splice(0, [...filesUpload].length);
            for await (const file of temp) {
                upload(file);
            }
            setFilesUpload(files);
        }
    };

    const upload = (file) => {
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            () => {

            },
            (err) => {
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUrls((prevUrls) => [...prevUrls, url]);
                    setIsLoading(false);
                });
            }
        );
    };

    const handleAddFiles = (event) => {
        const typeFile = ["image/png", "image/jpg", "image/jpeg"];
        const MAX_SIZE_FILE = 102400;
        let countInvalidType = 0;
        let countInvalidSize = 0;
        if (event.target.files && [...event.target.files].length > 0) {
            [...event.target.files].forEach((f) => {
                if (typeFile.includes(f.type)) {
                    if (f.size > MAX_SIZE_FILE) {
                        countInvalidSize++
                    } else {
                        if (isExistsFile(files, f) === -1) {
                            setFiles((prevFile) => [...prevFile, f]);
                            fileRef.current.value = "";
                        } else {
                            showMsgWarning("Ảnh đã tồn tại");
                        }
                    }
                } else {
                    countInvalidType++;
                }

            });
        }
        if (countInvalidType) {
            showMsgWarning(`Có ${countInvalidType} file không đúng định dạng file ảnh`);
        }
        if (countInvalidSize) {
            showMsgWarning(`Có ${countInvalidSize} file lớn hơn dung lượng cho phép`);
        }
    };

    const isExistsFile = (files, file) =>
        files.findIndex((f) => f.name === file.name);

    const handleDeleteFile = (name) => {
        const filesChange = files.filter(function (f) {
            return f.name !== name;
        });
        setFiles(filesChange);
    };

    const showSweetAlert = () => {
        let timerInterval;
        Swal.fire({
            title: "Đang upload ảnh",
            html: "Vui lòng chờ đợi trong vài giây.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                // const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    Swal.getTimerLeft();
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                showMsg("Upload ảnh thành công");
            }
        });
    };

    return (
        <div>
            <div>
                <label htmlFor="upload">
                    <span className="btn btn-outline-dark">Chọn ảnh tại đây</span>

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        id="upload"
                        onChange={(e) => handleAddFiles(e)}
                        style={{display: "none"}}
                        ref={fileRef}
                    />
                </label>
                <div className="row">
                    {files.length > 0 &&
                    files.map((file) => (
                        <Card
                            style={{width: "18rem", marginTop: '15px'}}
                            key={file.name}
                            className="col-3"
                        >
                            <Card.Body>
                                <button
                                    style={{textAlign: "right", border: "none",position:"absolute"}}
                                    className="btn"
                                    onClick={() => handleDeleteFile(file.name)}
                                    disabled={filesUpload.find((f) => f.name === file.name)}
                                ><i className="bi bi-x-circle" hidden={filesUpload.find((f) => f.name === file.name)}/>
                                </button>
                                {/*<Card.Title*/}
                                {/*    style={{*/}
                                {/*        textOverflow: "clip",*/}
                                {/*        width: "230px",*/}
                                {/*        whiteSpace: "nowrap",*/}
                                {/*        overflow: "hidden",*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*</Card.Title>*/}
                                <Card.Img
                                    variant="top"
                                    src={URL.createObjectURL(file)}
                                    style={{height: "100%", width: "100%", objectFit: "contain"}}
                                />
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </div>
            <div>
                {files.length > 0 && (
                    <Button className="mt-4" variant="outline-dark" onClick={handleUpload}
                            disabled={files.length === filesUpload.length}>
                        <i className="bi bi-cloud-arrow-up"/> Tải ảnh lên
                    </Button>
                )}
                {isLoading && showSweetAlert()}
            </div>
        </div>
    );
}

export default ProductImage