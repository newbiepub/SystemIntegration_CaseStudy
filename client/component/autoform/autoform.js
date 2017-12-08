import React from 'react';
import PropTypes from "prop-types";

class AutoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {options1: [], options2: []};
        Object.keys(props.field).forEach((field, index) => {
            this.state[field] = props.field[field].value;
        });
        Object.assign(this.state, {
            benefit_plan: null,
            pay_rates_id_pay_rates: null,
            hire_date: new Date(),
            birthday: new Date()
        })
    }

    componentDidMount() {
        this.props.renderOptions();
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(e, this.state);
    }

    render() {
        return (
            <form className="form-horizontal bucket-form" method="get" onSubmit={this.onSubmit.bind(this)}>
                {(Object.keys(this.props.field)).map((field, index) => {
                    return (
                        <div key={index} className="form-group">
                            <label className="col-sm-3 control-label">{this.props.field[field].label}</label>
                            <div className="col-sm-6">
                                {
                                    this.props.field[field].type === "number" ?
                                        <input type={this.props.field[field].type}
                                               required={true}
                                               min={this.props.field[field].min}
                                               onChange={e => {
                                                   let newState = {};
                                                   newState[field] = e.target.value;
                                                   this.setState(newState);
                                               }}
                                               className="form-control" value={this.state[field]}/>
                                                :
                                            <input type={this.props.field[field].type}
                                                   onChange={e => {
                                                       let newState = {};
                                                       newState[field] = this.props.field[field].type === "checkbox" ? e.target.checked : e.target.value;
                                                       this.setState(newState);
                                                   }}
                                                   value={this.state[field]}
                                                   className="form-control"/>
                                }
                            </div>
                        </div>
                    )
                })}
                <div className="form-group">
                    <label className="col-sm-3 control-label">Birthday</label>
                    <div className="col-sm-6">
                        <input className="form-control"
                               type="date"
                               onChange={e => {
                                   this.setState({birthday: e.target.value})
                               }}
                               value={new Date(this.state.birthday).toISOString().substr(0, 10)}/>
                    </div>
                </div>
                <div className="row">
                    {
                        this.props.type === "create" &&
                        <div className="col-lg-offset-2 col-lg-2">
                            <button type="submit" className="btn btn-primary">Thêm</button>
                        </div>
                    }
                    {
                        this.props.type === "update" &&
                        <div className="col-lg-offset-2 col-lg-2">
                            <button type="submit" className="btn btn-primary">Cập Nhật</button>
                        </div>
                    }
                    <div className="col-lg-2">
                        <button onClick={(e) => {this.props.onCancel(e)}} type="button" className="btn btn-default">Huỷ</button>
                    </div>
                </div>
            </form>
        )
    }
}

AutoForm.propTypes = {
    field: PropTypes.object,
    renderOptions: PropTypes.func,
    type: PropTypes.string,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func
};

AutoForm.defaultProps = {
    field: [],
    renderOptions: () => {
    },
    type: "create",
    onCancel: () => {},
    onSubmit: () => {}
};

export default AutoForm;