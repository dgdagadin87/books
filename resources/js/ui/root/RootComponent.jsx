import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

import HeaderComponent from './HeaderComponent.jsx';
import FooterComponent from './FooterComponent.jsx';

class RootComponent extends BaseComponent {

    constructor(props) {
        super(props);
window.console.log(props);
        const {serverData = {}} = this.props;

        this.state = {
            serverData: serverData
        };

        this._bindEvents();
    }

    componentWillReceiveProps(props) {
        const {serverData = {}} = props;

        this.setState({
            serverData: serverData
        });
    }

    _bindEvents() {
        window.console.log('bind');
    }

    render() {

        return (
            <div>
                <HeaderComponent />
                {this.props.children}
                <FooterComponent />
            </div>
        );
    }
}

RootComponent.propTypes = {
    serverData: PropTypes.object.isRequired
};

export default RootComponent;