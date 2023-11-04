// Import necessary dependencies 
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { store } from "./redux/store";
import { Provider } from "react-redux";

// Creating a React root 
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renders the Main App
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);
