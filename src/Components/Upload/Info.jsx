import React from 'react';
import { Card } from 'react-bootstrap'
import selectIcon from '../../assets/select.svg'
import cropIcon from '../../assets/crop.svg'
import uploadIcon from '../../assets/upload.svg'
import galleryIcon from '../../assets/gallery.svg'



function Info() {

    const InfoCards = [
        {
            title: "Select",
            body:  "Select or drop image from your PC with resolution 1024x1024 otherwise it will be rejected",
            icon:   selectIcon
        },
        {
            title: "Crop",
            body:  "Crop the image, by default it will resize to four resolutions 755x450, 365x450, 365x212, 380x380",
            icon:   cropIcon
        },
        {
            title: "Upload",
            body:  "Upload your cropped image along with resized images to the server",
            icon:   uploadIcon
        },
        {
            title: "Gallery",
            body:  "See the gallery to view your images",
            icon:   galleryIcon
        }
    ]


    const InfoCardList = InfoCards.map((InfoCard, index) => {
        return (
            <div key={index} className="col">
                <Card border="secondary" height="150" className="mt-3 m-2">
                    <Card.Header className="text-bold">{index + 1}. {InfoCard.title} <img height="15" width="15" src={InfoCard.icon} alt="select"/></Card.Header>
                    <Card.Body className="min-h-150">
                        <p className="text-primary">{InfoCard.body}</p>
                    </Card.Body>
                </Card>
            </div>
        )
    })

    return (
        <div className="container">
            <h3 className="ml-2 mt-4"><u><i className="fa fa-info-circle mr-2" aria-hidden="true"></i>How it works ?</u></h3>
            <div className="row">
                {InfoCardList}
            </div>
        </div>
    )
}

export default Info