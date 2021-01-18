import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { actionLogoutCleanNote } from './notes';
import { actionFinishlaoding, actionStartLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {

    return (dispatch) => {
        
        dispatch( actionStartLoading() );

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {

                dispatch(actionLogin(user.uid, user.displayName));
                dispatch( actionFinishlaoding() );
            })
            .catch((e)=>{
               
                dispatch( actionFinishlaoding() );
                Swal.fire('Error', e.message, 'error');
            })
    }

}


export const satrtRegisterWithEmailPassword = (email, password, name) => {

    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {

                await user.updateProfile({ displayName: name });
                dispatch(actionLogin(user.uid, user.displayName))
            })
            .catch((e) => {
                Swal.fire('Error', e.message, 'error');
            })
    }
}


export const startGoogleLogin = () => {

    return (dispatch) => {

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(actionLogin(user.uid, user.displayName))
            });

    }

}


export const startLogout = () =>{
    
    return async( dispatch ) =>{

        await firebase.auth().signOut();

        dispatch( actionLogout() ); 
        dispatch( actionLogoutCleanNote() )

    }
}


export const actionLogin = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
    }

});


export const actionLogout = () =>({
    type: types.logout,

})

