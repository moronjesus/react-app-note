import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../asset/image/logo-nota.png';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux'
import { actionRemoveError, actionSetError } from '../../actions/ui';
import { satrtRegisterWithEmailPassword } from '../../actions/auth';


export const RegisterScreen = () => {

   
    const [ formValues, handleInputChange ] = useForm({
        name:'Junior',
        email: 'moronjesus@gmail.com',
        password:'123456',
        password2: '123456',
    });
    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui );
    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) =>{

        e.preventDefault();

        if(isformuValid()){

            dispatch(satrtRegisterWithEmailPassword(email, password, name)); 

        }
    }

    const isformuValid=() =>{
        
        if( name.trim().length === 0 ){

            dispatch(actionSetError('Name is required'));
            return false;

        }else if(!validator.isEmail( email ) ){

            dispatch(actionSetError('Email is not valid'));
            return false;

        }else if( password !== password2 || password.length < 5) {

            dispatch(actionSetError('Password should be at least 6 charaters and match'));
            return false;

        }

        dispatch( actionRemoveError() ); 
        return true
    }

    return (
        <div>

            <div className="auth__logo">
                <img src={logo} alt="not found" style={{ width: '35%' }} ></img>
            </div>
            <h2 className="auth__title">Register</h2>
            { msgError &&
               ( 
                    <div className="auth__alert-error">
                    { msgError }
                    </div>
                )
            }
            <form onSubmit= { handleRegister }>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value = { name }
                    onChange= { handleInputChange }
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value = { email }
                    onChange= { handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value = { password }
                    onChange= { handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value = { password2 }
                    onChange= { handleInputChange }
                />
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5 mt-5"
                > Register
                </button>

                <hr />

                <Link to="/auth/login" className="link mt-5 mb-5">
                    Alredy registered?
                </Link>

            </form>
        </div>
    )
}
