import React from 'react';
import moment from 'moment';

export const NotesAppBar = () => {

    const noteDate = moment(new Date());


    return (
        <div className="notes__appbar">
            <span>{ noteDate.format('LLL') }</span>
            
        </div>
    )
}
