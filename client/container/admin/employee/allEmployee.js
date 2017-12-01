import React from "react";
import DataTable from "../../../component/responsiveTable/responsiveTable";

class AllEmployee extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const self = this;
        (() => {
            $.ajax({
                url: "http://localhost:3000/api/employee",
                method: "GET",
                dataType: 'json',
                success(data) {
                    let dataTable = self.refs.dataTable;
                    if(dataTable) {
                        dataTable.setState({loading: false, data});
                    }
                },
                error(xhr, statusCode, error) {
                    console.log(xhr);
                    let dataTable = self.refs.dataTable;
                    if(dataTable) {
                        dataTable.setState({loading: false, data: "NoData"});
                    }
                    alert(error);
                }
            })
        })()
    }

    render() {
        return <div className="wrapper">
            <DataTable ref="dataTable" title="All Employee" field={["first_name", "last_name", "SSN", "paid_to_date", "paid_last_year"]}/>
        </div>
    }
}

export default AllEmployee;