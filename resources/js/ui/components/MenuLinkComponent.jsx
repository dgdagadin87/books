import React from 'react';
import {Route, Link} from 'react-router-dom';

const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
        <div className={'link' + (match ? ' main-navigation__active' : '')}>
            <Link to={to}>{label}</Link>
        </div>
    )}/>
);

export default OldSchoolMenuLink;