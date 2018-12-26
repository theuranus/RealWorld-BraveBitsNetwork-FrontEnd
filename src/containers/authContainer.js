import { Container } from 'unstated'
import { BackEndURL } from  '../config/index'

class AuthContainer extends Container {
    state = {
        isAuth: false,
        user: {
            followList: []
        },
        error: '',
        userInProfile: {}
    }

    setError = (errMessage) => {
        this.setState({error: errMessage})
    }

    doLogin = (data, history) => {
        fetch(`${BackEndURL}/login`, 
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        username: data.username,
                        password: data.password
                    }
                ),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        )
        .then(res => res.json())
        .then(dataRes => {
            if(dataRes.message) {
                this.setError(dataRes.message)
            } else {
                localStorage.setItem('token', dataRes.token)
                this.setState({isAuth: true, user: dataRes.user, error: ''})
                history.push('/')
            }
        })
    }

    doRegister = (data, history) => {
        fetch(`${BackEndURL}/register`, 
            {
                method: 'POST',
                body: JSON.stringify(
                    {
                        displayName: data.displayName,
                        username: data.username,
                        password: data.password,
                        about: data.about
                    }
                ),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        )
        .then(res => res.json())
        .then(dataRes => {
            if(dataRes.message) {
                this.setError(dataRes.message);
            } else {
                localStorage.setItem('token', dataRes.token)
                this.setState({isAuth: true, user: dataRes.user, error: ''})
                history.push('/')
            }
        })
    }

    setLoggedOut = () => {
        this.setState({isAuth: false, user:{ followList: []}, error: ''})
    }

    getCurrentUser = () => {
        const token = localStorage.getItem('token')
        if (token) {
            fetch(`${BackEndURL}/api/user/me`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    }
                }
            )
            .then(res => res.json())
            .then(userx => {
                if(userx.message) {
                    this.setState({error: userx.message})
                } else {
                    this.setState({user: userx, isAuth: true, error: ''})
                }
            })
        } else {
            this.setState({error: 'null token'})
        }
    }

    doFollowUser = (userIdFollowing) => {
        const token = localStorage.getItem('token')
        if (token) {
            fetch(`${BackEndURL}/doFollowUser`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    },
                    body: JSON.stringify({userIdFollowing})
                }
            )
            .then(res => res.json())
            .then(userx => {
                if(userx.message) {
                    this.setState({error: userx.message})
                } else {
                    this.setState({user: userx, isAuth: true, error: ''})
                }
            })
        } else {
            this.setState({error: 'null token'})
        }
    }

    doUpdateUser = (updateUser, history) => {
        const token = localStorage.getItem('token')
        if (token) {
            fetch(`${BackEndURL}/doUpdateUser`,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem('token')
                    },
                    body: JSON.stringify(updateUser)
                }
            )
            .then(res => res.json())
            .then(userx => {
                if(userx.message) {
                    this.setState({error: userx.message})
                } else {
                    this.setState({user: userx, isAuth: true, error: ''})
                    history.push('/')
                }
            })
        } else {
            this.setState({error: 'null token'})
        }
    }

    getUserProfile = (userId) => {
        fetch(`${BackEndURL}/profile/${userId}`)
        .then(res => res.json())
        .then(user => {
            this.setState({userInProfile: user})
        })
    }
}

let authContainer = new AuthContainer()
export default authContainer;