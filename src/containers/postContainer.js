import { Container } from 'unstated'
import { BackEndURL } from  '../config/index'

class PostContainer extends Container {
    state = {
        postType: 'global',
        posts: [],
        tags: [],
        err: '',
        currentPost: {
            favoritePerson: [],
            user: {},
            comments: [],
            tagList: []
        }
    }

    getGlobalPost = () => {
        fetch(`${BackEndURL}/globalpost`)
        .then(res => res.json()) 
        .then(posts => {
            if(posts.message) {
                this.setState({err: posts.message})
            } else {
                this.setState(
                    {
                        postType:'global',
                        posts: posts,
                        err: ''
                    }
                )
            }
        })
    }

    getMyFeed = () => {
        const token = localStorage.getItem('token')
        if (token) {
            fetch(`${BackEndURL}/myFeed`,
                {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": token
                    } 
                }
            )
            .then(res => res.json())
            .then(posts => {
                if(posts.message) {
                    this.setState({err: posts.message})
                } else {
                    this.setState({
                        postType: 'myFeed',
                        posts,
                        err: ''
                    })
                }
            })
        } else {
            this.setState({err: 'null token'})
        }
    }

    getMyArticles = (userId) => {
        fetch(`${BackEndURL}/articles/${userId}`)
        .then(res => res.json())
        .then(posts => this.setState({postType: 'myArticles', posts}))
    }

    getFavoritedArticles = (userId) => {
        fetch(`${BackEndURL}/favorited/${userId}`)
        .then(res => res.json())
        .then(posts => this.setState({postType: 'favoritedArticles', posts}))
    }

    getAllTags = () => {
        fetch(`${BackEndURL}/tags`)
        .then(res => res.json()) 
        .then(tags => {
            if(tags.message) {
                this.setState({err: tags.message})
            } else {
                this.setState(
                    {
                        tags
                    }
                )
            }
        })
    }

    getPostByTag = (tagName) => {
        fetch(`${BackEndURL}/getPostTag/${tagName}`)
        .then(res => res.json())
        .then(posts => {
            if(posts.message) {
                this.setState({err: posts.message})
            } else {
                this.setState({
                    postType: `${tagName}`,
                    posts,
                    err: ''
                })
            }
        })
    }

    doLikeOrUnlike = (postId) => {
        const token = localStorage.getItem('token')
        if(token) {
            fetch(`${BackEndURL}/doLikePost`,
                {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        postId: postId
                    }) 
                }
            )
            .then(res => res.json())
            .then(post => {
                this.setState({posts: this.state.posts.map(p => {
                    return p._id === post._id ? post : p
                })})
            })
        }
        else {
            this.setState({err: 'null token'})
        }
    }

    doFavoriteArticle = (postId) => {
        const token = localStorage.getItem('token')
        if(token) {
            fetch(`${BackEndURL}/doLikePost`,
                {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        postId: postId
                    }) 
                }
            )
            .then(res => res.json())
            .then(post => {
                this.setState({currentPost: post})
            })
        }
        else {
            this.setState({err: 'null token'})
        }
    }

    getPostById = (postId) => {
        fetch(`${BackEndURL}/post/${postId}`)
        .then(res => res.json())
        .then(post => {
            this.setState({currentPost: post})
        })
    }

    addNewComment = async (postId, content) => {
        const token = localStorage.getItem('token')
        if(token) {
            await fetch(`${BackEndURL}/addNewComment`,
                {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({
                        postId,
                        content
                    }) 
                }
            )
            await this.getPostById(postId)
        }
        else {
            this.setState({err: 'null token'})
        }
    }

    createNewArticle = (newArticle, history) => {
        const token = localStorage.getItem('token')
        if(token) {
            fetch(`${BackEndURL}/addNewPost`,
                {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify(newArticle) 
                }
            )
            .then(res => res.json())
            .then(post => {
                history.push(`/article/${post._id}`)
            })
        }
    }

    editArticle = (editedArticle, history) => {
        const token = localStorage.getItem('token')
        if(token) {
            fetch(`${BackEndURL}/editPost`,
                {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify(editedArticle) 
                }
            )
            .then(res => res.json())
            .then(post => {
                history.push(`/article/${post._id}`)
            })
        }
    }

    deleteArticle = (postId, history) => {
        const token = localStorage.getItem('token')
        if(token) {
            fetch(`${BackEndURL}/deletePost`,
                {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({postId}) 
                }
            )
            .then(res => res.json())
            .then(() => {
                history.push('/')
            })
        }
    }

    deleteComment = (postId, commentId) => {
        const token = localStorage.getItem('token')
        if(token) {
            fetch(`${BackEndURL}/deleteComment`,
                {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": token
                    },
                    body: JSON.stringify({postId, commentId}) 
                }
            )
            .then(res => res.json())
            .then((postx) => {
                this.setState({currentPost: postx})
            })
        }
    }
}

let postContainer = new PostContainer()
export default postContainer;