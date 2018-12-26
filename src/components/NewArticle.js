import React from 'react'
import { Subscribe } from 'unstated';
import authContainer from '../containers/authContainer'
import postContainer from '../containers/postContainer'
import { Link } from 'react-router-dom'

export default class NewArticle extends React.Component {

    constructor() {
        super()
        this.state = {
            error: ""
        }
    }

    titleInp = React.createRef()
    descriptionInp = React.createRef()
    contentInp = React.createRef()
    tagsInp = React.createRef()

    handleNewPost = () => {
        const title = this.titleInp.current.value.trim()
        const description = this.descriptionInp.current.value.trim()
        const content = this.contentInp.current.value.trim()
        const strTags = this.tagsInp.current.value.trim()

        if (title === "" || description === "" || content === "" || strTags === "") {
            this.setState({error: "Please fill all blank"})
        } else {
            const tagList = strTags.split(",")
            const newArticle = {
                tagList,
                description,
                title,
                content     
            }
            postContainer.createNewArticle(newArticle, this.props.history)
        }
    }

    render() {
        return(
            <Subscribe to={[authContainer]}>
                {({state: {isAuth, user}}) => {
                    return isAuth ? 
                    (
                        <div className="editor-page">
                            <div className="container page">
                                <div className="row">
                                    <div className="col-md-10 offset-md-1 col-xs-12">
                                        <fieldset>
                                            {
                                                this.state.error !== "" ? 
                                                (
                                                    <ul className="error-messages">
                                                        <li>{this.state.error}</li>
                                                    </ul>
                                                ) : ("")
                                            }
                                            
                                            <fieldset className="form-group">
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-lg" 
                                                    placeholder="Article Title"
                                                    ref={this.titleInp}
                                                />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="What's this article about?"
                                                    ref={this.descriptionInp}
                                                />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <textarea 
                                                    className="form-control" 
                                                    rows="8" 
                                                    placeholder="Write your article"
                                                    ref={this.contentInp}
                                                ></textarea>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Enter tags"
                                                    ref={this.tagsInp}
                                                />
                                                <div className="tag-list"></div>
                                            </fieldset>
                                            <button 
                                                className="btn btn-lg pull-xs-right btn-primary" 
                                                type="button"
                                                onClick={() => this.handleNewPost()}
                                            >
                                                Publish Article
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3>Please <Link to="/login">Login</Link> to create an article</h3>
                        </div>
                    )
                }}
            </Subscribe>    
        )
    }

}