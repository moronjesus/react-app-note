import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { noteReducer } from '../reducers/noteReducer';
import { uiReducer } from '../reducers/uiReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer, 
    notes: noteReducer,
})

export const store = createStore( 
        reducers,
        composeEnhancers(
            applyMiddleware( thunk )
        )
       
    );




    /**
     * combineReducers: para guaradar varios reducer y pasarlos a store como un solo objeto con todos los reducers
     * Redux DevTools Extension, hay que agregarlo, 236
     * el ( thunk ) es para trabajar acciones asincronas de redux, 
     * hay que importarlo e instalarlo npm i --save redux-thunk,
     */