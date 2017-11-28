import app from "../index";

export async function createAuthToken (userId) {
    try {
        let token = new app.models.AccessToken({userId});
        await token.save();
        return token;
    } catch(e) {
        throw e;
    }
}

async function userToken (access_token) {
    try {
        let accessToken = app.models.AccessToken.findOne({access_token});
        accessToken = await accessToken.exec();
        if(accessToken) {
            if(accessToken.ttl > new Date().getTime()) {
                let user = await app.models.User.findOne({_id: accessToken.userId}).exec();
                if(user) {
                    return {accessToken, user};
                } else {
                    throw new Error("User not found");
                }
            } else {
                await app.models.AccessToken.remove({_id: accessToken._id}).exec();
                throw new Error("Token Expired");
            }
        } else {
            throw new Error("Token is invalid");
        }
    } catch(e) {
        throw e;
    }
}

export async function checkAuthUser (access_token) {
    try {
        let { accessToken, user } = await userToken(access_token);
        return accessToken;
    } catch(e) {
        throw e;
    }
}

export async function deleteToken (token) {
    try {
        return await app.models.AccessToken.remove({access_token: token.access_token}).exec();
    } catch (e) {
        throw e;
    }
}