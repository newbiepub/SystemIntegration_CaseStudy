import app from "../index";

export async function findOneUser(filter, option) {
    try {
        let user = await app.models.User.findOne(filter, option).exec();
        if(user) {
            return user;
        } else {
            throw new Error("User not found");
        }
    } catch(e) {
        throw e;
    }
}

export async function getCurrentUser(access_token) {
    try {
        let accessToken = await app.models.AccessToken.findOne({access_token}).exec();
        if(access_token) {
            let currentUser = await app.models.User.findOne({_id: accessToken.userId}).exec();
            if(currentUser) {
                return {
                    _id: currentUser._id.toString(),
                    emails: currentUser.emails,
                    username: currentUser.username,
                    profile: currentUser.profile
                };
            } else {
                throw new Error("User not found");
            }
        } else {
            throw new Error("Unauthorized");
        }
    } catch(e) {
        throw e;
    }
}