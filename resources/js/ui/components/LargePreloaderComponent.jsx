import React from 'react';

import BaseComponent from '../../base/BaseComponent.jsx';

export default class PreloaderComponent extends BaseComponent {

    componentWillReceiveProps() {}

    render() {

        return (
            <div className="main-preloader__large">
                <div className="preloader" style="display:none;">
                    <span className="image"></span>
                    <span className="text">Загрузка...</span>
                </div>
            </div>
        );
    }
}