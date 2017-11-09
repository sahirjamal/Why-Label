import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';

import rootReducer from './reducers/index';
import HomePage from './components/homePage';
import Product1 from './components/product1';
import Cart from './components/cart';
import Checkout from './components/checkout';
import Payment from './components/payment';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const store = createStore(rootReducer, applyMiddleware(middleware));

ReactDOM.render(<Provider store={store}>
	<ConnectedRouter history={history}>
		<div>
			<Route path="/" exact component={HomePage}/>
			<Route path="/product1" exact component={Product1}/>
			<Route path="/cart" exact component={Cart}/>
			<Route path="/checkout" exact component={Checkout} />
			<Route path="/payment" exact component={Payment} />
		</div>
	</ConnectedRouter>
	</Provider>,
	document.getElementById('root'));