import React from 'react';
import _ from 'underscore';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

import MenuLink from '../components/MenuLinkComponent.jsx';
import $ from "jquery";

export default class HeaderComponent extends BaseComponent {

    constructor(props) {
        super(props);
        
        const {serverData} = this.props;
        
        this.state = {
            serverData: serverData,
            showContext: false
        };
    }

    componentDidMount() {

        super.componentDidMount();

        document.addEventListener('click', this._handlerHidePopup.bind(this));
    }

    componentWillUnmount() {

        super.componentWillUnmount();

        document.removeEventListener('click', this._handlerHidePopup.bind(this));
    }

    _handlerHidePopup(ev) {

        if ($(ev.target).hasClass('popup-prevent')) {
            return;
        }

        let {showContext} = this.state;

        if (!showContext) {
            return;
        }

        this.setStats({
            showContext: false
        });
    }

    componentWillReceiveProps(props) {
        
        const {serverData} = props;
        
        this.setState({
            serverData: serverData,
            showContext: false
        });
    }

    _onUserIconClick() {
        
        this.setStats({showContext: true})
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

        const {serverData, showContext} = this.state;
        const {user} = serverData;
        const {userName} = user;

        return (
            <div className="main-navigation">
                <div className="main-navigation__links">
                    {this._renderHeaderUrls()}
                    <div className="clear-both" />
                </div>
                <div onClick={this._onUserIconClick.bind(this)} title={'Вы вошли как '+ userName} className="popup-prevent main-navigation__user-icon" />
                <div onClick={this._onUserIconClick.bind(this)} title={'Вы вошли как '+ userName} className="popup-prevent main-navigation__user-icon-down" />
                <div className="popup-prevent header__popup-window" style={{display: !showContext ? 'none' : 'block'}}>
                    <div style={{marginBottom:'3px'}}>Вы вошли как</div>
                    <strong>{userName}</strong>
                    <div style={{marginBottom:'3px', marginTop:'3px', borderTop:'1px solid #dddddd'}} />
                    <a style={{textDecoration: 'none'}} href="api/logout">Выйти из программы</a>
                </div>
            </div>
        );
    }
};

HeaderComponent.propTypes = {
    serverData: PropTypes.object.isRequired
};