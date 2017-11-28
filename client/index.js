import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from "./store/configureStore.js";
import {BrowserRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import routes from "./routes";

class AppRoot extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    {renderRoutes(routes)}
                </BrowserRouter>
            </Provider>
        )
    }
}

ReactDOM.hydrate(<AppRoot/>, document.getElementById('root'));