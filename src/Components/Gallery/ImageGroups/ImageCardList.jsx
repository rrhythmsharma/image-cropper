import React from 'react'
import ImageCard from './ImageCard'
import storage from "../../../Firebase/Firebase";
import { Row } from 'react-bootstrap'


class ImageCardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgStorageData: []
        }
    }

    componentDidMount() {
        const listRef = storage.ref(`/images/${this.props.name}`);

        listRef.listAll().then((res) => {
            res.items && res.items.map((imgRef) => {
                console.log("image ref: ", imgRef)
                this.setState({
                    imgStorageData: [...this.state.imgStorageData, imgRef.name]
                })
            })
        })
    }

    render() {
        const {imgStorageData} = this.state
        return (
            <div>
                <h6 className="name-heading mt-3 ml-10">{this.props.index + 1}. {this.props.name}</h6>
                <Row>
                    {imgStorageData && imgStorageData.map((imgName, index) => {
                            return <ImageCard key={index} folderName={this.props.name} name={imgName}/>
                        })
                    }
                </Row>
            </div>
        )
    }
}

export default ImageCardList