import React from 'react';

const FestivalFilterDate = (props) => {
        const { date } = props;
        
        return date.map((date, index) =>{
            let greatDate  = date.split('-').reverse().join('-');
            return <option key={index} value={date} >{greatDate}
            </option>}
        )
}

export default FestivalFilterDate;