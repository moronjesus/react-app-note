import React from 'react'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import logo from '../../asset/image/logo-nota.png';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.ui );
    const [ formValues, handleInputChange ] = useForm({
        email:'',
        password: '',
    });

    const { email, password } = formValues;

    
    const handleLogin = (e) =>{
        e.preventDefault();
        dispatch( startLoginEmailPassword( email, password ) );
        
    }

    const handleGoogleLogin =() =>{
        dispatch( startGoogleLogin() )
    }

    return (
        <div>
            
            <div className="auth__logo">
                 <img src= {logo} alt="not found" style= {{width: '35%'}} className="animate__animated animate__swing"></img>
            </div>
            <h2 className="auth__title mt-5  animate__animated animate__bounce">Login</h2>
            <form onSubmit= {handleLogin} >
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete = "off"
                    value= { email}
                    onChange={ handleInputChange }
                />

                <input
                    type="password"
                    placeholder="password"
                    name={"password"}
                    className="auth__input"
                    value={ password}
                    onChange={ handleInputChange }
                    
                />
                <button
                    disabled={ loading }
                    type="submit"
                    className= "btn btn-primary btn-block mb-5 mt-5 "
                > Login
                </button>

                <hr />

                <div className="auth__social-networks">
                    <p>Login with social networks</p>
                    
                    <div className="google-btn" onClick={ handleGoogleLogin }>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <span>Sign in with google</span>
                        </p>
                    </div>
                </div>
        
                    <Link to= "/auth/register" className="link">
                        Create new account
                    </Link>
                
            </form>
        </div>
    )
}
