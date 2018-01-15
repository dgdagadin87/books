import React from 'react';

import $ from 'jquery';

import BaseComponent from '../../base/BaseComponent.jsx';

export default class PreloaderComponent extends BaseComponent {

    componentWillReceiveProps() {}

    render() {

        let documentWidth = $(document).width();
        let leftPosition = parseInt(documentWidth)/2 - 100;

        return (
            <div className="main-preloader__small">
                <div className="preloader" style={{left:leftPosition+'px'}}>
                    <span className="image"></span>
                    <span className="text">Загрузка...</span>
                </div>
            </div>
        );
    }
}