import React, {Component} from "react";
import {renderRoutes} from "react-router-config";
import AdminSidebar from "../component/admin/sidebar/sidebar";
import AdminHeader from "../component/admin/header/header";
import {logout} from "../action/account";
import {connect} from "react-redux";

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {
                    (this.props.location.pathname === "/login" || this.props.location.pathname === "/404") &&
                    renderRoutes(this.props.route.routes)
                }
                {
                    (this.props.location.pathname !== "/login" && this.props.location.pathname !== "/404") &&
                    <section id="container">
                        <AdminHeader {...this.props}/>
                        <AdminSidebar {...this.props}/>
                        <section id="main-content">
                            {renderRoutes(this.props.route.routes)}
                        </section>
                    </section>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(App);