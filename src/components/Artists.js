import React, { useState, useEffect } from 'react';
import CardSlide from './CardSlideArtist/CardSlide';
import SliderContainerArtists from './SliderContainerArtists';
import ArtistFilter from './ArtistFilter/ArtistFilter';
import Axios from 'axios';


const Artists = (props, history) => {
    const [artist, setArtist]= useState([])
    useEffect(() => {
        const idartist = props.match.params.idartist;
        Axios.get(`https://api-festit.herokuapp.com/api/artists/${name}`)
        .then(response => response.data)
        .then(data => {
            setArtist(data[0])
        })
    }, [props.match.params.idartist])


     return (
        <div>
            <SliderContainerArtists />
            <ArtistFilter 
                // filterGenre={filterGenre} 
            />
            <CardSlide {...props} 
            // artist={artist} 

            />
        </div>
    )
}

export default Artists;