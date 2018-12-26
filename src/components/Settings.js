import React from 'react'
import { Subscribe } from 'unstated';
import authContainer from '../containers/authContainer'
import { Link } from 'react-router-dom'

export default class Settings extends React.Component {

    constructor() {
        super()
        this.state = {
            error: ""
        }
    }

    imgURLInp = React.createRef()
    displayNameInp = React.createRef()
    bioInp = React.createRef()
    passwordInp = React.createRef()

    handleUpdate = (userId, doUpdateUser) => {
        const imgURL = this.imgURLInp.current.value.trim()
        const displayName = this.displayNameInp.current.value.trim()
        const about = this.bioInp.current.value.trim()
        const password = this.passwordInp.current.value.trim()

        if(imgURL === "" || displayName === "" || about === "") {
            this.setState({error: "Fill in all blank (password: option)"})
        } else {
            let updateUser = {
                    _id: userId,
                    imgURL,
                    about,
                    displayName
                }
            if (password !== "") {
                updateUser = {
                    ...updateUser,
                    password
                }
            }
            doUpdateUser(updateUser, this.props.history)
        }
    }

    render() {
        return(
            <Subscribe to={[authContainer]}>
                {({state: {isAuth, user}, doUpdateUser}) => {
                    return ( isAuth ? 
                        (
                            <div className="settings-page">
                                <div className="container page">
                                    <div className="row">
                                        <div className="col-md-6 offset-md-3 col-xs-12">
                                            <h1 className="text-xs-center">Your Settings</h1>
                                            <fieldset>
                                            {
                                                this.state.error !== "" ? 
                                                    (<ul className="error-messages">
                                                        <li>{this.state.error}</li>
                                                    </ul>) : "" 
                                            }
                                                <fieldset className="form-group">
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        placeholder="URL of profile picture"
                                                        ref={this.imgURLInp}
                                                        defaultValue={user.imgURL}
                                                    />
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <input 
                                                        className="form-control form-control-lg" 
                                                        type="text" 
                                                        placeholder="Your Name"
                                                        ref={this.displayNameInp}
                                                        defaultValue={user.displayName}
                                                    />
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <textarea 
                                                        className="form-control form-control-lg" 
                                                        rows="8" 
                                                        placeholder="Short bio about you"
                                                        ref={this.bioInp}
                                                        defaultValue={user.about}
                                                    />
                                                </fieldset>
                                                <fieldset className="form-group">
                                                    <input 
                                                        className="form-control form-control-lg" 
                                                        type="password" 
                                                        placeholder="Password"
                                                        ref={this.passwordInp}
                                                        defaultValue=""
                                                    />
                                                </fieldset>
                                                <button 
                                                    className="btn btn-lg btn-primary pull-xs-right"
                                                    onClick={() => this.handleUpdate(user._id, doUpdateUser)}
                                                >
                                                    Update Settings
                                                </button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <h3>Please <Link to="/login">Login</Link> to go this site</h3>
                        )
                    )
                }}
            </Subscribe>
        )
    }

}