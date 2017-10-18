import React, {Component} from 'react';
import {render} from 'react-dom';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import RootComponent from './ui/root/RootComponent.jsx';

import AboutComponent from './ui/modules/AboutComponent.jsx';
import AddBookComponent from './ui/modules/AddBookComponent.jsx';
import AllBooksComponent from './ui/modules/AllBooksComponent.jsx';
import MyBooksComponent from './ui/modules/MyBooksComponent.jsx';

render((
    <BrowserRouter>
		<RootComponent>
			<Switch>
				<Route path="/about" component={AboutComponent} />
				<Route path="/addbook" component={AddBookComponent} />
				<Route path="/allbooks" component={AllBooksComponent} />
				<Route path="/" component={MyBooksComponent} />
			</Switch>
		</RootComponent>
    </BrowserRouter>
), document.getElementById('root'));