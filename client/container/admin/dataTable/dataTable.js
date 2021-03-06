import React from "react";
import PropTypes from "prop-types";
import Loading from "../../../component/loading/loading";
import * as _ from "lodash";
import {formatDate} from "../../../utils/moment";

class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: []
        }
    }

    render() {
        return (
            <section className="wrapper">
                <div className="table-agile-info">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            {this.props.title}
                        </div>
                        <div>
                            {
                                this.state.loading &&
                                <Loading/>
                            }
                            {
                                (!this.state.loading && this.state.data.length > 0) &&
                                <table className="table" ui-jq="footable" ui-options="{
        &quot;paging&quot;: {
          &quot;enabled&quot;: true
        },
        &quot;filtering&quot;: {
          &quot;enabled&quot;: true
        },
        &quot;sorting&quot;: {
          &quot;enabled&quot;: true
        }}">
                                    <thead>
                                    <tr>
                                        {this.props.field.map((field, index) => {
                                            return <th key={index} data-breakpoints="xs">{field}</th>
                                        })}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.data.map((item, index) => {
                                        return (
                                            <tr key={index} data-expanded="true">
                                                {Object.keys(_.pick(item, this.props.field)).map((field, index) => {
                                                    if(field === "gender") {
                                                        return <td key={index}>{item[field] ? "Nam" : "Nữ"}</td>
                                                    }
                                                    if(field === "createdAt" || field === "birthday" || field === "hire_date" || field === "rehire_date") {
                                                        return <td key={index}>{formatDate(item[field])}</td>
                                                    }
                                                    return <td key={index}>{item[field]}</td>
                                                })}
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            }
                            {
                                (!this.state.loading && this.state.data === "NoData") &&
                                    <p>No Data</p>
                            }
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

DataTable.propTypes = {
    title: PropTypes.string,
    field: PropTypes.array
};

DataTable.defaultProps = {
    title: "",
    field: []
};

export default DataTable;