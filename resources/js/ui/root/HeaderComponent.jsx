import React from 'react';
import _ from 'underscore';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

import MenuLink from '../components/MenuLinkComponent.jsx';

export default class HeaderComponent extends BaseComponent {

    constructor(props) {
        super(props);
        
        const {serverData} = this.props;
        
        this.state = {
            serverData: serverData
        };
    }

    componentWillReceiveProps(props) {
        
        const {serverData} = props;
        
        this.setState({
            serverData: serverData
        });
    }

    _onUserIconClick() {
        
        alert('qwerty');
    }

    _renderHeaderUrls() {
        
        const {serverData} = this.state;
        const {user, headers} = serverData;
        const {userIsAdmin} = user;
        let menuLinks = [];
        
        
        _.each(headers, (item, key) => {
            if ((userIsAdmin && item.admin) || !item.admin) {
                menuLinks.push(
                    <MenuLink
                        key={key}
                        activeOnlyWhenExact={item.headerUrl === '/' ? true : false}
                        to={item.headerUrl}
                        label={item.headerName}
                    />
                );
            }
        });
        
        return menuLinks;
    }

    render() {

        const {serverData} = this.state;
        const {user} = serverData;
        const {userName} = user;

        return (
            <div className="main-navigation">
                <div className="main-navigation__links">
                    {this._renderHeaderUrls()}
                    <div className="clear-both" />
                </div>
                <div onClick={this._onUserIconClick.bind(this)} title={'Вы вошли как '+ userName} className="main-navigation__user-icon" />
                <div onClick={this._onUserIconClick.bind(this)} title={'Вы вошли как '+ userName} className="main-navigation__user-icon-down" />
            </div>
        );
    }
};

HeaderComponent.propTypes = {
    serverData: PropTypes.object.isRequired
};