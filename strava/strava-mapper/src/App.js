import "./App.css";
import * as d3 from "d3";
import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
import React, { useState, useEffect } from "react";
import GoogleMapWrapper from "./GoogleMapWrapper";
import {
    getAccessToken,
    AuthenticateStravaWithOAuth,
    getAllActivities,
} from "./StravaUtils";
import Home from "./Home";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./TokenExhange";

// https://samuelkraft.com/blog/strava-api-with-nextjs
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route
                    path="/authExchange/exchange_token/"
                    element={<Test />}
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
