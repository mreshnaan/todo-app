import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import App from "./AnchoredPopups";
import { RelayEnvironmentProvider } from "react-relay";
import environment from "./relay/environment";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={"Loading..."}>
        <App />
        
      </Suspense>
    </RelayEnvironmentProvider>
  </React.StrictMode>
);
