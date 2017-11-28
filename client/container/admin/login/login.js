import React from "react";
import {Redirect} from "react-router-dom";

class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({isLogin: true});
        let _csrf = $("#_csrf").val();
        let {username, password} = this.state;

        $.ajax({
            method: "POST",
            url: "http://localhost:3000/login",
            data: {username, password, _csrf},
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            dataType: "json"
        }).fail((fail) => {
            alert("Email or password is wrong");
            this.setState({isLogin: false})
        })
            .done((response) => {
                this.setState({isLogin: false});
                console.log("Redirect To: ", response.redirectUrl);
                window.location = response.redirectUrl;
            })
    }

    render() {
        let {isExact} = this.props.match;
        if (isExact) {
            return (
                <div className="log-w3">
                    <div className="w3layouts-main">
                        <h2>Sign In Now</h2>
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <input type="email" className="ggg" name="Email" placeholder="E-MAIL"
                                   onChange={(e) => {
                                       let username = e.target.value;
                                       this.setState({username})
                                   }}
                                   required=""/>
                            <input type="password" className="ggg" name="Password" placeholder="PASSWORD"
                                   onChange={(e) => {
                                       let password = e.target.value;
                                       this.setState({password})
                                   }}
                                   required=""/>
                            <div className="clearfix"></div>
                            <input type="submit" value="Sign In" name="login" disabled={this.state.isLogin}/>
                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <Redirect to="/404"/>
            )
        }

    }
}

export default AdminLogin;