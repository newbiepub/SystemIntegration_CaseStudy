import passport from "passport";
import {findOneUser} from "../controllers/User";
import passwordHash from "password-hash";
import {checkAuthUser, createAuthToken} from "../controllers/AccessToken";


const router = require("express").Router();

const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        let user = await findOneUser({emails: username}, {}),
            passwordVerified = passwordHash.verify(password, user.password);
        if (passwordVerified) {
            let token = await createAuthToken(user._id);
            done(null, token)
        } else {
            done(new Error("Email or Password is invalid"));
        }
    } catch (e) {
        done(e);
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

router.use("/", async (req, res, next) => {
    try {
        let token = await checkAuthUser(req.cookies.authToken);
        if (token) {
            if (req.user) {
                res.redirect("/");
            }
        }
        next();
    } catch (e) {
        next();
    }
});

router.post('/', async (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            res.statusCode = 401;
            res.json({error: "Unauthorized"});
        } else {
            res.statusCode = 200;
            let options = {
                maxAge: 1000 * 60 * 60 * 24 * 14, // would expire after 14 days
                httpOnly: true, // The cookie only accessible by the web server
            };
            res.cookie('authToken', user.access_token, options); // options is optional
            req.logIn(user, (err) => {
                if (err) {
                    res.statusCode = 404;
                    res.json({error: {message: "Oops!! Login Failed"}});
                } else {
                    res.json({user, redirectUrl: "/"})
                }
            }); // Login Into session
        }
    })(req, res, next);
});


export default router;