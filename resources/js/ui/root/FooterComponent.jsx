import React from 'react';

import BaseComponent from '../../base/BaseComponent.jsx';

export default class FooterComponent extends BaseComponent {

    componentWillReceiveProps(props) {
    }

    render() {

        return (
            <div className="main-footer">
                Футер
            </div>
        );
    }
}