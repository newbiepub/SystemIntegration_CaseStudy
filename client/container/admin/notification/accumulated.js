import React from "react";
import DataTable from "../dataTable/dataTable";

class AccumulateVacation extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        try {
            let {dataTable} = this.refs;
            (function () {
                $.ajax({
                    url: "http://localhost:3000/api/employee/accumulated/vacation",
                    method: "GET",
                    dataType: "json",
                    success(data) {
                        console.log(data);
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
        return <DataTable ref="dataTable"
                          field={["first_name", "last_name", "SSN", "gender", "accumulated_vacations"]}
                          title="Nhân Viên Tích Luỹ Ngày Nghỉ"/>
    }
}

export default AccumulateVacation;