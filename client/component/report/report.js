import React from "react";
import PropTypes from "prop-types";
import DataTable from "../../container/admin/dataTable/dataTable";

class Report extends React.Component {
    constructor(props) {
        super(props)
    }

    async loadData () {
        try {
            let {data, loading} = await this.props.loadData();
            let { dataTable } = this.refs;
            if(dataTable) {
                dataTable.setState({data, loading})
            }
        } catch(e) {
            alert(e);
        }
    }

    async componentDidMount() {
        await this.loadData()
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
                                        <select className="form-control input-sm m-bot15"
                                                onChange={e => {
                                                    this.props.instance.setState({filter: e.target.value}, async () => {
                                                        await this.loadData();
                                                    });

                                                }}
                                            value={this.props.instance.state.filter}
                                        >
                                            <option value="all">All</option>
                                            <option value="shareholder">Shareholder</option>
                                            <option value="employee">Employee</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                            <DataTable
                                ref="dataTable"
                                title={this.props.title}
                                field={this.props.fields}/>
                        </div>
                    </section>
                </div>
            </section>
        )
    }
}

Report.propTypes = {
    title: PropTypes.string,
    loadData: PropTypes.func,
    fields: PropTypes.array
};

Report.defaultProps = {
    title: "",
    loadData: () => {},
    fields: []
};

export default Report;