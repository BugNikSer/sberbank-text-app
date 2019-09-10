import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import App from './App';

const store = createStore(people, applyMiddleware(thunk))

const initialState = {
    people : [],
    selectedKey: null,
    selectedKey2: null,
    isSortByAscending: true,
    filter: '',
    showRowsOnPage: 10,
    currentPageNumber: 1
}

function people(state = {
    people : [],
    selectedKey: null,
    selectedKey2: null,
    isSortByAscending: true,
    filter: '',
    showRowsOnPage: 10,
    currentPageNumber: 1
}, action) {
    switch (action.type) {
        case 'GET_PEOPLE': {
            return {
                ...state,
                people: action.payload,
                selectedKey: Object.keys(action.payload[0])[0]
            }
            break;
        }
        case 'SET_KEYS': {
            return {
                ...state,
                selectedKey: action.payload.key,
                selectedKey2: action.payload.key2,
                isSortByAscending: action.payload.isAscending
            }
            break;
        }
        case 'SET_PAGE': {
            return {
                ...state,
                currentPageNumber: action.payload
            }
            break;
        }
        case 'SET_FILTER': {
            return {
                ...state,
                filter: action.payload
            }
            break;
        }
    }
}

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
