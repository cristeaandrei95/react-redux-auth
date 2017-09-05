import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';

import App from './routes';
import './style.css'

const store = configureStore();

const Root = () => (
 <Provider store={store}>
   <BrowserRouter>
    <App />
   </BrowserRouter>
 </Provider>
)

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
