import React, {Component} from 'react';
import reactDom from 'react-dom';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Events from './core/Events';

import RootComponent from './ui/root/RootComponent.jsx';

import {defaultSettings, urlSettings} from './config/settings';

import {ajaxQuery, createUrlLink as CUL} from './core/coreUtils';

import AboutComponent from './ui/modules/AboutComponent.jsx';
import AddBookComponent from './ui/modules/AddBookComponent.jsx';
import AllBooksComponent from './ui/modules/AllBooksComponent.jsx';
import MyBooksComponent from './ui/modules/MyBooksComponent.jsx';
import UsersComponent from './ui/modules/UsersComponent.jsx';
import NotFoundComponent from './ui/modules/NotFoundComponent.jsx';

const rootDomComponent = document.getElementById('root');

ajaxQuery({
        url: CUL(defaultSettings, urlSettings['getCommonData'])
    },{
        afterSuccess: (result) => {

            let globalEvents = new Events();

            let {data = {}} = result;
            let {
                user = {},
                headers = []
            } = data;
            
            reactDom.render((
                <BrowserRouter>
                    <RootComponent
                        serverData={data}
                        globalEvents={globalEvents}
                    >
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={ (props) => <MyBooksComponent {...props} globalEvents={globalEvents} serverData={data} /> }
                            />
                            <Route
                                path="/about"
                                render={ (props) => <AboutComponent {...props} globalEvents={globalEvents} serverData={data} /> }
                            />
                            <Route
                                path="/addbook"
                                globalEvents={globalEvents}
                                render={ (props) => <AddBookComponent {...props} globalEvents={globalEvents} serverData={data} /> }
                            />
                            <Route
                                path="/allbooks"
                                render={ (props) => <AllBooksComponent {...props} globalEvents={globalEvents} serverData={data} /> }
                            />
                            <Route
                                path="/users"
                                render={ (props) => <UsersComponent {...props} globalEvents={globalEvents} serverData={data} /> }
                            />
                            <Route
                                component={NotFoundComponent}
                            />
                        </Switch>
                    </RootComponent>
                </BrowserRouter>
            ), rootDomComponent);
        },
        afterError: (result) => {
            window.console.log('error:');
            window.console.log(result);
        }
});