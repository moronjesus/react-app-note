import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from "react-router-dom";

  import { firebase } from '../firebase/firebase-config'

import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { useDispatch } from 'react-redux';
import { actionLogin } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { actionNotes } from '../actions/notes';


export const AppRouter = () => {

    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async( user ) =>{

            if(user?.uid ){

                dispatch( actionLogin(user.uid, user.displayName));
                dispatch( actionNotes( user.uid ));
                setIsLoggedIn(true);
                
            }else{

                setIsLoggedIn(false);

            }
            setChecking(false);
        })

    }, [ dispatch, setChecking, setIsLoggedIn ]);


    if(checking){
        return (
            <h1>Esperando...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" component={ AuthRouter } isAunthenticated={ isLoggedIn }>
                    </PublicRoute>
                    
                    <PrivateRoute exact path="/" component={ JournalScreen } isAunthenticated={ isLoggedIn }>
                    </PrivateRoute>

                    <Redirect to= "/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
