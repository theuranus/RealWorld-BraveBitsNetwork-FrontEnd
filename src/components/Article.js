import React from 'react'
import { Subscribe } from 'unstated';
import authContainer from '../containers/authContainer'
import postContainer from '../containers/postContainer'
import { Link } from 'react-router-dom'

export default class Article extends React.Component {

    contentInp = React.createRef();

    componentDidMount() {
        postContainer.getPostById(this.props.match.params.pid)
    }

    handleAddComment = (postId, addNewComment) => {
        const content = this.contentInp.current.value.trim()
        if (content && content !== "") {
            addNewComment(postId, content)
            this.contentInp.current.value = ""
        }
    }

    render() {
        return (
            <Subscribe to={[authContainer, postContainer]}>
                {({state: {isAuth, user}, doFollowUser}, {state: {currentPost}, doFavoriteArticle, addNewComment, deleteArticle, deleteComment}) => {
                    return (
                        <div className="article-page">
                            <div className="banner">
                                <div className="container">
                                    <h1>{currentPost.title}</h1>
                                    <div className="article-meta">
                                        <Link to={`/profile/${currentPost.user._id}`}><img src={currentPost.user.imgURL} /></Link>
                                        <div className="info">
                                            <Link to={`/profile/${currentPost.user._id}`} className="author">{currentPost.user.displayName}</Link>
                                            <span className="date">{new Date(currentPost.date).toLocaleString()}</span>
                                        </div>
                                        
                                        {
                                            (isAuth && user._id === currentPost.user._id) ? 
                                            (
                                                <React.Fragment>
                                                    <button className="btn btn-sm btn-outline-primary" onClick={() => {this.props.history.push(`/edit/${currentPost._id}`)}}>
                                                        <i className="ion-plus-round"></i>
                                                        &nbsp;
                                                        Edit Article
                                                    </button>
                                                    &nbsp;
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => {deleteArticle(currentPost._id, this.props.history)}}>
                                                        <i className="ion-plus-round"></i>
                                                        &nbsp;
                                                        Delete Article
                                                    </button>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    {
                                                        user.followList.find(userId => userId === currentPost.user._id) === undefined ?
                                                        (<button className="btn btn-sm btn-outline-secondary" onClick={() => doFollowUser(currentPost.user._id)}>
                                                            <i className="ion-plus-round"></i>
                                                            &nbsp;
                                                            Follow {currentPost.user.displayName}
                                                        </button>)
                                                        : 
                                                        (<button className="btn btn-sm btn-secondary" onClick={() => doFollowUser(currentPost.user._id)}>
                                                            <i className="ion-plus-round"></i>
                                                            &nbsp;
                                                            Unfollow {currentPost.user.displayName}
                                                        </button>)
                                                    }
                                                    
                                                    &nbsp;&nbsp;
                                                    {
                                                        currentPost.favoritePerson.find(userId => userId === user._id) === undefined ?
                                                        (
                                                            <button className="btn btn-sm btn-outline-primary" onClick={() => doFavoriteArticle(currentPost._id)}>
                                                                <i className="ion-heart"></i>
                                                                &nbsp;
                                                                Favorite Article <span className="counter">({currentPost.favoritePerson.length})</span>
                                                            </button>
                                                        ) : (
                                                            <button className="btn btn-sm btn-primary" onClick={() => doFavoriteArticle(currentPost._id)}>
                                                                <i className="ion-heart"></i>
                                                                &nbsp;
                                                                Unfavorite Article <span className="counter">({currentPost.favoritePerson.length})</span>
                                                            </button>
                                                        )
                                                    }
                                                </React.Fragment>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="container page">
                                <div className="row article-content">
                                    <div className="col-md-12">
                                        <p>{currentPost.describe}</p>
                                        <h2 id="introducing-ionic">{currentPost.title}</h2>
                                        <p>{currentPost.content}</p>
                                    </div>
                                </div>
                                <ul className="tag-list">
                                    {
                                        currentPost.tagList.map((tagName, index) => {
                                            return (
                                                <li className="tag-default tag-pill tag-outline" key={index}>{tagName}</li>
                                            )
                                        })
                                    }
                                </ul>
                                <hr/>
                                <div className="article-actions">
                                    <div className="article-meta">
                                        <Link to={`/profile/${currentPost.user._id}`}><img src={currentPost.user.imgURL}/></Link>
                                        <div className="info">
                                            <Link to={`/profile/${currentPost.user._id}`} className="author">{currentPost.user.displayName}</Link>
                                            <span className="date">{new Date(currentPost.date).toLocaleString()}</span>
                                        </div>

                                        {
                                            (isAuth && user._id === currentPost.user._id) ? 
                                            (
                                                <React.Fragment>
                                                    <button className="btn btn-sm btn-outline-primary" onClick={() => {this.props.history.push(`/edit/${currentPost._id}`)}}>
                                                        <i className="ion-plus-round"></i>
                                                        &nbsp;
                                                        Edit Article
                                                    </button>
                                                    &nbsp;
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => {deleteArticle(currentPost._id, this.props.history)}}>
                                                        <i className="ion-plus-round"></i>
                                                        &nbsp;
                                                        Delete Article
                                                    </button>
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    {
                                                        user.followList.find(userId => userId === currentPost.user._id) === undefined ?
                                                        (<button className="btn btn-sm btn-outline-secondary" onClick={() => doFollowUser(currentPost.user._id)}>
                                                            <i className="ion-plus-round"></i>
                                                            &nbsp;
                                                            Follow {currentPost.user.displayName}
                                                        </button>)
                                                        : 
                                                        (<button className="btn btn-sm btn-secondary" onClick={() => doFollowUser(currentPost.user._id)}>
                                                            <i className="ion-plus-round"></i>
                                                            &nbsp;
                                                            Unfollow {currentPost.user.displayName}
                                                        </button>)
                                                    }
                                                    
                                                    &nbsp;&nbsp;
                                                    {
                                                        currentPost.favoritePerson.find(userId => userId === user._id) === undefined ?
                                                        (
                                                            <button className="btn btn-sm btn-outline-primary" onClick={() => doFavoriteArticle(currentPost._id)}>
                                                                <i className="ion-heart"></i>
                                                                &nbsp;
                                                                Favorite Article <span className="counter">({currentPost.favoritePerson.length})</span>
                                                            </button>
                                                        ) : (
                                                            <button className="btn btn-sm btn-primary" onClick={() => doFavoriteArticle(currentPost._id)}>
                                                                <i className="ion-heart"></i>
                                                                &nbsp;
                                                                Unfavorite Article <span className="counter">({currentPost.favoritePerson.length})</span>
                                                            </button>
                                                        )
                                                    }
                                                </React.Fragment>
                                            )
                                        }

                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-xs-12 col-md-8 offset-md-2">
                                        {
                                            isAuth ?
                                            (
                                                <div className="card comment-form">
                                                    <div className="card-block">
                                                        <textarea className="form-control" placeholder="Write a comment..." rows="3" ref={this.contentInp}></textarea>
                                                    </div>
                                                    <div className="card-footer">
                                                        <img src={user.imgURL} className="comment-author-img" />
                                                        <button className="btn btn-sm btn-primary" onClick={() => this.handleAddComment(currentPost._id, addNewComment)}>
                                                            Post Comment
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <h3>Please <Link to="/login">Login</Link> to comment</h3>
                                                </div>
                                            )
                                        }
                                        

                                        {
                                            currentPost.comments.map(comment => {
                                                return (
                                                    <div className="card" key={comment._id}>
                                                        <div className="card-block">
                                                            <p className="card-text">{comment.content}</p>
                                                        </div>
                                                        <div className="card-footer">
                                                            <Link to={`/profile/${comment.user._id}`} className="comment-author">
                                                                <img src={comment.user.imgURL} className="comment-author-img" />
                                                            </Link>
                                                            &nbsp;
                                                            <Link to={`/profile/${comment.user._id}`} className="comment-author">{comment.user.displayName}</Link>
                                                            <span className="date-posted">{new Date(comment.date).toLocaleString()}</span>
                                                            {
                                                                ((user._id === currentPost.user._id) || (user._id === comment.user._id)) ? 
                                                                (
                                                                    <span 
                                                                        className="mod-options"
                                                                        onClick={() => deleteComment(currentPost._id, comment._id)}
                                                                    >
                                                                        <i className="ion-trash-a"></i>
                                                                    </span>
                                                                ) : ("")
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                        

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