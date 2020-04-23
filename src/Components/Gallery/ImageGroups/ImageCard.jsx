import React from 'react'
import storage from "../../../Firebase/Firebase";
import { Col, Card } from 'react-bootstrap'


class ImageCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileMetaData: {},
            url: ""
        }
    }

    componentDidMount() {
        const imgRef = storage.ref(`/images/${this.props.folderName}`).child(this.props.name)
        storage.ref(`/images/${this.props.folderName}`).child(this.props.name).getDownloadURL().then(url => {this.setState({url})} )
        imgRef.getMetadata().then((metadata) => {
            let tempFiles = {
                "name": metadata.name,
                "size": metadata.size,
                "type": metadata.contentType,
                'created': metadata.timeCreated
            }
            this.setState({
                fileMetaData: tempFiles
            })
        })
        .catch(function(error) {
            console.log(error)
        });
    }

    render() {
        const { fileMetaData, url } = this.state
        return (
            <Col>
                <Card className="mt-3 card-container" style={{ width: '18rem' }}>
                    <Card.Img className="mt-4 card-image mr-auto ml-auto" alt="preview" variant="top" src={url} />
                    <Card.Body>
                        <div>
                            <p className="m-0 card-top-heading">Name</p>
                            <p className="card-text"> <a href={url}>{fileMetaData.name} <i className="fa fa-external-link"></i></a></p>
                        </div>
                        <div>
                            <p className="m-0 card-top-heading">Size</p>
                            <p className="card-text">{fileMetaData.size} bytes</p>
                        </div>
                        <div>
                            <p className="m-0 card-top-heading">Type</p>
                            <p className="card-text">{fileMetaData.type}</p>
                        </div>
                        <div>
                            <p className="m-0 card-top-heading">Created</p>
                            <p className="card-text">{fileMetaData.created}</p>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}


export default ImageCard