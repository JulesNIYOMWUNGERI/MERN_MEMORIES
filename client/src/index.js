import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  
  <BrowserRouter>
  <GoogleOAuthProvider clientId="586362790284-1a11abkp0jjss5ldo17bm9chr1n8tt0o.apps.googleusercontent.com">
  <Provider store={store}>
    <App />
  </Provider>
  </GoogleOAuthProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
