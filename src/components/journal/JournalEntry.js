import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { actionActiveNote } from '../../actions/notes';

import camera from '../../asset/image/icon-camera.png';

export const JournalEntry = ({id, title, date, body, url }) => {
   
    const noteDate = moment(date);
    const dispatch = useDispatch();

    const handleEntryNote = () =>{
        
        dispatch( actionActiveNote( id, {
            title,
            date,
            body,
            url
        }));
    }

    const newBody = body.substring(0,70);

    return (
        <>
        <div className="journal__entry 
         " onClick={ handleEntryNote }>
            {
                <div 
                className="journal__entry-picture" 
                style= {{ 
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: url ?`url(${url})` : `url(${camera})`
                }}
                >
                </div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                   { title }
                </p>
                <p className="journal__entry-content">
                   { newBody }   
                </p>
            </div>

            <div className="journal__entry-date-box">
                    <span>{ noteDate.format('dddd') }</span>
                    <h4 className="text-primary">{ noteDate.format('Do') }</h4>
            </div>
        </div>
        </>
    )
}
