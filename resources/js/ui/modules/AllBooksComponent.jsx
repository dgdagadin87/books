import React from 'react';

import PropTypes from 'prop-types';

import BaseModule from '../../base/BaseModule.jsx';

class AllBooksComponent extends BaseModule {

    constructor(props) {
        super(props);
        
        const {globalEvents} = this.props;
        
        globalEvents.trigger('setTitle', 'Все книги');
    }

    componentWillReceiveProps(props) {}

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