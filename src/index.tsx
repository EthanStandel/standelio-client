import React from "react";
import { render } from "react-dom";
import { App } from "./App";

const root = document.getElementById("root");
render(<App.Component />, root);

// Support for Webpack HMR
const hot = (module as any)?.hot;
if (hot) {
    hot.accept('./App', () => {
        const NextApp = require('./App').App.Component;
        render(<NextApp />, root);
    })
}
