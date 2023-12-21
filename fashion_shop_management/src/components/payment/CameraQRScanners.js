import React, {useEffect, useRef, useState} from 'react';
import jsQR from 'jsqr';
import "./style.css"

const CameraQRScanners = ({cameraOpen, setProductCode, setIsCameraOpen}) => {
    const videoRef = useRef(null);
    const [intervalId, setIntervalId] = useState(null);
    const [isCameraOpen, setCameraOpen] = useState(cameraOpen);
    const [isScanning, setScanning] = useState(false);

    let stream = null;
    useEffect(() => {

        if (isCameraOpen) {
            openCamera();
        }

        return () => {
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [isCameraOpen]);

    useEffect(() => {
        let timeoutId;

        if (isScanning) {
            timeoutId = setTimeout(() => {
                // window.alert('Không quét được mã QR sau 10 giây');
                stopScanning();
            }, 10000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isScanning]);

    const openCamera = async () => {
        try {
            // stream = await navigator.mediaDevices.getUserMedia({video: true});
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment',
                    width: {ideal: 500},
                    height: {ideal: 500},
                },
            });
            videoRef.current.srcObject = stream;
            videoRef.current.addEventListener('loadeddata', () => {
                startScanning(); // Bắt đầu quét khi camera đã sẵn sàng
            });
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };
    const scanQRCode = () => {
        if (videoRef.current && videoRef.current.videoWidth > 0 && videoRef.current.videoHeight > 0) {

            const videoWidth = videoRef.current.videoWidth;
            const videoHeight = videoRef.current.videoHeight;

            // Xác định kích thước và vị trí của phần cần quét (1/4 của chiều rộng và chiều cao)
            const captureWidth = Math.round(videoWidth / 2);
            const captureHeight = Math.round(videoHeight / 2);
            const captureX = Math.round((videoWidth - captureWidth) / 2);
            const captureY = Math.round((videoHeight - captureHeight) / 2);

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = captureWidth;
            canvas.height = captureHeight;

            // Vẽ chỉ phần cần quét của hình ảnh vào canvas
            context.drawImage(videoRef.current, captureX, captureY, captureWidth, captureHeight, 0, 0, captureWidth, captureHeight);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                // window.alert(`QR Code detected: ${code.data}`);
                stopScanning();
                setProductCode(code.data);
                console.log(code.data);
            }
        }
    };

    const startScanning = () => {
        if (!isScanning) {
            const newIntervalId = setInterval(scanQRCode, 500);
            setIntervalId(newIntervalId);
            setScanning(true);
        }
    };

    const stopScanning = () => {
        clearInterval(intervalId);
        setScanning(false);
        setCameraOpen(false);
        setIntervalId(null);
        setIsCameraOpen(false);
    };
    const handleCloseCamera = () => {
        if (isScanning) {
            stopScanning();
        }
    };

    return (
        <div>
            {
                isCameraOpen &&
                <div>
                    <div id="qr-code" className="position">
                        <video className="position" ref={videoRef} autoPlay
                               playsInline/>
                        <div className="scanner position">
                            <div className="scanner-line"></div>
                        </div>
                        <div className="button">
                            <button className="btn btn-sm btn-info rounded-0"
                                    onClick={handleCloseCamera}
                            >Dừng quét QR</button>
                        </div>
                    </div>
                    <div id="backdrop" className="modal-backdrop fade show"></div>
                </div>

            }
        </div>
    )
};

export default CameraQRScanners;
