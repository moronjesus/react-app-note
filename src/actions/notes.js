import Swal from 'sweetalert2';

import { db } from "../firebase/firebase-config";
import { FileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () =>{

    return async ( dispatch, getState )=>{

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body:'',
            date: new Date().getTime()
        }

        const docRef = await db.collection(`${uid}/journal/notes`).add( newNote );
        dispatch( actionActiveNote( docRef.id, newNote ));

        dispatch( actionAddNewNote(docRef.id, newNote) );
    }

};

export const actionActiveNote = (id, note) =>({

    type: types.notesActive,
    payload:{
        id,
        ...note
    }

});


export const actionAddNewNote = ( id, note ) =>({

    type: types.notesAddNew,
    payload:{
        id,
        ...note
    }

})

export const actionNotes = ( uid ) =>{

    return async( dispatch )=>{

        const notes = await loadNotes( uid );
        dispatch( actionNoteLoading( notes ));
    }

};


export const actionNoteLoading = ( notes ) =>({
    
    type: types.notesLoad,
    payload: notes,

});

export const startSaveNote = ( note ) =>{

    return async( dispatch, getState ) =>{

        const { uid } = getState().auth;

        if(!note.url){

            delete note.url
        }

        const noteToFirebase = { ...note };
        delete noteToFirebase.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirebase );

         dispatch( refresNote( note.id, note ) );
         Swal.fire('Saved', note.title, 'success'); 
    }
};


export const refresNote = ( id, note) =>({

    type: types.notesUpdated,
    payload: {
        id, 
        note
    }

});


export const startUploadFile  = ( file ) =>{

        return async ( dispatch, getState ) =>{

            const {active : activeNote } = getState().notes;

            Swal.fire({
                title: 'Uploading...',
                allowOutsideClick: false,
                didOpen: () =>{
                    Swal.showLoading();
                }
            });
            const fileUrl = await FileUpload( file );
            activeNote.url = fileUrl; 
    
            dispatch( startSaveNote( activeNote ) )
        
            Swal.close();
        }

};


export const startDeleting = ( id ) =>{

    return async ( dispatch, getState ) =>{

        const uid = getState().auth.uid;

        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        dispatch( actionDeleteNote( id ) );

    }
};

export const actionDeleteNote = ( id ) =>({
        
        type: types.notesDelete,
        payload: id,

});


export const actionLogoutCleanNote = () =>({

            type: types.notesLogoutCleaning

})

