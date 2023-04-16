import "./App.css";
import * as d3 from "d3";
import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";

import GoogleMapWrapper from "./GoogleMapWrapper";
import {
    getAccessToken,
    AuthenticateStravaWithOAuth,
    getAllActivities,
} from "./StravaUtils";

// https://samuelkraft.com/blog/strava-api-with-nextjs
function App() {
    return (
        <div className="App">
            <div className="center-horiz">
                <GoogleMapWrapper />
            </div>

            <AwesomeButton
                cssModule={AwesomeButtonStyles}
                type="primary"
                onPress={(event, release) => {
                    // do a sync/async task then call `release()`
                    getAllActivities();
                }}
            >
                Get All Activity
            </AwesomeButton>
            <AwesomeButton
                cssModule={AwesomeButtonStyles}
                type="secondary"
                onPress={(event, release) => {
                    getAccessToken();
                }}
            >
                Exchange code for token
            </AwesomeButton>
            <AwesomeButton
                cssModule={AwesomeButtonStyles}
                type="secondary"
                onPress={(event, release) => {
                    AuthenticateStravaWithOAuth();
                }}
            >
                Log in with OAuth
            </AwesomeButton>
        </div>
    );
}

export default App;
