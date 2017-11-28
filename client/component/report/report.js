import React from "react";
import PropTypes from "prop-types";

class Report extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <section className="wrapper">
                <div className="form-w3layouts">
                    <section className="panel">
                        <header className="panel-heading">
                            {this.props.title}
                        </header>
                        <div className="panel-body">
                            <form className="form-horizontal bucket-form">
                                <div className="form-group">
                                    <label className="col-sm-3 control-label col-lg-3" htmlFor="inputSuccess">Chức
                                        vụ</label>
                                    <div className="col-lg-6">
                                        <select className="form-control input-sm m-bot15">
                                            <option>Shareholder</option>
                                            <option>Part-time Employee</option>
                                            <option>Full-time Employee</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-6 col-lg-6 control-label">
                                        <button type="submit" className="btn btn-info">Submit</button>
                                    </div>
                                </div>
                            </form>
                            <div className="form-group">
                                <label style={{textAlign: "right"}} className="col-sm-3 control-label col-lg-3">
                                    Kết Quả
                                </label>
                                <div className="col-lg-6">
                                    <input type="text" className="form-control" disabled={true} value={0}/>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        )
    }
}

Report.propTypes = {
    title: PropTypes.string
};

Report.defaultProps = {
    title: ""
};

export default Report;