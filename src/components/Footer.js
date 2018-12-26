import React from 'react'

export default class Footer extends React.Component {
    render() {
        return (
            <footer style={{backgroundColor: '#262626'}}>
                <div className="container" >
                    <a href="/" className="logo-font">BB Network</a>
                    <span className="attribution">
                        An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
                    </span>
                </div>
            </footer> 
        )
    }
}