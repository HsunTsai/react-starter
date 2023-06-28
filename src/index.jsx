import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './app/App';
import IndexProvider from './app/IndexProvider';
import services from './app/config/services';

import './scss/index.scss';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('app');
const root = createRoot(container);
root.render(
	<BrowserRouter basename={services.getContextRoot}>
		<Switch>
			<Route
				path="/:locale" // ? => unnecessary
				render={props => (
					<IndexProvider {...props}>
						<App />
					</IndexProvider>
				)}
			/>
		</Switch>
	</BrowserRouter>
);
