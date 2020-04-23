import React from 'react';
import ImageCardList from './ImageCardList'
import storage from "../../../Firebase/Firebase";

class ImageGroups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameStorageData: []
        }
    }

    componentDidMount() {
        const listRef = storage.ref("/images");

        listRef.listAll().then((res) => {
            res.prefixes.map((folderRef) => {
                this.setState({
                    nameStorageData: [...this.state.nameStorageData, folderRef.name]
                })
            })
        }).catch(() => {

        })

    }

    render() {
        const { nameStorageData } = this.state
        
        return (
            <div>
                <h4>Uploaded images to the server</h4>
                {nameStorageData && nameStorageData.map((folderName, index) => {
                        return <ImageCardList key={index} name={folderName} />
                    })
                }
            </div>
        )
    }
}

export default ImageGroups