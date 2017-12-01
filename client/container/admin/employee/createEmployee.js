import React from "react";
import AutoForm from "../../../component/autoform/autoform";

class CreateEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.field = {
            first_name: {type: "text", value: "", label: "First Name"},
            last_name: {type: "text", value: "", label: "Last Name"},
            middle_initial: {type: "text", value: "", label: "Middle Name"},
            address1: {type: "text", value: "", label: "Address 1"},
            address2: {type: "text", value: "", label: "Address 2"},
            city: {type: "text", value: "", label: "City"},
            state: {type: "text", value: "", label: "State"},
            zip: {type: "number", value: 0, min: 0, label: "Zip"},
            email: {
                type: "text", value: "",
                validate: {
                    validator: function (v) {
                        return (new RegExp((/^[a-z0-9A-Z]{1,}\@[a-z0-9A-Z]{1,}\.[a-z0-9A-Z]{1,}$/))).test(v);
                    },
                    message: '{VALUE} is not a valid email !'
                }, label: "Email"
            },
            phone_number: {
                type: "text", value: "",
                validate: {
                    validator: (v) => {
                        return (new RegExp(/^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/)).test(v);
                    },
                    message: "{VALUE} is not a valid phone number"
                }, label: "Phone Number"
            },
            SSN: {
                type: "text", value: "",
                required: true, label: "SSN"
            },
            driver_license: {type: "text", value: "", label: "Driver License"},
            marital_status: {type: "text", value: "", label: "Marital Status"},
            gender: {type: "checkbox", value: true, label: "Gender"},
            shareholder_status: {type: "checkbox", value: true, label: "Shareholder Status"},
            benefit_plan: {type: "options", value: 0, min: 0, label: "Benefit Plan"},
            Ethnicity: {type: "text", value: "", label: "Ethnicity"},
            pay_rate: {type: "text", value: "", label: "Pay Rate"},
            pay_rates_id_pay_rates: {type: "options", value: 0, min: 0, label: "Pay Rates ID"},
            vacation_days: {type: "number", value: 0, min: 0, label: "Vacation Days"},
            paid_to_date: {type: "number", value: 0, min: 0, label: "Paid To Date"},
            paid_last_year: {type: "number", value: 0, min: 0, label: "Paid Last Year"}
        }
    }

    renderOptions () {
        const self = this;
        (() => {
            $.ajax({
                url: "http://localhost:3000/api/payrates",
                method: "GET",
                dataType: "json",
                success (data) {
                    let { autoForm } = self.refs;
                    if(autoForm) {
                        let options1 = data.map((item, index) => ({
                            name: item.pay_rates_name,
                            value: parseInt(item.id_pay_rates)
                        }));
                        autoForm.setState({options1, pay_rates_id_pay_rates: options1[0].value});
                    }
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
                    let { autoForm } = self.refs;
                    if(autoForm) {
                        let options2 = data.map((item, index) => ({
                            name: item.plan_name,
                            value: parseInt(item.benefit_plan_id)
                        }));
                        autoForm.setState({options2, benefit_plan: options2[0].value});
                    }
                },
                error(xhr, statusCode, error) {
                    console.log(xhr);
                    alert(error);
                }
            })
        })();
    }

    onCancel (e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    onSubmit(e, data) {
        console.log(data);
    }

    render() {
        return (
            <section className="wrapper">
                <section className="panel">
                    <header className="panel-heading">Add Employee</header>
                    <div className="panel-body">
                        <AutoForm ref='autoForm' field={this.field}
                                  onSubmit={this.onSubmit.bind(this)}
                                  onCancel={this.onCancel.bind(this)}
                                  renderOptions={this.renderOptions.bind(this)}/>
                    </div>
                </section>
            </section>
        )
    }
}

export default CreateEmployee;