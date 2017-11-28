import React from "react";
import { Provider } from "react-redux";
import StaticRouter from "react-router-dom/StaticRouter";
import {renderRoutes} from "react-router-config";
import routes from "../../client/routes";
import {renderToString} from "react-dom/server";
import { store } from "../index";

export const ttl = () => {
    let today = new Date();
    let nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
    return nextWeek.getTime();
};

export const randomString = () => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
};

export const initialData = (store) => {
    return `<script defer type="text/javascript">window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>`
};

export const SSR = (url) => {
    let context = {};
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={url} context={context}>
                {renderRoutes(routes)}
            </StaticRouter>
        </Provider>
    );
    return content;
};