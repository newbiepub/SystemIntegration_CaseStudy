import {deleteToken} from "../controllers/AccessToken";
import AdminHome from "../../client/container/admin/home/home";
import {store} from "../index";
const express = require('express');

const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        res.redirect('/login');
    })
    .post(async (req, res, next) => {
        try {
            await deleteToken(req.user);
            req.logOut();
            AdminHome.logout(store);
            res.clearCookie("authToken");
            res.json({redirectUrl: "/login"});
        } catch(e) {
            throw e;
        }
    });

export default router;