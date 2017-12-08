import React from "react";
import DataTable from "../../../component/responsiveTable/responsiveTable";

class AllEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "all",
            searchText: ""
        }
    }

    loadData() {
        const self = this;
        (() => {
            $.ajax({
                url: "http://localhost:3000/api/employee?filter=" + self.state.filter,
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

    componentDidMount() {
        this.loadData()
    }

    onSubmitSearch() {
        const self = this;
        (() => {
            $.ajax({
                url: "http://localhost:3000/api/employee?search=" + self.state.searchText,
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

    onChangeFilter(e) {
        this.setState({filter: e.target.value}, () => {
            this.loadData();
        });
    }

    onDeleteItem(item) {
        if(confirm("Bạn có muốn xoá nhân viên này không? ")) {
            const self = this;
            let _csrf = $("#_csrf").val();
            (() => {
                $.ajax({
                    url: "http://localhost:3000/api/employee/remove",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({employeeId: item._id, _csrf}),
                    dataType: 'json',
                    success(data) {
                        if(data.success) {
                            alert("Removed !!");
                        }
                    },
                    error(xhr, statusCode, error) {
                        console.log(xhr);
                        alert(error);
                    }
                })
            })();
            self.loadData();
        }
    }

    render() {
        return <div className="wrapper">
            <DataTable ref="dataTable" instance={this} title="All Employee"
                       onChangeFilter={this.onChangeFilter.bind(this)}
                       onSubmitSearch={this.onSubmitSearch.bind(this)}
                       onDeleteItem={this.onDeleteItem.bind(this)}
                       field={["first_name", "last_name", "SSN", "gender", "city"]}/>
        </div>
    }
}

export default AllEmployee;