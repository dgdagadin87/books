import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class NotFoundComponent extends BaseComponent {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps() {}

    render() {

        return (
            <div className="main-about__panel">
                <div className="main-about__title">
                    404 - ошибка
                </div>
                <div className="main-about__content">
                    <span style={{color:'red'}}>Вы попали на несуществующую страницу.</span>
                </div>
            </div>
        );
    }
};

export default NotFoundComponent;