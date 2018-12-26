import React from 'react'
import { Link } from 'react-router-dom'
import AuthContainer from '../containers/authContainer'
import { Subscribe } from 'unstated'

export default class Header extends React.Component {

    componentDidMount() {
        AuthContainer.getCurrentUser();
    }

    render() {
        return (
            <Subscribe to={[AuthContainer]}>
                {({state : {isAuth, user}, setLoggedOut}) => {
                    if (!isAuth) {
                        return (
                            <nav className="navbar navbar-light">
                                <div className="container">
                                    <Link to="/" className="navbar-brand">BB Network</Link>
                                    <ul className="nav navbar-nav pull-xs-right">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/register">Sign up</Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        )
                    } else {
                        return (
                            <nav className="navbar navbar-light">
                                <div className="container">
                                    <Link to="/" className="navbar-brand">BB Network</Link>
                                    <ul className="nav navbar-nav pull-xs-right">
                                        <li className="nav-item">
                                            <Link to="/" className="nav-link active">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/newpost" className="nav-link">
                                                <i className="ion-compose"></i>&nbsp;New Post
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/settings" className="nav-link">
                                                <i className="ion-gear-a"></i>&nbsp;Settings
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={`/profile/${user._id}`}>
                                                <img src={user.imgURL} style={{width:"30px", height:"30px" ,borderRadius: "50px"}}/>
                                                &nbsp;{user.displayName}
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="#" 
                                                className="nav-link" 
                                                onClick={() => 
                                                    { 
                                                        localStorage.removeItem('token')
                                                        setLoggedOut()
                                                    }
                                            }>
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        )
                    }
                }}
            </Subscribe>
        )
    }
}