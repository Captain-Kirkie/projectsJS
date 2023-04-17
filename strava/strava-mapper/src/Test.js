import { getAccessToken } from "./StravaUtils";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
function Test() {
    // useEffect(getAccessToken);
    // useEffect(() => {
    const TOKEN_KEY = "oauth_access_token";
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
    // You need to restrict it at some point
    // This is just dummy code and should be replaced by actual
    if (!token) {
        getToken();
    }
    // }, []);

    // return <h1>kjhkjh</h1>;
    return <Navigate to="/" />;
}
export default Test;
