import React from "react";
import * as ReactDOM from 'react-dom/client';
import { Foo } from "./Foo";

function main() {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<Foo />); 
}

document.addEventListener("DOMContentLoaded", () => {
    main();
});
