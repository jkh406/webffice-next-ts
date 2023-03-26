import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./modules";


const isProduction = process.env.NODE_ENV === "production";

const store = configureStore({
    reducer: rootReducer,
  });

