import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";

function Button() {
    return (
        <AwesomeButton
            cssModule={AwesomeButtonStyles}
            type="primary"
            onPress={() => {
                // do something
            }}
        >
            Button
        </AwesomeButton>
    );
}

export default Button;
