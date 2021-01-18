import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actionActiveNote, startDeleting, startSaveNote, startUploadFile } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

import camera from '../../asset/image/icon-camera.png';

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const { title, body } = formValues;
  

    const activeId = useRef(note.id)

    useEffect(() => {

        if (note.id !== activeId.current) {

            reset(note);
            activeId.current = note.id;
        }

    }, [note, reset]);


    useEffect(() => {

        dispatch(actionActiveNote(formValues.id, { ...formValues }));

    }, [formValues, dispatch])


    const handleDelete = () => {

        dispatch(startDeleting(formValues.id));
    }

    const handleSave = () =>{

        dispatch( startSaveNote( note ) )

    }

    const handlePictureUpload =() =>{

        document.querySelector('#idselectorfile').click();
        
    }

    const handleFileChange = (e) =>{

        const file = e.target.files[0];

        if(file){
            dispatch( startUploadFile( file))
        }
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">

                <input 
                    id="idselectorfile"
                    type = "file"
                    name="file"
                    style={{ display: 'none'}}
                    onChange ={ handleFileChange } 
                />

                {
                   
                    (
                        <div className="note__image">
                            <img
                                src= {note.url ? note.url : camera }
                                alt="img"
                                className="img-fluid"
                                onClick ={ handlePictureUpload }
                            />
                        </div>
                    )
                }
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    maxLength="30"
                    name="title"
                    value={title}
                    onChange={handleInputChange}

                />

                <textarea
                    placeholder="what happened today"
                    className="notes__text-area"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>
            </div>
          
                <button
                    onClick={ handleSave } 
                    className="btn-floating botonF2 animacionVer tooltipp animate__animated animate__backInRight" 
                    style={{fontSize: '0.5rem'}} 
                >
                    <span className="tooltiptext">Save Note</span>
                    <i className="far fa-save fa-2x"></i>
                </button>

                <button
                    onClick={handleDelete} 
                    className="btn-floating botonF3 animacionVer tooltipp animate__animated animate__backInRight" 
                    style={{fontSize: '0.5rem'}}
                >
                    <span className="tooltiptext">Delete Note</span>
                    <i className="far fa-trash-alt fa-2x"></i>
                </button>

            </div>
    )
}
