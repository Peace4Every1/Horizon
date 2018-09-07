import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const initState = {
    track_list: [],
    heading: 'Top 10 Tracks'
};

function reducer(state = initState, action){
    switch(action.type){
        case "GET_TOP": 
            return {track_list: [...action.track_list],
                    heading: 'Top 10 Tracks'};
        default: return state
    }
}

const store = createStore(reducer);
console.log(store);
ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
