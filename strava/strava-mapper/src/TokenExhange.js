import React from "react";
import { Navigate } from "react-router-dom";
const TOKEN_KEY = "oauth_access_token";
function TokenExhange() {
    const TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";
    // React advises to declare the async function directly inside useEffect
    async function getToken() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        console.log(code);

        const body = JSON.stringify({
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
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
        debugger;
        const json = await response.json();
        console.log(json);
        localStorage.setItem(TOKEN_KEY, json.access_token); // this is bad...
    }
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
        getToken();
    }

    return <Navigate to="/" />;
}
export default TokenExhange;
