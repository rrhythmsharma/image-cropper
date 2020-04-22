import React, { useState } from 'react';
import { Row } from 'react-bootstrap'
import ImageUploader from './ImageUploader';
import Edit from '../Edit/Edit'
import Info from './Info'
import "./Upload.css"


function Upload () {

    const [showUploadInterface, setShowUploadInterface] = useState(true)
    const [imageSrc, setImageSrc] = useState(null)
    const [uploadedImage, setUploadedImage] = useState(null)

    const setImageDataUrl = (imageSrc) => {
        setImageSrc(imageSrc)
    }

    const handleSetUploadedImage = (file) => {
        setUploadedImage(file)
    }

    return (
        <React.Fragment>
            <Row className="upload-container">
                {(showUploadInterface) 
                    ? <ImageUploader
                        setShowUploadInterface={setShowUploadInterface}
                        setImageDataUrl={setImageDataUrl}
                        handleSetUploadedImage={handleSetUploadedImage}
                      />
                    : <Edit imageSrc={imageSrc} uploadedImage={uploadedImage}/>
                }
                
            </Row>
            <Info/>
        </React.Fragment>
    )
}

export default Upload

