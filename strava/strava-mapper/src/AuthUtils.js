import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";

function Button(props) {
    return (
        <AwesomeButton
            cssModule={AwesomeButtonStyles}
            type="primary"
            onPress={(event, release) => {
                // do a sync/async task then call `release()`
                console.log("Authenticate");
            }}
            active={true}
        ></AwesomeButton>
    );
}

export default Button;
