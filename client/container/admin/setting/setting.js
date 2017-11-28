import React from "react";
import Loading from "../../../component/loading/loading";

class Setting extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isSync: false
        }
    }

    async onClickButton () {
        let self = this;
        this.setState({isSync: true});
        let _csrf = $("#_csrf").val();
        (function () {
            console.log("Hello");
            $.ajax({
                url: "http://localhost:3000/api/sync",
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({_csrf}),
                dataType: "text",
            }).done(data => {
                self.setState({isSync: false})
            })
        }) ()

    }

    render() {
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div style={{marginTop: "150px"}}>
                    {
                        this.state.isSync &&
                        <Loading/>
                    }
                    <div style={{marginTop: "20px"}}>
                        <button disabled={this.state.isSync} onClick={this.onClickButton.bind(this)} type="submit" className="btn btn-info">Đồng Bộ Dữ Liệu</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Setting;