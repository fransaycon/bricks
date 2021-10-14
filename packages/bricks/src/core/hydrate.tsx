import React from "react";
import ReactDOM from "react-dom";
import { DOCUMENT_ID } from "../core/constants";
import App from "../components/App";


const hydrate = (content: string): void => {
    ReactDOM.hydrate(
        <App content={content} />,
        DOCUMENT_ID
    )
}

export default hydrate
