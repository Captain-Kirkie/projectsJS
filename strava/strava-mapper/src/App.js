import "./App.css";
import * as d3 from "d3";
import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
import { authenticate } from "./AuthUtils";
import GoogleMapWrapper from "./GoogleMapWrapper";

function App() {
    return (
        <div className="App">
            <GoogleMapWrapper />
            <AwesomeButton
                cssModule={AwesomeButtonStyles}
                type="primary"
                onPress={(event, release) => {
                    // do a sync/async task then call `release()`
                    console.log("Authenticate");
                    authenticate();
                }}
            >
                Authenticate
            </AwesomeButton>
            <AwesomeButton
                cssModule={AwesomeButtonStyles}
                type="secondary"
                onPress={(event, release) => {
                    // do a sync/async task then call `release()`
                }}
            >
                Refresh
            </AwesomeButton>
        </div>
    );
}

export default App;
