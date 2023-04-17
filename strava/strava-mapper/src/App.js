import "./App.css";
import React from "react";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TokenExhange from "./TokenExhange";

// https://samuelkraft.com/blog/strava-api-with-nextjs
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route
                    path="/authExchange/exchange_token/"
                    element={<TokenExhange />}
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
