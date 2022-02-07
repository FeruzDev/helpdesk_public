import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './component/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from ".//redux/reducer/rootReducer"
import reportWebVitals from './reportWebVitals';
import thunk from "redux-thunk";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));


     // const store = createStore(rootReducer, compose(applyMiddleware(thunk),
     // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));






ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
