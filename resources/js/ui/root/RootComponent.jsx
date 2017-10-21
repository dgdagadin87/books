import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

import HeaderComponent from './HeaderComponent.jsx';
import FooterComponent from './FooterComponent.jsx';

class RootComponent extends BaseComponent {

    constructor(props) {
        super(props);

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
        
        const {globalEvents} = this.props;
        
        globalEvents.on('hello', () => alert('hello'));
    }

    render() {

        const {serverData} = this.props;

        return (
            <div>
                <HeaderComponent serverData={serverData} />
                {this.props.children}
                <FooterComponent />
            </div>
        );
    }
}

RootComponent.propTypes = {
    serverData: PropTypes.object.isRequired,
    globalEvents:  PropTypes.object.isRequired
};

export default RootComponent;