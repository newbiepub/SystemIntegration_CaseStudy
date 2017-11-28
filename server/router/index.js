import login from "./login";
import logout from "./logout";
import {initialData, SSR} from "../utils/utils";
import {checkAuthUser} from "../controllers/AccessToken";
import {getCurrentUser} from "../controllers/User";
import {applyMiddleware, createStore} from "redux";
import appReducers from "../../client/reducer/index";
import thunk from "redux-thunk";
import AdminHome from "../../client/container/admin/home/home";
import api from "./api";

module.exports = (app) => {

    const checkAuth = () => {
        return async function (req, res, next) {
            try {
                let {authToken} = req.cookies;
                if (authToken) {
                    let token = await checkAuthUser(authToken);
                    if (token && req.user) {
                        let currentUser = await getCurrentUser(req.cookies.authToken);
                        await AdminHome.login(req.data, currentUser);
                        return next();
                    }
                }
                res.redirect("/login");
            } catch (e) {
                console.log(e);
                res.redirect("/login");
            }
        }
    };

    app.use("*", (req, res, next) => {
        req.data = createStore(appReducers, applyMiddleware(thunk));
        next();
    });
    app.use("/api", checkAuth());
    app.all("/", checkAuth());
    app.use("/report", checkAuth());
    app.use("/setting", checkAuth());
    app.use("/login", login);
    app.use("/notification", checkAuth());
    app.use('/api', api);
    app.use('/logout', logout);
    app.get("*", (req, res, next) => {
        const content = SSR(req.url);
        res.render("index.html", {title: "Dashboard", content, data: initialData(req.data), csrfToken: req.csrfToken()})
    });
};
