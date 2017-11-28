import React from "react";
import {Link} from "react-router-dom";

const jQueryInit = () => {
    /*==Sidebar Toggle==*/

    $(".leftside-navigation .sub-menu > a").click(function () {
        var o = ($(this).offset());
        var diff = 80 - o.top;
        if (diff > 0)
            $(".leftside-navigation").scrollTo("-=" + Math.abs(diff), 500);
        else
            $(".leftside-navigation").scrollTo("+=" + Math.abs(diff), 500);
    });

    $('.sidebar-toggle-box .fa-bars').click(function (e) {

        $(".leftside-navigation").niceScroll({
            cursorcolor: "#1FB5AD",
            cursorborder: "0px solid #fff",
            cursorborderradius: "0px",
            cursorwidth: "3px"
        });

        $('#sidebar').toggleClass('hide-left-bar');
        if ($('#sidebar').hasClass('hide-left-bar')) {
            $(".leftside-navigation").getNiceScroll().hide();
        }
        $(".leftside-navigation").getNiceScroll().show();
        $('#main-content').toggleClass('merge-left');
        e.stopPropagation();
        if ($('#container').hasClass('open-right-panel')) {
            $('#container').removeClass('open-right-panel')
        }
        if ($('.right-sidebar').hasClass('open-right-bar')) {
            $('.right-sidebar').removeClass('open-right-bar')
        }

        if ($('.header').hasClass('merge-header')) {
            $('.header').removeClass('merge-header')
        }


    });
    $('.toggle-right-box .fa-bars').click(function (e) {
        $('#container').toggleClass('open-right-panel');
        $('.right-sidebar').toggleClass('open-right-bar');
        $('.header').toggleClass('merge-header');

        e.stopPropagation();
    });

    $('.header,#main-content,#sidebar').click(function () {
        if ($('#container').hasClass('open-right-panel')) {
            $('#container').removeClass('open-right-panel')
        }
        if ($('.right-sidebar').hasClass('open-right-bar')) {
            $('.right-sidebar').removeClass('open-right-bar')
        }

        if ($('.header').hasClass('merge-header')) {
            $('.header').removeClass('merge-header')
        }


    });


    $('.panel .tools .fa').click(function () {
        var el = $(this).parents(".panel").children(".panel-body");
        if ($(this).hasClass("fa-chevron-down")) {
            $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
            el.slideUp(200);
        } else {
            $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
            el.slideDown(200);
        }
    });


    $('.panel .tools .fa-times').click(function () {
        $(this).parents(".panel").parent().remove();
    });
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        jQueryInit();
        let {account} = this.props;
        this.setState({user: account.user});
    }

    onClick(e) {
        e.preventDefault();
        try {
            let _csrf = $("#_csrf").val();
            $.ajax({
                method: "POST",
                url: "http://localhost:3000/logout",
                data: JSON.stringify({_csrf: _csrf}),
                headers: {"Content-Type": "application/json"},
                dataType: "json"
            })
                .fail((data, textStatus, xhr) => {
                    //This shows status code eg. 403
                    console.log("error", data.status);
                    //This shows status message eg. Forbidden
                    console.log("STATUS: "+xhr);
                })
                .done(response => {
                this.props.logout();
                console.log("Redirect To: ", response.redirectUrl);
                window.location = response.redirectUrl;
            })
        } catch (e) {
            console.log(e);
        }
    }

    getProfileName() {
        try {
            return this.state.user.profile.name;
        } catch (e) {
            return ""
        }
    }

    render() {
        try {
            return (
                <header className="header fixed-top clearfix">
                    <div className="brand">
                        <Link to='/' className="logo">
                            DASHBOARD
                        </Link>
                        <div className="sidebar-toggle-box">
                            <div className="fa fa-bars"/>
                        </div>
                    </div>
                    <div className="nav notify-row" id="top_menu">
                        <ul className="nav top-menu">
                            <li className="dropdown"></li>
                            <li id="header_inbox_bar" className="dropdown"></li>
                            <li id="header_notification_bar" className="dropdown"></li>
                        </ul>
                    </div>
                    <AdminHeaderNotification/>
                    <div className="top-nav clearfix">

                        <ul className="nav pull-right top-menu">
                            <li className="dropdown">
                                <a data-toggle="dropdown" className="dropdown-toggle" href="#" style={{padding: "5px"}}>
                                    <span className="username">{this.getProfileName()}</span>
                                    <b className="caret"></b>
                                </a>
                                <ul className="dropdown-menu extended logout">
                                    <li><Link to="/setting"><i className="fa fa-cog"></i> Cài đặt</Link></li>
                                    <li><a href="#" onClick={this.onClick.bind(this)}><i className="fa fa-key"></i>Đăng xuất</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </header>
            )
        } catch (e) {
            console.log(e);
        }
    }
}

class AdminHeaderNotification extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="nav notify-row" id="top_menu">
                <ul className="nav top-menu">
                    <li id="header_notification_bar" className="dropdown">
                        <a data-toggle="dropdown" className="dropdown-toggle" href="#">

                            <i className="fa fa-bell-o"></i>
                        </a>
                        <ul className="dropdown-menu extended notification">
                            <li>
                                <p>Notifications</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Header;