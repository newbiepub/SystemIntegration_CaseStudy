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
            data: [],
        }
    }

    render() {
        return (
            <div className="table-agile-info">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        {this.props.title}
                    </div>
                    <div className="row w3-res-tb">
                        <div className="col-sm-5 m-b-xs">
                            <select className="input-sm form-control w-sm inline v-middle"
                                    onChange={(e) => this.props.onChangeFilter(e)}
                                    value={this.props.instance.state.filter}>
                                <option value="all">All</option>
                                <option value="shareholder">Shareholder</option>
                                <option value="employee">Employee</option>
                            </select>
                        </div>
                        <div className="col-sm-4">
                        </div>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <input type="text" className="input-sm form-control" placeholder="Search" value={this.state.searchText}
                                       onChange={e => this.props.instance.setState({searchText: e.target.value})}/>
          <span className="input-group-btn">
            <button onClick={() => {this.props.onSubmitSearch()}} className="btn btn-sm btn-default" type="button">Go!</button>
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
                                                if(field === "gender") {
                                                    return <td key={index}>{item[field] ? "Nam" : "Nữ"}</td>
                                                }
                                                return <td key={index}>{item[field]}</td>
                                            })}
                                            <td>
                                                <Link to={`/employee/update/${item._id}`} className="active"><i className="fa fa-edit"></i><i className=""></i></Link>
                                            </td>
                                            <td>
                                                <a type="button" href="" onClick={() => this.props.onDeleteItem(item)} className="active">
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
    field: PropTypes.array,
    filter: PropTypes.string,
    onChangeFilter: PropTypes.func,
    onSubmitSearch: PropTypes.func,
    onDeleteItem: PropTypes.func
};

DataTable.defaultProps = {
    title: "",
    field: [],
    filter: "all",
    onChangeFilter: () => {},
    onSubmitSearch: () => {},
    onDeleteItem: () => {}
};

export default DataTable