import React, { useState, useCallback} from 'react';
import { Card , Alert} from 'react-bootstrap'
import {useDropzone} from 'react-dropzone';
import DropPicture from '../../assets/DropPicture.png'


function AlertPopUp(props) {
    return (
        <Alert className="m-1" variant="danger" onClose={() => props.close(false)} dismissible>
            <p>{props.text}</p>
        </Alert>
    )
}

function ImageUploader (props) {

    const [showAlert, setShowAlert] = useState(true)
    const [isRequiredResolution, setIsRequiredResolution] = useState(false)
    const [imageReadFail, setImageReadFail] = useState(false)

        const onDrop = useCallback((acceptedFiles) => {
            acceptedFiles.forEach((file) => {
                let img = new Image()
                img.src = window.URL.createObjectURL(file)
                img.onload = () => {
                    if(img.width !== 1024 && img.height !== 1024) {
                        setIsRequiredResolution(true)
                    }else{ 
                        const reader = new FileReader()
                
                        reader.onabort = () => {setImageReadFail(true)}
                        reader.onerror = () => {setImageReadFail(true)}
                        reader.onload = () => {
                            const binaryStr = reader.result
                            props.handleSetUploadedImage(file)
                            props.setImageDataUrl(binaryStr)
                            props.setShowUploadInterface(false)
                        }
                        reader.readAsDataURL(file)
                    }
                }
            })
        }, [])


        const { rejectedFiles, getRootProps, getInputProps} = useDropzone({onDrop, accept: 'image/jpeg, image/png' })
    
        const rejectedFilesItems = rejectedFiles.map((index) => ( 
            <AlertPopUp key={index} text={"Please select *.jpeg or *.png format"} close={setShowAlert} />
        ));

        return (
            <React.Fragment>
                <Card className="shadow-lg p-3 mt-5 mb-5 bg-white rounded mr-auto ml-auto">
                    <Card.Body {...getRootProps({className: 'dropzone'})}>
                        <section className=" mb-3 dropzone-container">
                            <input {...getInputProps({})} />
                            <img className="drop-picture mt-5" src={DropPicture} alt="Drag and drop"/>
                            <div className="my-5 mx-3"> 
                                <h5>Drop your photo here to crop it</h5>
                                <em>(Only *.jpeg and *.png images with 1024X1024 resolution will be accepted)</em>
                            </div>
                            {(showAlert) && rejectedFilesItems }
                            {(isRequiredResolution) && <AlertPopUp text={"Please upload image of size 1024x1024"} close={setIsRequiredResolution}  />}
                            {(imageReadFail) && <AlertPopUp text={"Fail to read image please select again"} close={setImageReadFail} />}
                        </section>
                    </Card.Body>
                </Card>
            </React.Fragment>
        )
      
}

export default ImageUploader