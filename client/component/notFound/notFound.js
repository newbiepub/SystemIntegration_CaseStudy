import React from "react";

class NotFound extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }

    render() {
        return (
            <div className="wrapper-not-found">
                <div className="wrapper-container">
                    <div className="logo">
                        <h1>404</h1>
                        <p> Sorry - Page not Found!</p>
                        <div className="sub">
                            <a href="/">Back To Home</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFound;