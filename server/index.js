import express from 'express';
import url from "url";
import qs from "querystring";
import consolidate from "consolidate";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import {resolve, join} from "path";
import csrf from 'csurf';
import passwordHash from "password-hash"
import {applyMiddleware, createStore} from "redux";
import appReducers from "../client/reducer/index";
import thunk from 'redux-thunk';
import root from "./router/root";
import {login} from "../client/action/account";
import HR from "./db/hr";
import payroll from "./db/payroll";
const passport = require('passport');
const minify = require('express-minify');
const compression = require('compression');
const initialModel = require("./models/models");
const configureRoute = require("./router/index");
const app = express();


//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// query string
app.use(
    (req, res, next) => {
        req.query = qs.parse(
            url.parse(req.url).query
        );
        next()
    }
);

// enable cookie
app.use(cookieParser());

// Session
const session = require("express-session");
app.use(session({
    secret: 'systemIntegration',
    resave: true,
    saveUninitialized: false
}));

// helmet best practise protection
app.use(helmet());

app.use(csrf({cookie: true}));

// Prevent csrf
app.use(function (req, res, next) {
    res.locals = res.locals || {};
    res.locals.csrftoken = req.csrfToken();
    next();
});

app.use(passport.initialize());
app.use(passport.session());

// Minifying Production
app.use(compression());
app.use(minify({
    cache: true,
    uglifyJsModule: null,
    errorHandler: null,
    jsMatch: /javascript/,
    cssMatch: /css/,
    jsonMatch: /json/,
    sassMatch: /scss/,
    lessMatch: /less/,
    stylusMatch: /stylus/,
    coffeeScriptMatch: /coffeescript/,
}));
// Static resource
app.use('/static', express.static(join(__dirname, "../", "public")));

// render
app.use(
    (req, res, next) => {
        res.setHeader('Content-Type', 'text/html; charset=utf8');
        res.render = (filename, params = {}) => {
            const path = resolve(__dirname, '../', 'public', filename);
            res.locals = res.locals || {}
            consolidate.mustache(
                path,
                Object.assign(params, res.locals),
                (err, html) => {
                    if (err) {
                        throw err
                    }
                    res.end(html)
                }
            )
        };
        next()
    }
);

const store = createStore(appReducers, applyMiddleware(thunk));

// Init Models
initialModel(app);
// Set Root
app.use("/", root);
//Configure Routes
configureRoute(app);

const boot = async (app) => {
    try {
        let userCount = await app.models.User.find().count().exec();
        if(!userCount) {
            let user = await new app.models.User({
                emails: "lam@example.com",
                username: "Lam Nguyen",
                password: passwordHash.generate("123456"),
                profile: {name: "Lam Nguyen"},
            }).save()
        }
    } catch(e) {
        console.log(e);
    }
};

// Boot App
boot(app);

app.listen((process.env.PORT || 3000), () => {
    console.log("Server Started at port " + (process.env.PORT || 3000))
});

export { store };
export default app;