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
            <div>
                У вас недостаточно прав для просмотра данной страницы.
            </div>
        );
    }
};

export default NotFoundComponent;