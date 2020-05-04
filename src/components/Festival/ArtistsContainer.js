import React, { useEffect, useState } from "react";
import Coverflow from "react-coverflow";
import { StyleRoot } from "radium";
import axios from "axios";
import Icon from "../../img/icon-titre.png";
import "./ArtistsContainer.css";


const ArtistsContainer = (props) => {
    const {festival} = props;
    const [artists, setArtists] = useState([]);
    
    console.log(festival)
    useEffect(() => {
      const idfestival = props.match.params.idfestival;
      axios
        .get(`https://api-festit.herokuapp.com/api/festival/${idfestival}/artists`)
        .then(response => response.data)
        .then(data => {
          setArtists(data);
        });
    }, []);

    return (
      <StyleRoot>
        <Coverflow
                displayQuantityOfSide={2}
                navigation
                infiniteScroll
                media={{
                  "@media (max-width: 900px)": {
                    width: '50%',
                    height: "300px"
                  },
                  "@media (min-width: 900px)": {
                    width: "90%",
                    height: "30vh"
                  }
                }}
              >
          {artists.map(artist => (
              
                <div className="btn-coverflow">
                  <img className='img-artist' src={artist.image_url} alt='artist' /> 
                  <div className="artist-name">
                    <img src={Icon} alt="icon-titre" className="icon-titre" />
                    <h5>{artist.name}</h5>
                  </div>
                </div>
              
          ))}
          </Coverflow>
      </StyleRoot>
    );
};
  
export default ArtistsContainer;