import React from "react";
import {Redirect} from "react-router-dom";
import * as _ from "lodash";

class EditEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options1: [],
            options2: [],
            first_name: "",
            last_name: "",
            middle_initial: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: 0,
            email: "",
            phone_number: "",
            SSN: 0,
            driver_license: "",
            marital_status: "",
            gender: false,
            shareholder_status: false,
            benefit_plan: 1,
            Ethnicity: "",
            pay_rate: "",
            pay_rates_id_pay_rates: 1,
            vacation_days: 0,
            paid_to_date: 0,
            paid_last_year: 0,
            isUpdate: false
        }
    }

    componentDidMount() {
        const self = this;
        (() => {
            $.ajax({
                url: "http://localhost:3000/api/payrates",
                method: "GET",
                dataType: "json",
                success (data) {
                    let options1 = data.map((item, index) => ({
                        name: item.pay_rates_name,
                        value: parseInt(item.id_pay_rates)
                    }));
                    self.setState({options1});
                },
                error(xhr, statusCode, error) {
                    console.log(xhr);
                    alert(error);
                }
            })
        })();
        (() => {
            $.ajax({
                url: "http://localhost:3000/api/benefit/plans",
                method: "GET",
                dataType: "json",
                success (data) {
                    let options2 = data.map((item, index) => ({
                        name: item.plan_name,
                        value: parseInt(item.benefit_plan_id)
                    }));
                    self.setState({options2});
                },
                error(xhr, statusCode, error) {
                    console.log(xhr);
                    alert(error);
                }
            })
        })();
        if(this.props.match.params.id) {
            (() => {
                $.ajax({
                    url: `http://localhost:3000/api/employee/detail/${this.props.match.params.id}`,
                    method: "GET",
                    success (data) {
                        console.log(data);
                        let updateItems = {};
                        _.each(Object.keys(data), (field, index) => {
                            updateItems[field] = data[field];
                        });
                        self.setState(updateItems);
                    },
                    error (xhr, statusCode, error) {
                        console.log(xhr);
                        alert(error);
                    }
                })
            })()
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({isUpdate: true});
        const self = this;
        let _csrf = $("#_csrf").val();
        (() => {
            $.ajax({
                url: "http://localhost:3000/api/employee/update",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({_csrf, ..._.omit(self.state, ["options1", "options2", "isUpdate"])}),
                dataType: "json",
                success (data) {
                    if(data.success) {
                        self.props.history.goBack();
                    } else {
                        alert("Update Failed");
                    }
                    self.setState({isUpdate: false})
                },
                error(xhr, statusCode, error) {
                    console.log(xhr);
                    alert(error);
                    self.setState({isUpdate: false})
                }
            })
        })();
    }

    render() {
        if(this.props.match.params.id) {
            return (
                <section className="wrapper">
                    <section className="panel">
                        <header className="panel-heading">Update Employee</header>
                        <div className="panel-body">
                            <form className="form-horizontal bucket-form" onSubmit={this.onSubmit.bind(this)}>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">First Name</label>
                                    <div className="col-sm-6">
                                        <input type={"text"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["first_name"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               className="form-control" value={this.state.first_name}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Last Name</label>
                                    <div className="col-sm-6">
                                        <input type={"text"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["last_name"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               className="form-control" value={this.state.last_name}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Middle Initial</label>
                                    <div className="col-sm-6">
                                        <input type={"text"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["middle_initial"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               className="form-control" value={this.state.middle_initial}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Address 1</label>
                                    <div className="col-sm-6">
                                        <input type={"text"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["address1"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               className="form-control" value={this.state.address1}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Address 2</label>
                                    <div className="col-sm-6">
                                        <input type={"text"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["address2"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               className="form-control" value={this.state.address2}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">City</label>
                                    <div className="col-sm-6">
                                        <input type={"text"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["city"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               className="form-control" value={this.state.city}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">State</label>
                                    <div className="col-sm-6">
                                        <input type={"text"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["state"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               className="form-control" value={this.state.state}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Zip</label>
                                    <div className="col-sm-6">
                                        <input type={"text"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["zip"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               className="form-control" value={this.state.zip}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Email</label>
                                    <div className="col-sm-6">
                                        <input type={"text"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["email"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               className="form-control" value={this.state.email}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Phone Number</label>
                                    <div className="col-sm-6">
                                        <input type={"text"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["phone_number"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               className="form-control" value={this.state.phone_number}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">SSN</label>
                                    <div className="col-sm-6">
                                        <input type={"text"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["SSN"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               className="form-control" value={this.state.SSN}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Driver License</label>
                                    <div className="col-sm-6">
                                        <input type={"text"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["driver_license"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               className="form-control" value={this.state.driver_license}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Marital Status</label>
                                    <div className="col-sm-6">
                                        <input type={"text"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["marital_status"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               className="form-control" value={this.state.marital_status}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Gender</label>
                                    <div className="col-sm-6">
                                        <input type={"checkbox"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["gender"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               checked={this.state.gender}
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Shareholder Status</label>
                                    <div className="col-sm-6">
                                        <input type={"checkbox"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["shareholder_status"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               checked={this.state.shareholder_status}
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Benefit Plans</label>
                                    <div className="col-sm-6">
                                        {this.state.options2.length > 0 &&
                                        <select className="form-control m-bot15"
                                                onChange={e => {
                                                    this.setState({benefit_plan: e.target.value})
                                                }}
                                                value={this.state.benefit_plan}
                                        >
                                            {this.state.options2.map((item, index) => <option
                                                key={index} value={item.value}>{item.name}</option>)}
                                        </select>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Ethnicity</label>
                                    <div className="col-sm-6">
                                        <input type={"text"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["Ethnicity"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               value={this.state.Ethnicity}
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Pay Rate</label>
                                    <div className="col-sm-6">
                                        <input type={"text"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["pay_rate"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               value={this.state.pay_rate}
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Pay Rate ID</label>
                                    <div className="col-sm-6">
                                        {
                                            this.state.options1.length > 0 &&
                                            <select className="form-control m-bot15"
                                                    onChange={e => {
                                                        let newState = {};
                                                        newState["pay_rates_id_pay_rates"] = e.target.value;
                                                        this.setState(newState);
                                                    }}
                                                    value={this.state.pay_rates_id_pay_rates}
                                            >
                                                {this.state.options1.map((item, index) =>
                                                    <option
                                                        key={index} value={item.value}>{item.name}</option>)}
                                            </select>
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Vacation Days</label>
                                    <div className="col-sm-6">
                                        <input type={"number"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["vacation_days"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               value={this.state.vacation_days}
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Paid To Date</label>
                                    <div className="col-sm-6">
                                        <input type={"number"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["paid_to_date"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               value={this.state.paid_to_date}
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label">Paid Last Year</label>
                                    <div className="col-sm-6">
                                        <input type={"number"}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState["paid_last_year"] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               value={this.state.paid_last_year}
                                               className="form-control"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-offset-2 col-lg-2">
                                        <button disabled={this.state.isUpdate} type="submit" className="btn btn-primary">Cập Nhật</button>
                                    </div>
                                    <div className="col-lg-2">
                                        <button disabled={this.state.isUpdate} onClick={(e) => {
                                            this.props.history.goBack();
                                        }} type="button" className="btn btn-default">Huỷ</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </section>
            )
        }
        return <Redirect to="/employee"/>
    }
}

export default EditEmployee;