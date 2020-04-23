import React from 'react';
import ImageGroups from './ImageGroups/ImageGroups'
import { Alert} from 'react-bootstrap'
import storage from "../../Firebase/Firebase";
import "./Gallery.css"

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storageData: 0
        }
    }


    componentDidMount() {
        const listRef = storage.ref("/images");
        listRef.listAll().then((res) => {
            this.setState({
                storageData: res.prefixes
            })
        })
    }


    render() {  
        const {storageData} = this.state

        return (
            <div className="gallery-container">
                <h5 className="gallery-heading mt-3 ml-10">Gallery</h5>
                {storageData.length > 0 && <ImageGroups />}
            </div>
        )
    }
}

export default Gallery