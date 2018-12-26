import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from 'unstated'

import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Article from './components/Article'
import NewArticle from './components/NewArticle'
import EditArticle from './components/EditArticle'
import Settings from './components/Settings'
import Profile from './components/Profile'

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header/>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/article/:pid" exact component={Article}/>
                    <Route path="/newpost" exact component={NewArticle}/>
                    <Route path="/edit/:pid" exact component={EditArticle}/>
                    <Route path="/settings" exact component={Settings}/>
                    <Route path="/profile/:uid" exact component={Profile}/>
                    <Footer/>
                </div>
            </BrowserRouter>
        )
    }
}

ReactDOM.render(
    <Provider>
       <App/> 
    </Provider>, document.getElementById('root')
)