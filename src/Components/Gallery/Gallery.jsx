import React from 'react';
import ImageGroups from './ImageGroups/ImageGroups'
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
            console.log(res.prefixes)
            this.setState({
                storageData: res.prefixes
            })
        })
    }


    // componentDidMount() {
    //     const listRef = storage.ref("/images");

    //     let tempImageStorage = []

    //     listRef.listAll().then((res) => {
    //         res.prefixes.forEach((folderRef) => {
    //             const listRefImages = storage.ref(`/images/${folderRef.name}`)
    //             // let tempFiles = []
    //             // let this.state.tempImageStorageItem = {}
    //             listRefImages.listAll().then((res) => {
    //                 res.items.forEach((item) => {
    //                     if (item) {
    //                         const tempImage = storage.ref(`/images/${folderRef.name}`).child(item.name)
    //                         const DownloadURL = storage.ref(`/images/${folderRef.name}`).child(item.name).getDownloadURL()
    //                         console.log(tempImage, DownloadURL)
    //                         let tempFiles = {}
    //                         tempImage.getMetadata().then((metadata) => {
    //                             tempFiles = {
    //                                 "name": metadata.name,
    //                                 "size": metadata.size,
    //                                 "type": metadata.contentType,
    //                                 'created': metadata.timeCreated,
    //                                 "url": DownloadURL
    //                             }
    //                             this.setState({
    //                                 tempFiles: [...this.state.tempFiles, tempFiles]
    //                             })
    //                         })
    //                         .catch(function(error) {
    //                             console.log(error)
    //                         });

    //                     }
    //                 })
    //                 this.setState({
    //                     tempImageStorageItem: {
    //                         name: folderRef.name,
    //                         files: this.state.tempFiles
    //                     }
    //                 })
    //                 // this.state.tempImageStorageItem = {
    //                 //     name: folderRef.name,
    //                 //     files: tempFiles
    //                 // }
    //                 tempImageStorage.push(this.state.tempImageStorageItem)
    //                 this.setState({
    //                     imageGroupStorage: tempImageStorage,
    //                 })
    //             })
    //         })
    //     }).then(() => {
    //         console.log("tempImageStorage: ", tempImageStorage)
    //         console.log(JSON.stringify(tempImageStorage));
    //         this.setState({
    //             imageGroupStorage: tempImageStorage,
    //             featchStatus: "completed"
    //         }, () =>{
    //             console.log("imageGroupStorage: ", this.state.imageGroupStorage)
    //             this.state.imageGroupStorage.map((item) => {
    //                 console.log("item: ", item)
    //             })
    //         })
    //     }
    //     ).catch(function(error) {
    //         console.log(error)
    //     });        
    // }

    render() {  
        const {storageData} = this.state

        return (
            <div className="gallery-container">
                <h5 className="gallery-heading mt-3 ml-10">Gallery</h5>
                {storageData.length > 0 && <ImageGroups />}
            </div>
        )

        // if (imageGroupStorage && imageGroupStorage.length === 0) {
        //     return (
        //         <div className="gallery-container">
        //             <h5 className="gallery-heading mt-3 ml-10">Gallery</h5>
        //             <div>Loading...</div>
        //         </div>
        //     )
        // }
        // if (imageGroupStorage && imageGroupStorage.length > 0) {
        //     return (
        //         <div className="gallery-container">
        //             <h5 className="gallery-heading mt-3 ml-10">Gallery</h5>
        //             {
        //                 imageGroupStorage.map((imageData, index) => {
        //                     return <ImageGroups key={index} imageData={imageData} />
        //                 })                
        //             }
        //         </div>
        //     )
        // }
    }
}

export default Gallery