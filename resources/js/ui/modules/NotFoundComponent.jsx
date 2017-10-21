import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class NotFoundComponent extends BaseComponent {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
    }

    render() {

        return (
            <div>
                404 - ошибка.
            </div>
        );
    }
};

export default NotFoundComponent;