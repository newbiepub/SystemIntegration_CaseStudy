import React from "react";
import DataTable from "../dataTable/dataTable";

class ChangeBenefit extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        try {
            let {dataTable} = this.refs;
            (function () {
                $.ajax({
                    url: "http://localhost:3000/api/change/benefit",
                    method: "GET",
                    dataType: "json",
                    success(data) {
                        dataTable.setState({data, loading: false});
                    },
                    error(xhr, statusCode, error) {
                        alert(error);
                    }
                })
            })()
        } catch (e) {
            console.log(e);
            alert("Cannot get employee");
        }
    }

    render() {
        return <DataTable ref="dataTable" title="Employee Change Benefit Plans"
                          field={["first_name", "last_name", "SSN", "old_plan_name", "changed_plan_name", "createdAt"]}/>
    }
}

export default ChangeBenefit;