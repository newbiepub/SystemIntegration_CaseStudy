import React from "react";
import {login, logout} from "../../../action/account";
import {connect} from "react-redux"

class AdminHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeCount: 0
        }
    }

    // fetch User from server
    static async login(store, user) {
        return await store.dispatch(login(user));
    }

    //Logout
    static logout(store) {
        return store.dispatch(logout())
    }

    componentDidMount() {
        let self = this;
        (() => {
            $.ajax({
                url: "http://localhost:3000/api/employee/count",
                method: "GET",
                dataType: "json",
                success(data) {
                    self.setState({employeeCount: data.employeeCount});
                },
                error(xhr, statusCode, error) {
                    alert(error);
                }
            })
        })()
    }

    render() {
        return (
            <section className="wrapper">
                <div className="market-updates">
                    <div className="col-md-3 market-update-gd">
                        <div className="market-update-block clr-block-1">
                            <div className="col-md-4 market-update-right">
                                <i className="fa fa-users"></i>
                            </div>
                            <div className="col-md-8 market-update-left">
                                <h4>Nhân Viên</h4>
                                <h3>{this.state.employeeCount}</h3>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </section>
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

export default connect(mapStateToProps, mapDispatchToProps) (AdminHome);