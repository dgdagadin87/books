import React from 'react';

import BaseComponent from '../../base/BaseComponent.jsx';

export default class PreloaderComponent extends BaseComponent {

    componentWillReceiveProps() {}

    render() {

        return (
            <div className="main-preloader__small">
                Выполнение запроса...
            </div>
        );
    }
}