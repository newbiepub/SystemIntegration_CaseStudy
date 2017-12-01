import App from "./container/app";
import NotFound from "./component/NotFound/notFound";
import AdminLogin from "./container/admin/login/login";
import AdminHome from "./container/admin/home/home";
import Redirector from "./component/redirector/redirector";
import Income from "./container/admin/reporting/income";
import Vacation from "./container/admin/reporting/vacation";
import Benefit from "./container/admin/reporting/benefit";
import Reporting from "./container/admin/reporting/reporting";
import Setting from "./container/admin/setting/setting";
import Notification from "./container/admin/notification/notification"
import BirthDay from "./container/admin/notification/birthday";
import HireDate from "./container/admin/notification/hireDate";
import ChangeBenefit from "./container/admin/notification/benefit";
import AccumulateVacation from "./container/admin/notification/accumulated";
import Employee from "./container/admin/employee/employee";
import AllEmployee from "./container/admin/employee/allEmployee";
import CreateEmployee from "./container/admin/employee/createEmployee";
import EditEmployee from "./container/admin/employee/editEmployee";

const routes = [
    {
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: AdminHome,
            },
            {
                path: '/login',
                component: AdminLogin
            },
            {
                path: "/notification",
                component: Notification,
                routes: [
                    {
                        path: "/notification/birthday",
                        component: BirthDay
                    },
                    {
                        path: "/notification/hiredate",
                        component: HireDate
                    },
                    {
                        path: "/notification/benefit",
                        component: ChangeBenefit
                    },
                    {
                        path: "/notification/vacation",
                        component: AccumulateVacation
                    },
                    {
                        path: "*",
                        component: Redirector
                    }
                ]
            },
            {
                path: "/report",
                component: Reporting,
                routes: [
                    {
                        path: '/report/income',
                        component: Income
                    },
                    {
                        path: "/report/vacation",
                        component: Vacation
                    },
                    {
                        path: "/report/benefit",
                        component: Benefit
                    },
                    {
                        path: "*",
                        component: Redirector
                    }
                ]
            },
            {
                path: '/employee',
                component: Employee,
                routes: [
                    {
                        path: "/employee/update/:id",
                        component: EditEmployee
                    },
                    {
                        path: "/employee/create",
                        component: CreateEmployee
                    },
                    {
                        path: "/employee",
                        component: AllEmployee
                    }
                ]
            },
            {
                path: "/setting",
                component: Setting
            },
            {
                path: "/404",
                component: NotFound
            },
            {
                path: "*",
                component: Redirector
            }
        ]
    }
];

export default routes;