import { useSearchParams } from "react-router-dom";
// const strava = require("strava-v3");
const url = `http://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read`;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REACT_APP_REFRESH_TOKEN;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const KIRK_ID = process.env.REACT_APP_KIRK_ID;
const TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";
const ATHLETES_ENDPOINT = `https://www.strava.com/api/v3/athletes/${KIRK_ID}`;
let OAUTH_ACCESS_TOKEN = null;
// curl -X POST https://www.strava.com/oauth/token \
// -F client_id=YOURCLIENTID \
// -F client_secret=YOURCLIENTSECRET \
// -F code=b55003496d87a9f0b694ca1680cd5690d27d9d28 \
// -F grant_type=authorization_code

// https://amazonwebshark.com/authenticating-strava-api-calls-oauth-visual-studio-code/
// http://localhost:3000/exchange_token?state=&code=ab74533370a184ceef270ccfd48cdd2d59f59993&scope=read,activity:read_all

const AuthenticateStravaWithOAuth = () => {
    // redirect to auth page
    // get code
    // exchange code for access token
    const oAuthUrl = `http://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${window.location.origin}/exchange_token&approval_prompt=force&scope=activity:read_all`;
    window.location.replace(oAuthUrl);
};

const getAllActivities = async () => {
    const test = "https://www.strava.com/api/v3/athletes/62304200/activities";
    const response = await fetch(test, {
        method: "GET",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + OAUTH_ACCESS_TOKEN.access_token,
        },
    });

    const json = await response.json();
    console.log(json);
    return json;
};

// axchange one time code for access token
// curl -X POST https://www.strava.com/api/v3/oauth/token
//   -d client_id=ReplaceWithClientID \
//   -d client_secret=ReplaceWithClientSecret \
//   -d code=ReplaceWithCode \
//   -d grant_type=authorization_code\
const getAccessToken = async () => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    console.log(code);

    const body = JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
    });

    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",

        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body,
    });

    const json = await response.json();
    console.log(json);
    OAUTH_ACCESS_TOKEN = json;
    return json;
};

async function refreshToken() {}

export { AuthenticateStravaWithOAuth, getAccessToken, getAllActivities };
