import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { positions, Provider as ReactAlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <ReactAlertProvider template={AlertTemplate} {...options}>
            <App />
          </ReactAlertProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
