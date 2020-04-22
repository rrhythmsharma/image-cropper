import React, { useState, useEffect } from 'react';
import storage from "../../Firebase/Firebase";
import "./Results.css"

function Results() {

    useEffect(() => {
        const listRef = storage.ref("/images");

        listRef.listAll().then(function(res) {    
            res.prefixes.forEach(function(folderRef) {
                console.log("folderRef: ", folderRef)
                const listRefImages = storage.ref(`/images/${folderRef.name}`)
                listRefImages.listAll().then(function(res) {
                    console.log("listRefImages: ", res)
                })

            });
            res.items.forEach(function(itemRef) {
                console.log("itemRef: ", itemRef)
            });
        }).catch(function(error) {
            console.log(error)
        });
    });

    return (
        <div className="gallery-container">
            <h4 className="gallery-heading mt-3 ml-10">Gallery</h4>
        </div>
    )
}

export default Results