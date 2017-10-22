import React from 'react';

import PropTypes from 'prop-types';

import BaseModule from '../../base/BaseModule.jsx';

class MyBooksComponent extends BaseModule {

    constructor(props) {
        super(props);
        
        const {globalEvents, localData} = props;

        if (localData === false) {
            globalEvents.trigger('setModuleData', {foo: 'bar'}, 'mybooks');
        }

        globalEvents.trigger('setTitle', 'Мои книги');
    }

    componentWillReceiveProps(props) {}

    render() {

        return (
            <div>
                Мои книги
            </div>
        );
    }
};

MyBooksComponent.propTypes = {
    serverData: PropTypes.object.isRequired,
    globalEvents:  PropTypes.object.isRequired,
    localData: PropTypes.any.isRequired
};

export default MyBooksComponent;