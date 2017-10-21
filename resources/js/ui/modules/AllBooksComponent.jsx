import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class AllBooksComponent extends BaseComponent {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(props) {
    }

    render() {

        return (
            <div>
                Все книги
            </div>
        );
    }
};

AllBooksComponent.propTypes = {
    serverData: PropTypes.object.isRequired,
    globalEvents:  PropTypes.object.isRequired
};

export default AllBooksComponent;