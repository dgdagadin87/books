import '../css/style.css';
import '../css/jquery-ui.css';
import '../css/jquery-ui-component.css';

import React, {Component} from 'react';
import reactDom from 'react-dom';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Events from './core/Events';

import RootComponent from './ui/root/RootComponent.jsx';

import {defaultSettings, urlSettings} from './config/settings';

import {ajaxQuery, createUrlLink as CUL} from './core/coreUtils';
import {getDefaultState} from './core/applicationUtils';

import AboutComponent from './ui/modules/AboutComponent.jsx';
import AddBookComponent from './ui/modules/AddBookComponent.jsx';
import AllBooksComponent from './ui/modules/AllBooksComponent.jsx';
import MyBooksComponent from './ui/modules/MyBooksComponent.jsx';
import UsersComponent from './ui/modules/UsersComponent.jsx';
import AddUserComponent from './ui/modules/AddUserComponent.jsx';
import EditUserComponent from './ui/modules/EditUserComponent.jsx';
import NotFoundComponent from './ui/modules/NotFoundComponent.jsx';

const rootDomComponent = document.getElementById('root');

let modulesData = {
    'mybooks': getDefaultState('mybooks'),
    'addbook': getDefaultState('addbook'),
    'allbooks': getDefaultState('allbooks'),
    'users': getDefaultState('users')
};

let globalEvents = new Events();

globalEvents.on('setModuleData', (data, moduleName, callBack = false) => {
    modulesData[moduleName] = data;
    if (callBack) {
        callBack();
    }
});
globalEvents.on('showError', (result) => {
    window.console.log('error:');
    window.console.log(result);
});

ajaxQuery({
        url: CUL(defaultSettings, urlSettings['getCommonData'])
    },{
        afterSuccess: (result) => {

            let {data = {}} = result;
            let {
                title = '',
                user = {},
                headers = []
            } = data;
            
            reactDom.render((
                <BrowserRouter>
                    <RootComponent
                        serverData={data}
                        title={title}
                        globalEvents={globalEvents}
                    >
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={ (props) => <MyBooksComponent {...props} globalEvents={globalEvents} serverData={data} localData={modulesData['mybooks']} /> }
                            />
                            <Route
                                path="/about"
                                render={ (props) => <AboutComponent {...props} globalEvents={globalEvents} serverData={data} /> }
                            />
                            <Route
                                path="/addbook"
                                render={ (props) => <AddBookComponent {...props} globalEvents={globalEvents} serverData={data} localData={modulesData['addbook']} /> }
                            />
                            <Route
                                path="/allbooks"
                                render={ (props) => <AllBooksComponent {...props} globalEvents={globalEvents} serverData={data} localData={modulesData['allbooks']} /> }
                            />
                            <Route path="/users">
                                <Switch>
                                    <Route
                                        path="/users/edituser/:id"
                                        render={ (props) => <EditUserComponent {...props} globalEvents={globalEvents} serverData={data} /> }
                                    />
                                    <Route
                                        path="/users/adduser"
                                        render={ (props) => <AddUserComponent {...props} globalEvents={globalEvents} serverData={data} /> }
                                    />
                                    <Route
                                        exact
                                        path="/users"
                                        render={ (props) => <UsersComponent {...props} globalEvents={globalEvents} serverData={data} localData={modulesData['users']} /> }
                                    />
                                </Switch>
                            </Route>
                            <Route
                                component={NotFoundComponent}
                            />
                        </Switch>
                    </RootComponent>
                </BrowserRouter>
            ), rootDomComponent);
        },
        afterError: (result) => globalEvents.trigger('showError', result)
});