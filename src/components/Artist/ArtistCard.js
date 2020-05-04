import React from 'react';


const ArtistCard = (props) => {
    const {artiste, genre} = props
    return(
        <div className="ArtistCard">
            <div className= "img-container">
                <img src={artiste.image_url} alt={artist.name} />
            </div>
            <ArtistDescription 
                artiste= {artiste}
                genre= {genre}
                />
        </div>
    )
}

export default ArtistCard;