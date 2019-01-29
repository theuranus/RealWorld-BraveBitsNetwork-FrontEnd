import React from 'react'
import { Subscribe } from 'unstated';
import authContainer from '../containers/authContainer'
import postContainer from '../containers/postContainer'
import { Link } from 'react-router-dom'

export default class Profile extends React.Component {

    componentDidMount() {
        authContainer.getUserProfile(this.props.match.params.uid)
        postContainer.getMyArticles(this.props.match.params.uid)
    }
    
    componentDidUpdate() {
        authContainer.getUserProfile(this.props.match.params.uid)
        postContainer.getMyArticles(this.props.match.params.uid)
    }

    render() {
        return <Subscribe to={[authContainer, postContainer]}>
            {({state: {isAuth, user, userInProfile}, doFollowUser}, {state: {postType, posts},  doLikeOrUnlike, getMyArticles, getFavoritedArticles}) => {
                return (
                <div className="profile-page">
                    <div className="user-info">
                        <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                <img src={userInProfile.imgURL} className="user-img" />
                                <h4>{userInProfile.displayName}</h4>
                                <p>{userInProfile.about}</p>
                                {
                                    user.followList.find(userId => userId === userInProfile._id) === undefined ?
                                    (<button className="btn btn-sm btn-outline-secondary action-btn" onClick={() => doFollowUser(userInProfile._id)}>
                                        <i className="ion-plus-round"></i>
                                        &nbsp;
                                        Follow {userInProfile.displayName}
                                    </button>)
                                    : 
                                    (<button className="btn btn-sm btn-secondary action-btn" onClick={() => doFollowUser(userInProfile._id)}>
                                        <i className="ion-plus-round"></i>
                                        &nbsp;
                                        Unfollow {userInProfile.displayName}
                                    </button>)
                                }
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                <div className="articles-toggle">
                                    <ul className="nav nav-pills outline-active">
                                        <li className="nav-item">
                                            <a 
                                                className={postType === 'myArticles' ? "nav-link active":"nav-link"} 
                                                style={{cursor: 'pointer'}}
                                                onClick={() => {
                                                    getMyArticles(this.props.match.params.uid)
                                                }}
                                            >My Articles</a>
                                        </li>
                                        <li className="nav-item">
                                            <a 
                                                className={postType === 'favoritedArticles' ? "nav-link active":"nav-link"} 
                                                style={{cursor: 'pointer'}}
                                                onClick={() => {
                                                    getFavoritedArticles(this.props.match.params.uid)
                                                }}
                                            >Favorited Articles</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="article-preview">
                                    {
                                        posts && posts.length > 0 ?
                                        (
                                            posts.map(post => {
                                                return <div key={post._id}>
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
                                                            onClick={() => {doLikeOrUnlike(post._id)}}
                                                        >
                                                            <i className="ion-heart"></i> {post.favoritePerson.length}
                                                        </button>
                                                    </div>
                                                    <Link to={`/article/${post._id}`} className="preview-link">
                                                        <h1>{post.title}</h1>
                                                        <p>{post.describe}</p>
                                                        <span>Read more...</span>
                                                        <ul className="tag-list">
                                                            {
                                                                post.tagList && post.tagList.length > 0 ? 
                                                                (
                                                                    post.tagList.map((tag, index) => {
                                                                        return <li className="tag-default tag-pill tag-outline" key={index}>{tag}</li>
                                                                    })
                                                                ) : ("")
                                                            }
                                                        </ul>
                                                    </Link> 
                                                    <hr/>
                                                </div>
                                            })
                                        ) : (
                                            <h3>No Post to show</h3>
                                        )
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                </div>)
                
            }}
        </Subscribe>
    }

}