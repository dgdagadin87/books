import React from 'react';

import BaseComponent from '../../base/BaseComponent.jsx';

import HeaderComponent from './HeaderComponent.jsx';
import FooterComponent from './FooterComponent.jsx';

export default class RootComponent extends BaseComponent {

    componentWillReceiveProps(props) {
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