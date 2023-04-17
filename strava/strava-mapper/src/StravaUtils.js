const polyline = require("@mapbox/polyline");

const { slcLong } = require("./Constants.js");
const url = `http://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3000/exchange_token&approval_prompt=force&scope=read`;

const TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";
const { SECRET_MANAGER } = require("./Manager");
// curl -X POST https://www.strava.com/oauth/token \
// -F client_id=YOURCLIENTID \
// -F client_secret=YOURCLIENTSECRET \
// -F code=b55003496d87a9f0b694ca1680cd5690d27d9d28 \
// -F grant_type=authorization_code

// https://amazonwebshark.com/authenticating-strava-api-calls-oauth-visual-studio-code/
// http://localhost:3000/exchange_token?state=&code=ab74533370a184ceef270ccfd48cdd2d59f59993&scope=read,activity:read_all
const randomColor = () => {
    return (
        "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    );
};
const AuthenticateStravaWithOAuth = () => {
    // redirect to auth page
    // get code
    // exchange code for access token
    const redirectUri = window.location.origin + "/authExchange";
    const oAuthUrl = `http://www.strava.com/oauth/authorize?client_id=${SECRET_MANAGER.CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}/exchange_token&approval_prompt=force&scope=activity:read_all`;
    window.location.replace(oAuthUrl);
};
// https://stackoverflow.com/questions/19594040/how-to-draw-polylines-on-google-maps-dynamically
const drawLine = (cords) => {
    debugger;

    const map = new window.google.maps.Map(
        document.getElementById("google-map-strava"),
        {
            zoom: 10,
            center: { lat: 40.748054511597054, lng: slcLong },
            mapTypeId: "terrain",
        }
    );
    let activityCordinates = [];
    for (let cord of cords) {
        console.log(cord);
        const lat = cord[0];
        const long = cord[1];
        const point = new window.google.maps.LatLng(lat, long);
        activityCordinates.push(point);
    }

    var activityPath = new window.google.maps.Polyline({
        path: activityCordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });
    activityPath.setMap(map);
};

const drawAllLines = (activities) => {
    debugger;

    const map = new window.google.maps.Map(
        document.getElementById("google-map-strava"),
        {
            zoom: 10,
            center: { lat: 40.748054511597054, lng: slcLong },
            mapTypeId: "terrain",
        }
    );
    let allLines = [];
    for (let act of activities) {
        const decoded = polyline.decode(act.map.summary_polyline);
        let activityCordinates = [];
        for (let cord of decoded) {
            const lat = cord[0];
            const long = cord[1];
            const point = new window.google.maps.LatLng(lat, long);
            activityCordinates.push(point);
        }
        const activityPath = new window.google.maps.Polyline({
            path: activityCordinates,
            geodesic: true,
            strokeColor: randomColor(),
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });

        allLines.push(activityPath);
    }

    for (let line of allLines) {
        line.setMap(map);
    }
};

const getAllActivities = async () => {
    console.log(process.env.REACT_APP_BASE_STRAVA_URI);
    const uri = `${process.env.REACT_APP_BASE_STRAVA_URI}/api/v3/athletes/${SECRET_MANAGER.KIRK_ID}/activities`;

    const response = await fetch(uri, {
        method: "GET",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization:
                "Bearer " + localStorage.getItem("oauth_access_token"),
        },
    });
    const json = await response.json();
    console.log(json);
    drawAllLines(json);
    return json;
};

// axchange one time code for access token
// curl -X POST https://www.strava.com/api/v3/oauth/token
//   -d client_id=ReplaceWithClientID \
//   -d client_secret=ReplaceWithClientSecret \
//   -d code=ReplaceWithCode \
//   -d grant_type=authorization_code\
const getAccessToken = async () => {
    const TOKEN_KEY = "oauth_access_token";
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    console.log(code);

    const body = JSON.stringify({
        client_id: SECRET_MANAGER.CLIENT_ID,
        client_secret: SECRET_MANAGER.CLIENT_SECRET,
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
    localStorage.setItem(TOKEN_KEY, json); // this is bad...
};

async function refreshToken() {
    //TODO
}

export { AuthenticateStravaWithOAuth, getAccessToken, getAllActivities };
