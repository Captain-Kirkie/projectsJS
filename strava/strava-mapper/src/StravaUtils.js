// const strava = require("strava-v3");
const url = `http://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read`;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REACT_APP_REFRESH_TOKEN;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const KIRK_ID = process.env.REACT_APP_KIRK_ID;
const TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";
const ATHLETES_ENDPOINT = `https://www.strava.com/api/v3/athletes/${KIRK_ID}`;

// ab74533370a184ceef270ccfd48cdd2d59f59993
// https://www.markhneedham.com/blog/2020/12/15/strava-authorization-error-missing-read-permission/
// curl -X POST https://www.strava.com/oauth/token \
// -F client_id=YOURCLIENTID \
// -F client_secret=YOURCLIENTSECRET \
// -F code=b55003496d87a9f0b694ca1680cd5690d27d9d28 \
// -F grant_type=authorization_code
// http://www.strava.com/oauth/authorize?client_id=95901&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=activity:read_all
// http://localhost:3000/exchange_token?state=&code=d87fa794c4e44018c4b1bb5bc83d2e867055ea30&scope=read,activity:read_all// https://www.strava.com/api/v3/athlete/activities?before=&after=&page=&per_page=" "Authorization: Bearer [[token]]
// https://amazonwebshark.com/authenticating-strava-api-calls-oauth-visual-studio-code/

// http://localhost:3000/exchange_token?state=&code=ab74533370a184ceef270ccfd48cdd2d59f59993&scope=read,activity:read_all
const AuthenticateStravaWithOAuth = () => {
    console.log(process.env.REACT_APP_CLIENT_ID);

    console.log(process.env.REACT_APP_CLIENT_SECRET);
    console.log(process.env.REACT_APP_ACCESS_TOKEN);
    console.log(process.env.REACT_APP_REFRESH_TOKEN);

    // redirect to auth page
    // get code
    // exchange code for access token
    const oAuthUrl = `http://www.strava.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${window.location.origin}/exchange_token&approval_prompt=force&scope=activity:read_all`;
    window.location.replace(oAuthUrl);
};

const getAccessToken = async () => {
    const body = JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        refresh_token: REFRESH_TOKEN,
        grant_type: "refresh_token",
    });

    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + ACCESS_TOKEN,
        },
        body,
    });

    const json = await response.json();
    console.log(json);
    return json;
};

async function refreshToken() {}

export { AuthenticateStravaWithOAuth, getAccessToken };
