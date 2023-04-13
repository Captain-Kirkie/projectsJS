import "./App.css";
import * as d3 from "d3";
import USAMap from "react-usa-map";
import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
import { authenticate } from "./AuthUtils";

function App() {
    d3.selectAll("div").style("color", "blue");
    return (
        <div className="App">
            <USAMap onClick={() => console.log("hello world")} />
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
