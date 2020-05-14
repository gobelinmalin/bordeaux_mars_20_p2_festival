import React, {useEffect, useState} from 'react';
import SliderContainer from './Slider/SliderContainer';
import FestivalsContainer from './FestivalsContainer';
import FestivalFilter from './FestivalFilter';
import axios from 'axios';

const Festivals = (props,history) => {

    //all festivals
    const [festivals, setFestivals] = useState([]);
    useEffect(() => {
        refreshFestivals()
    }, [])
    
    const refreshFestivals = () => {
        axios.get('https://api-festit.herokuapp.com/api/festival')
        .then(response => response.data)
        .then(data => {
            setFestivals(data)
        })
    }

    //all locations
    const  [location, setLocation] = useState([]);

    useEffect(() => {
        axios.get('https://api-festit.herokuapp.com/api/festival')
        .then(response => response.data)
        .then(data => data.map(festival => festival.country).sort())
        .then(data => {
            setLocation([...new Set(data)])
        })
    }, [])

     //all dates
     const  [date, setDate] = useState([]);
     useEffect(() => {
         axios.get('https://api-festit.herokuapp.com/api/festival')
         .then(response => response.data)
         // .then(data => data.map(festival => {
         //     const startDate = new Date(festival.startDate)
         //     return startDate.getFullYear()
         // }).sort())
         .then(data => data.map(festival => festival.startDate).sort())
         .then(data => {
             setDate([...new Set(data)])
         })
     }, [])


    //changer l'ordre des genres de musique
    const compare = (a, b) => {
        const styleA = a.name.toUpperCase();
        const styleB = b.name.toUpperCase();
        let comparison = 0;
        if (styleA > styleB) {
          comparison = 1;
        } else {
          comparison = -1;
        }
        return comparison;
    }

    // all genres
    const [genres, setGenres] = useState([])
    useEffect(() => {
        axios.get('https://api-festit.herokuapp.com/api/style')
        .then(response => response.data)
        .then(data => {
            setGenres(data.sort(compare))
        })
    }, []);

    //filtres
    const [filterLocations, setFilterLocations] = useState([]);
    const [filterDates, setFilterDates] = useState([]);
    const [filterStyle, setFilterStyle] = useState([]);

    useEffect(() => {
        filterLocation()
        filterDate()
        filterGenre()
    }, [])

    const compareListFestivalFilter = async(data, nameFilter) => {
        let newFestivals = [];
        if (nameFilter === 'genre') {
            // data.map(item => filterLocations.filter(festival1 => filterDates.filter(festival2 => festival1.idfestival === festival2.idfestival === item.idfestival).map(festival => newFestivals.push(festival))))
            data.map(item => filterLocations.filter(festival1 => festival1.idfestival === item.idfestival).map(festival => filterDates.filter(festival2 => festival2.idfestival === festival.idfestival).map(festival => newFestivals.push(festival))))
            setFestivals(newFestivals)
        } else if (nameFilter === 'date') {
            data.map(item => filterStyle.filter(festival1 => festival1.idfestival === item.idfestival).map(festival => filterLocations.filter(festival2 => festival2.idfestival === festival.idfestival).map(festival => newFestivals.push(festival))))
            setFestivals(newFestivals)
        } else if (nameFilter === 'location') {
            data.map(item => filterStyle.filter(festival1 => festival1.idfestival === item.idfestival).map(festival => filterDates.filter(festival2 => festival2.idfestival === festival.idfestival).map(festival => newFestivals.push(festival))))
            setFestivals(newFestivals)
            console.log('newloc', festivals)
        }
        if (filterLocations.length === 0 && filterDates.length === 0 && filterStyle.length === 0) {
            setFestivals(data)
        }
    }

    //filter en fonction location
    const filterLocation = (location) => {
        if(location ==="Partout" && filterDates.length === 0 && filterStyle.length === 0) {
            refreshFestivals()
        } else {
            axios.get(`https://api-festit.herokuapp.com/api/festival/country/${location}`)
                .then(response => response.data)
                .then(data => {
                    setFestivals(data)
                    setFilterLocations(data)
                    compareListFestivalFilter(data, 'location')
                }
            )
        }
    }

    //filter en fonction de la date
    const filterDate = (date) => {
        if(date ==="N'importe quand" && filterLocations.length === 0 && filterStyle.length === 0) {
            refreshFestivals()
        } else {
            axios.get(`https://api-festit.herokuapp.com/api/festival/date/${date}`)
                .then(response => response.data)
                .then(data => {
                    setFestivals(data)
                    setFilterDates(data)
                    compareListFestivalFilter(data, 'date')
                }
            )
        }
    }

    //filter genre
    const filterGenre = (genre) => {
        if(genre === 'Tous' && filterDates.length === 0 && filterLocations.length === 0) {
            refreshFestivals()
        } else {
            axios.get(`https://api-festit.herokuapp.com/api/festival/style/${genre}`)
                .then(response => response.data)
                .then(data => {
                    setFestivals(data)
                    setFilterStyle(data)
                    compareListFestivalFilter(data, 'genre')
                }
            )
        }
    }

    return (
        <div>
            <SliderContainer />
            <FestivalFilter 
                festivals={festivals}
                filterGenre={filterGenre} 
                filterLocation={filterLocation}
                filterDate={filterDate}
                location={location}
                genres={genres}
                date={date}
            />
            <FestivalsContainer
                {...props} 
                festivals={festivals} 
            />
        </div>
    )
}

export default Festivals;