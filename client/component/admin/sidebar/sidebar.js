import React from "react";
import { Link } from "react-router-dom"

const jQueryInit = function () {
    /*==Left Navigation Accordion ==*/
    if ($.fn.dcAccordion) {
        $('#nav-accordion').dcAccordion({
            eventType: 'click',
            autoClose: true,
            saveState: true,
            disableLink: true,
            speed: 'normal',
            showCount: false,
            autoExpand: true,
            classExpand: 'dcjq-current-parent'
        });
    }
}

class AdminSidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        jQueryInit ()
    }

    render() {
        return (
            <aside>
                <div id="sidebar" className="nav-collapse">
                    <div className="leftside-navigation">
                        <ul className="sidebar-menu" id="nav-accordion">
                            <li>
                                <a className="active" href="/">
                                    <i className="fa fa-dashboard"></i>
                                    <span>Dashboard</span>
                                </a>
                            </li>

                            <AdminSidebarNotification {...this.props}/>
                            <AdminSidebarReport {...this.props}/>
                            <AdminSideBarEmployee {...this.props}/>
                        </ul>
                    </div>
                </div>
            </aside>
        )
    }
}

class AdminSidebarNotification extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <li className="sub-menu">
                <a href="javascript:;">
                    <i className="fa fa-bullhorn"></i>
                    <span>Thông báo</span>
                </a>
                <ul className="sub" style={{display: "block"}}>
                    <li><Link to="/notification/hiredate">Nhân viên được nhận vào làm</Link></li>
                    <li><Link to="/notification/vacation">Ngày nghỉ lễ tích luỹ</Link></li>
                    <li><Link to="/notification/birthday">Nhân viên sinh nhật trong tháng</Link></li>
                    <li><Link to="/notification/benefit">Nhân viên thay đổi phúc lợi</Link></li>
                </ul>
            </li>
        )
    }
}

class AdminSidebarReport extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="sub-menu">
                <a href="javascript:;">
                    <i className="fa fa-bar-chart-o"></i>
                    <span>Thống kê</span>
                </a>
                <ul className="sub" style={{display: "block"}}>
                    <li><Link to="/report/income">Tổng thu nhập</Link></li>
                    <li><Link to="/report/vacation">Tổng số ngày nghỉ</Link></li>
                    <li><Link to="/report/benefit">Lợi nhuận trung bình</Link></li>
                </ul>
            </li>
        )
    }
}

class AdminSideBarEmployee extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="sub-menu">
                <a href="javascript:;">
                    <i className="fa fa-user"></i>
                    <span>Nhân Viên</span>
                </a>
                <ul className="sub" style={{display: "block"}}>
                    <li><Link to="/employee">Danh Sách Nhân Viên</Link></li>
                    <li><Link to="/employee/create">Thêm Nhân Viên</Link></li>
                </ul>
            </li>
        )
    }
}

export default AdminSidebar;