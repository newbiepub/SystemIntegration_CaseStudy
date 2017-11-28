import express from "express";
import {checkAuthUser} from "../controllers/AccessToken";
import {initialData, SSR} from "../utils/utils";
import {getCurrentUser} from "../controllers/User";
import AdminHome from "../../client/container/admin/home/home";
import {store} from "../index";

const router = express.Router();

const dashBoard =  async (req, res, next) => {
    try {
        let { authToken } = req.cookies;
        if(authToken) {
            let token = await checkAuthUser(authToken);
            if(token && req.user) {
                const content = SSR("/");
                let currentUser = await getCurrentUser(req.cookies.authToken);
                await AdminHome.login(store, currentUser);
                return res.render("index.html", {
                    title: "Dashboard",
                    content,
                    data: initialData(store),
                    csrfToken: req.csrfToken
                })
            }
        }
        res.redirect("/login");
    } catch(e) {
        console.log(e);
        res.redirect("/login");
    }
};

router.get("/", dashBoard);

export default router;