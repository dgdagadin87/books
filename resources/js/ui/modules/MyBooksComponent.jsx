import React from 'react';

import PropTypes from 'prop-types';

import BaseModule from '../../base/BaseModule.jsx';

class MyBooksComponent extends BaseModule {

    constructor(props) {
        super(props);
        
        this._moduleName = 'mybooks';
        
        const {globalEvents, localData} = props;

        this.state = {
            moduleData: localData,
            disabled: false,
            globalLoading: false,
            localLoading: false
        };

        globalEvents.trigger('setTitle', 'Мои книги');
    }

    componentDidMount() {
        super.componentDidMount();
        
        let {localData} = this.state;
        
        if (localData === false) {
            this._loadData();
        }
    }

    _loadData() {
        
        window.console.log('loading...');
    }

    componentWillReceiveProps() {}

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