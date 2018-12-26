import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import authContainer from '../containers/authContainer'
import { Subscribe } from 'unstated';

export default class Register extends React.Component {

    displayNameInp = React.createRef();
    usernameInp = React.createRef();
    pwd1Inp = React.createRef();
    pwd2Inp = React.createRef();
    bioInp = React.createRef();

    handleClick = (doRegister, setError) => {
        const displayName = this.displayNameInp.current.value.trim()
        const username = this.usernameInp.current.value.trim()
        const pwd1 = this.pwd1Inp.current.value.trim()
        const pwd2 = this.pwd2Inp.current.value.trim()
        const bio = this.bioInp.current.value.trim()
        if ( !username || username === ""  
             || !displayName || displayName === "" 
             || !pwd1 || pwd1 === ""
             || !pwd2 || pwd2 === ""
             || !bio || bio === "" ) {
                setError('Please fill all fields')
        } else {
            if (pwd1 !== pwd2) {
                setError('Password not match')
            } else {
                doRegister(
                    {
                        username,
                        displayName,
                        password: pwd1,
                        about: bio
                    },
                    this.props.history
                )
            }
        }
    }

    render() {
        return (
            <Subscribe to={[authContainer]}>
            {
                ({state: {isAuth, error}, doRegister, setError}) => { 
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
                                    <h1 className="text-xs-center">Sign up</h1>
                                    <p className="text-xs-center">
                                        <Link to="/login">Have an account?</Link>
                                    </p>
                                    {
                                        error && error !== 'null token' ? (
                                            <ul className="error-messages">
                                                <li>{error}</li>
                                            </ul> ) : ""
                                    }
                                    <fieldset className="form-group">
                                        <input 
                                            className="form-control form-control-lg" 
                                            type="text" 
                                            placeholder="Your Name"
                                            ref={this.displayNameInp}
                                        />
                                    </fieldset>
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
                                            ref={this.pwd1Inp}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input 
                                            className="form-control form-control-lg" 
                                            type="password" 
                                            placeholder="Password Again"
                                            ref={this.pwd2Inp}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <textarea 
                                            placeholder="About you"
                                            className="form-control form-control-lg" 
                                            ref={this.bioInp}
                                        >
                                        </textarea>
                                    </fieldset>
                                    <button 
                                        className="btn btn-lg btn-primary pull-xs-right"
                                        onClick={() => this.handleClick(doRegister, setError)}
                                    >
                                        Sign up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            }
        </Subscribe>
    )}
}