import React, {useEffect, useRef, useState} from "react";

import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import storage from "../../firebaseConfig";
import {Button, Card} from "react-bootstrap";

function ProductImage(props) {
    const {callBack} = props;
    const [files, setFiles] = useState([]);
    const [urls, setUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fileRef = useRef();

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
            setFiles([]);
            setUrls([])
        }
    }, [urls]);

    const uploadFiles = async (files) => {
        if (files.length) {
            for await (const file of files) {
                upload(file);
            }
        }
    };

    const upload = (file) => {
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            () => {
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setUrls((prevUrls) => [...prevUrls, url]);
                    setIsLoading(false);
                });
            }
        );
    };

    const handleAddFiles = (event) => {
        if (event.target.files && [...event.target.files].length > 0) {
            [...event.target.files].forEach((f) => {
                if (isExistsFile(files, f) === -1) {
                    setFiles((prevFile) => [...prevFile, f]);
                    fileRef.current.value = "";
                } else {
                    console.log("Đã được chọn")
                    // showMsgWarning("Ảnh này đã được chọn");
                }
            });
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

    return (
        <div>
            <div>
                <label htmlFor="upload">
                    <span className="btn btn-outline-dark">Chọn ảnh tại đây</span>
                    {/*{files.length > 0*/}
                    {/*    ? `${files.length} tệp đang được chọn`*/}
                    {/*    : ``}*/}
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
                                    <Button style={{textAlign: 'right'}} variant="none"
                                        onClick={() => handleDeleteFile(file.name)}
                                    ><i className="bi bi-x-circle"/>
                                    </Button>
                                    <Card.Title
                                        style={{
                                            textOverflow: "clip",
                                            width: "230px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {/*{file.name}*/}
                                    </Card.Title>
                                    <Card.Img
                                        variant="top"
                                        src={URL.createObjectURL(file)}
                                        style={{height: "172px", objectFit: "contain"}}
                                    />
                                </Card.Body>
                            </Card>
                        ))}
                </div>
            </div>
            <div>
                {files.length > 0 && (
                    <Button className="mt-4" variant="outline-dark" onClick={handleUpload} disabled={isLoading}>
                        <i className="bi bi-cloud-arrow-up"/> Tải ảnh lên
                    </Button>
                )}
            </div>
        </div>
    );
}
export default ProductImage