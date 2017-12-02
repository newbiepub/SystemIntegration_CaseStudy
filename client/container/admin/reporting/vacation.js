import React from "react";
import Report from "../../../component/report/report";

class Vacation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "all"
        }
    }

    loadData() {
        const self = this;
        return new Promise((resolve, reject) => {
            $.ajax({
                url: "http://localhost:3000/api/employee/totalVacation?filter=" + self.state.filter,
                method: "GET",
                success(data) {
                    resolve({data, loading: false});
                },
                error(xhr, statusCode, error) {
                    console.log(xhr);
                    alert(error);
                }
            })
        })
    }

    render() {
        return <Report instance={this} loadData={this.loadData.bind(this)}
                       fields={["first_name", "last_name", "SSN", "gender", "paid_to_date", "paid_last_year", "vacation_days"]}
                       title="Total Vacation"/>
    }
}

export default Vacation;