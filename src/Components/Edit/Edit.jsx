import React from 'react';
import ReactCrop from 'react-image-crop';
import storage from "../../Firebase/Firebase";
import Resizer from 'react-image-file-resizer';
import {
    Redirect
} from "react-router-dom";
import { Col, Button, Row, Alert } from 'react-bootstrap'
import 'react-image-crop/dist/ReactCrop.css';
 

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            src: null,
            ImageFile: null,
            showErrorPopUp: false,
            crop: {
                unit: '%',
                width: 30,
                aspect: 16 / 9,
            },
            uploadingState: "",
            uploadedSuccessfully: false,
            ImageCollection: [
                {
                    "name": "horizontal",
                    "height": 450,
                    "width": 755,
                },
                {
                    "name": "vertical",
                    "height": 450,
                    "width": 365,
                },
                {
                    "name": "horizontal small",
                    "height": 212,
                    "width": 365,
                },
                {
                    "name": "gallery",
                    "height": 380,
                    "width": 380,
                }
            ],
            ImageBlobs: []
        }
    }

    componentDidMount() {
        this.setState({
            src: this.props.imageSrc,
            ImageFile: this.props.uploadedImage
        }, () => {
            
            // Resize the image to different resolutions 
            // horizontal : 755 x 450 
            // vertical : 365 x 450 
            // horizontal small : 365 x 212 
            // gallery : 380 x 380
            
            this.state.ImageCollection.forEach((image) => {
                Resizer.imageFileResizer(
                    this.state.ImageFile,
                    image.height,
                    image.width,
                    'JPEG',
                    100,
                    0,
                    uri => {
                        this.state.ImageBlobs.push(uri)
                    },
                    'blob'
                );
            })
        })        
    }

    onImageLoaded = image => {
        this.imageRef = image;
    };
    
    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };
    
    onCropChange = (crop) => {
        this.setState({ crop });
    };
    
    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }
    
    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    
        return new Promise((resolve, reject) => {
          canvas.toBlob(blob => {
            if (!blob) {
              reject(new Error('Canvas is empty'));
              return
            }
            blob.name = fileName;
            window.URL.revokeObjectURL(this.fileUrl);
            this.fileUrl = window.URL.createObjectURL(blob);
            resolve(this.fileUrl);
          }, 'image/jpeg');
        });
    }

    uploadToStorage = async (imageURL) => {
        
        this.setState({
            uploadingState: "uploading"
        })

        const {ImageBlobs} = this.state

        let imageFileName = this.state.ImageFile.name.split(".")
        const suffixName = imageFileName.pop()
        const prefixName = imageFileName.join("")

        // uploading the images with different resolutions
        try {
            await storage.ref(`/images/${prefixName}/${prefixName}_(755x450).${suffixName}`).put(ImageBlobs[0])
            await storage.ref(`/images/${prefixName}/${prefixName}_(365x450).${suffixName}`).put(ImageBlobs[1])
            await storage.ref(`/images/${prefixName}/${prefixName}_(365x212).${suffixName}`).put(ImageBlobs[2])
            await storage.ref(`/images/${prefixName}/${prefixName}_(380x380).${suffixName}`).put(ImageBlobs[3])
        } catch {
            this.setState({
                uploadingState: "error"
            })
        }

        // uploading cropped image 
        this.getFileBlob( imageURL, blob => {
            try {
                storage.ref(`/images/${prefixName}/${prefixName}_cropped.${suffixName}`).put(blob).then(() => {
                    this.setState({
                        uploadingState: "",
                        uploadedSuccessfully: true
                    })
                })           
            } catch {
                this.setState({
                    uploadingState: "error"
                })
            }
        })
    }

    getFileBlob =  (url, cb) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.addEventListener('load', function() {
          cb(xhr.response);
        });
        xhr.send();
    };

    
    render () {       
        const { crop, croppedImageUrl, src, uploadingState} = this.state;

        if (this.state.uploadedSuccessfully === true) {
            return <Redirect to='/gallery' />
        }

        return (
            <Col className="mr-auto ml-auto mt-5">
                <Row >
                    {src && (
                        <ReactCrop
                            className="mr-auto ml-auto"
                            src={src}
                            crop={crop}
                            ruleOfThirds
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                        />
                    )}
                </Row>
                <Row>
                    <Button
                        className="m-3 mr-auto ml-auto"
                        variant="primary"
                        disabled={uploadingState === "uploading"}
                        onClick={uploadingState === "" ? () => this.uploadToStorage(croppedImageUrl) : null}
                        >
                        {uploadingState === "uploading" ? 'Uploading all images ...' : 'Upload'}
                    </Button>
                </Row>
                {(uploadingState === "error") &&
                    <Row>
                        <Alert className="m-1 mr-auto ml-auto" variant="danger" onClose={() => this.setState({uploadingState: ""})} dismissible>
                            <p>Error while uploading data please try again!</p>
                        </Alert>
                    </Row>
                }
            </Col>
        )
    }
}

export default Edit
