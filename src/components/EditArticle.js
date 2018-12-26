import React from 'react'
import { Subscribe } from 'unstated';
import authContainer from '../containers/authContainer'
import postContainer from '../containers/postContainer'

export default class EditArticle extends React.Component {

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

    componentDidMount() {
        postContainer.getPostById(this.props.match.params.pid)
    }

    handleEditPost = (postId) => {
        const title = this.titleInp.current.value.trim()
        const description = this.descriptionInp.current.value.trim()
        const content = this.contentInp.current.value.trim()
        const strTags = this.tagsInp.current.value.trim()

        if (title === "" || description === "" || content === "" || strTags === "") {
            this.setState({error: "Please fill all blank"})
        } else {
            const tagList = strTags.split(",")
            const editedArticle = {
                _id: postId,
                tagList,
                describe: description,
                title,
                content     
            }
            postContainer.editArticle(editedArticle, this.props.history)
        }
    }

    render() {
        return(
            <Subscribe to={[authContainer, postContainer]}>
                {({state: {isAuth, user}}, {state: {currentPost}}) => {
                    return (isAuth && user._id === currentPost.user._id) ? 
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
                                                    defaultValue={currentPost.title}
                                                />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="What's this article about?"
                                                    ref={this.descriptionInp}
                                                    defaultValue={currentPost.describe}
                                                />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <textarea 
                                                    className="form-control" 
                                                    rows="8" 
                                                    placeholder="Write your article"
                                                    ref={this.contentInp}
                                                    defaultValue={currentPost.content}
                                                />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Enter tags"
                                                    ref={this.tagsInp}
                                                    defaultValue={currentPost.tagList.join(',')}
                                                />
                                                <div className="tag-list"></div>
                                            </fieldset>
                                            <button 
                                                className="btn btn-lg pull-xs-right btn-primary" 
                                                type="button"
                                                onClick={() => this.handleEditPost(currentPost._id)}
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
                            <h3>You do not have permitsion to go this site</h3>
                        </div>
                    )
                }}
            </Subscribe>    
        )
    }

}