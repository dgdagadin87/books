import React from 'react';

import PropTypes from 'prop-types';

import BaseModule from '../../base/BaseModule.jsx';

class AddBookComponent extends BaseModule {

    constructor(props) {
        super(props);
        
        const {globalEvents} = this.props;
        
        globalEvents.trigger('setTitle', 'Добавление книги');
    }

    componentWillReceiveProps() {}

    render() {

        return (
            <div>
                Добавить книгу
            </div>
        );
    }
};

AddBookComponent.propTypes = {
    serverData: PropTypes.object.isRequired,
    globalEvents:  PropTypes.object.isRequired
};

export default AddBookComponent;