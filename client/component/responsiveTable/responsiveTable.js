import React from "react";
import PropTypes from "prop-types";
import * as _ from "lodash";
import Loading from "../loading/loading";
import {Link} from "react-router-dom";

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
            <div className="table-agile-info">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Responsive Table
                    </div>
                    <div className="row w3-res-tb">
                        <div className="col-sm-5 m-b-xs">
                            <select className="input-sm form-control w-sm inline v-middle">
                                <option value="0">Bulk action</option>
                                <option value="1">Delete selected</option>
                                <option value="2">Bulk edit</option>
                                <option value="3">Export</option>
                            </select>
                            <button className="btn btn-sm btn-default">Apply</button>
                        </div>
                        <div className="col-sm-4">
                        </div>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <input type="text" className="input-sm form-control" placeholder="Search"/>
          <span className="input-group-btn">
            <button className="btn btn-sm btn-default" type="button">Go!</button>
          </span>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        {
                            this.state.loading &&
                                <Loading/>
                        }
                        {
                            !this.state.loading &&
                            <table className="table table-striped b-t b-light">
                                <thead>
                                <tr>
                                    {this.props.field.map((field, index) => {
                                        return <th key={index} data-breakpoints="xs">{field}</th>
                                    })}
                                    <th style={{width: "30px"}}></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.data.map((item, index) => {
                                    return (
                                        <tr key={index} data-expanded="true">
                                            {Object.keys(_.pick(item, this.props.field)).map((field, index) => {
                                                return <td key={index}>{item[field]}</td>
                                            })}
                                            <td>
                                                <Link to={`/employee/update/${item._id}`} className="active"><i className="fa fa-edit"></i><i className=""></i></Link>
                                            </td>
                                            <td>
                                                <a href="" className="active">
                                                    <i className="fa fa-minus-square"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        }
                        {
                            (!this.state.loading && this.state.data === "NoData") &&
                                <h1>No Data</h1>
                        }
                    </div>
                </div>
            </div>
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

export default DataTable