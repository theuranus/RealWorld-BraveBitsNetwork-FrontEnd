import React from 'react'
import AuthContainer from '../containers/authContainer'
import { Subscribe } from 'unstated'
import PostContainer from '../containers/postContainer'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {

    componentDidMount() {
        PostContainer.getGlobalPost()
        PostContainer.getAllTags()
    }

    render() {
        return (
            <Subscribe to={[AuthContainer, PostContainer]}>
                {({ state: { isAuth, user } }, { state: { postType, posts, tags, err }, getGlobalPost, getMyFeed, getPostByTag, doLikeOrUnlike }) => {
                    return (
                        <div className="home-page">
                            <div className="banner">
                                <div className="container">
                                    <h1 className="logo-font">BraveBits Network</h1>
                                    <p>A place to share your knowledge.</p>
                                </div>
                            </div>

                            <div className="container page">
                                <div className="row">
                                    <div className="col-md-9">
                                        <div className="feed-toggle">
                                            <ul className="nav nav-pills outline-active">
                                                {
                                                    isAuth ? 
                                                    (
                                                        <li className="nav-item">
                                                            <a 
                                                                style={{cursor: 'pointer'}}
                                                                className={postType === 'myFeed' ? ('nav-link active'):('nav-link')} 
                                                                onClick={() => {getMyFeed()}}
                                                            >Your Feed</a>
                                                        </li>
                                                    ) : ("")
                                                }
                                                <li className="nav-item">
                                                    <a 
                                                        style={{cursor: 'pointer'}}
                                                        className={postType === 'global' ? ("nav-link active") : ("nav-link")}
                                                        onClick={() => {getGlobalPost()}}
                                                    >Global Feed</a>
                                                </li>
                                                {
                                                    ((postType !== 'global') && (postType !== 'myFeed')) ?
                                                    (<li className="nav-item">
                                                        <a 
                                                            style={{cursor: 'pointer'}}
                                                            className="nav-link active"
                                                        >{postType}</a>
                                                    </li>) 
                                                    :
                                                    ("") 
                                                }
                                            </ul>
                                        </div>
                                        {
                                            posts.length !== 0 ? 
                                                (posts.map(post => {
                                                    return(
                                                        <div className="article-preview" key={post._id}>
                                                            <div className="article-meta">
                                                                <Link to={`/profile/${post.user._id}`}><img src={post.user.imgURL} /></Link>
                                                                <div className="info">
                                                                    <Link to={`/profile/${post.user._id}`} className="author">{post.user.displayName}</Link>
                                                                    <span className="date">{new Date(post.date).toLocaleString()}</span>
                                                                </div>
                                                                <button 
                                                                    className={
                                                                        post.favoritePerson.find(person => person === user._id) === undefined ?
                                                                            "btn btn-outline-primary btn-sm pull-xs-right" : "btn btn-primary btn-sm pull-xs-right"
                                                                    }
                                                                    onClick={() => {
                                                                        doLikeOrUnlike(post._id)
                                                                    }}
                                                                >
                                                                    <i className="ion-heart"></i> {post.favoritePerson.length}
                                                                </button>
                                                            </div>
                                                            <Link to={`/article/${post._id}`} className="preview-link">
                                                                <h1>{post.title}</h1>
                                                                <p>{post.describe}</p>
                                                                <span>Read more...</span>
                                                            </Link>
                                                        </div>
                                                    )
                                                })) 
                                                : 
                                                (<div>No Post to show</div>)
                                        }
                                        

                                    </div>

                                    <div className="col-md-3">
                                        <div className="sidebar">
                                            <p>Popular Tags</p>
                                            <div className="tag-list">
                                                {
                                                    tags ? 
                                                    (
                                                        tags.map((tag, index) => {
                                                            return <a 
                                                                style={{cursor: 'pointer'}}
                                                                className="tag-pill tag-default" 
                                                                key={index} 
                                                                onClick={() => {
                                                                    getPostByTag(tag)
                                                                }}
                                                            >{tag}</a>
                                                        })
                                                    ) : ("")
                                                }
                                            </div>
                                        </div>
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