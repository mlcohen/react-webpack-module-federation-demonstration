import React from "react";
import * as ReactDOM from 'react-dom/client';
import { Bar } from "./Bar";

function main() {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<Bar />); 
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});
