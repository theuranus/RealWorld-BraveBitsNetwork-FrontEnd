import React from 'react'

import { Link, Redirect } from 'react-router-dom'

import authContainer from '../containers/authContainer'
import { Subscribe } from 'unstated';

export default class Login extends React.Component {

    usernameInp = React.createRef();
    passwordInp = React.createRef();

    handleClick = (doLogin, setError) => {
        const username = this.usernameInp.current.value.trim()
        const password = this.passwordInp.current.value.trim()
        if (!username || username === "" || !password || password === "") {
            setError('Please enter username or password')
        } else {
            doLogin({username, password}, this.props.history)
        }
        
    }

    render() {
        return (
            <Subscribe to={[authContainer]}>
                {(
                    {state: {isAuth, error}, doLogin, setError}
                ) => {   
                    if (isAuth) {
                        return (
                            <Redirect to="/"/>
                        )
                    } else 
                    return (
                    <div className="auth-page">
                        <div className="container page">
                            <div className="row">
                                <div className="col-md-6 offset-md-3 col-xs-12">
                                    <h1 className="text-xs-center">Login</h1>
                                    <p className="text-xs-center">
                                        <a href=""></a>
                                        <Link to='/register'>Don't have an account?</Link>
                                    </p>
                                    {
                                        error && error !== 'null token' ? 
                                                (<ul className="error-messages">
                                                    <li>{error}</li>
                                                </ul>) : "" 
                                    }
                                    <fieldset className="form-group">
                                        <input 
                                            className="form-control form-control-lg" 
                                            type="text" 
                                            placeholder="Username"
                                            ref={this.usernameInp}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input 
                                            className="form-control form-control-lg" 
                                            type="password" 
                                            placeholder="Password"
                                            ref={this.passwordInp}
                                        />
                                    </fieldset>
                                    <button 
                                        className="btn btn-lg btn-primary pull-xs-right"
                                        onClick={() => this.handleClick(doLogin, setError)}
                                    >
                                        Login 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                }} 
            </Subscribe>
        )
    }
}