import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

import {setDocumentTitle} from '../../core/coreUtils';

import HeaderComponent from './HeaderComponent.jsx';
import TitleComponent from './TitleComponent.jsx';
import FooterComponent from './FooterComponent.jsx';

class RootComponent extends BaseComponent {

    constructor(props) {
        super(props);

        const {serverData = {}, title = ''} = this.props;

        this.state = {
            serverData: serverData,
            title: title,
            disabled: false
        };

        this._bindEvents();
    }

    componentWillReceiveProps() {
        /*const {serverData = {}, title = ''} = props;

        this.setState({
            serverData: serverData,
            title: title
        }, (title) => setDocumentTitle(title));*/
    }

    _bindEvents() {
        
        const {globalEvents} = this.props;
        
        globalEvents.on('hello', () => alert('hello'));
        globalEvents.on('setTitle', (title) => this._setTitle(title));
    }

    _setTitle(title) {
        this.setState({
            title: title
        });
        setDocumentTitle(title);
    }

    render() {

        const {serverData, title} = this.state;

        return (
            <div className="main-container">
                <HeaderComponent serverData={serverData} />
                <TitleComponent title={title} />
                {this.props.children}
                <FooterComponent />
            </div>
        );
    }
}

RootComponent.propTypes = {
    serverData: PropTypes.object.isRequired,
    globalEvents:  PropTypes.object.isRequired,
    title: PropTypes.string
};

export default RootComponent;