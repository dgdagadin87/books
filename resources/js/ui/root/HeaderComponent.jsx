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

    _renderHeaderUrls() {
        
        const {serverData} = this.state;
        const {user, headers} = serverData
        const {userIsAdmin} = user;
        let menuLinks = [];
        
        
        _.each(headers, (item, key) => {
            if ((userIsAdmin && item.admin) || !item.admin) {
                menuLinks.push(
                    <li key={key}>
                        <MenuLink
                            activeOnlyWhenExact={item.headerUrl === '/' ? true : false}
                            to={item.headerUrl}
                            label={item.headerName}
                        />
                    </li>
                );
            }
        });
        
        return menuLinks;
    }

    render() {

        return (
            <menu>
                <ul>
                    {this._renderHeaderUrls()}
                </ul>
            </menu>
        );
    }
};

HeaderComponent.propTypes = {
    serverData: PropTypes.object.isRequired
};