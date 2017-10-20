import React, {Component} from 'react';
import reactDom from 'react-dom';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import RootComponent from './ui/root/RootComponent.jsx';

import {defaultSettings, urlSettings} from './config/settings';

import {ajaxQuery, createUrlLink as CUL} from './core/coreUtils';

import AboutComponent from './ui/modules/AboutComponent.jsx';
import AddBookComponent from './ui/modules/AddBookComponent.jsx';
import AllBooksComponent from './ui/modules/AllBooksComponent.jsx';
import MyBooksComponent from './ui/modules/MyBooksComponent.jsx';

const rootDomComponent = document.getElementById('root');

ajaxQuery({
        url: CUL(defaultSettings, urlSettings['getCommonData'])
    },{
        afterSuccess: (result) => {

            let {data = {}} = result;
            let {
                user = {},
                headers = []
            } = data;
            
            reactDom.render((
                <BrowserRouter>
                    <RootComponent
                        serverData={data}
                    >
                        <Switch>
                            <Route path="/about" component={AboutComponent} />
                            <Route path="/addbook" component={AddBookComponent} />
                            <Route path="/allbooks" component={AllBooksComponent} />
                            <Route path="/" component={MyBooksComponent} />
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