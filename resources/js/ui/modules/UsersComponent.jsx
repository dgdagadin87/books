import React from 'react';

import PropTypes from 'prop-types';

import BaseModule from '../../base/BaseModule.jsx';

class UsersComponent extends BaseModule {

    constructor(props) {
        super(props);
        
        const {globalEvents} = this.props;
        
        globalEvents.trigger('setTitle', 'Пользователи');
    }

    componentWillReceiveProps(props) {}

    render() {

        const {serverData} = this.props;
        const {user} = serverData;

        return (
            <div>
                {user.userIsAdmin ? 'Пользователи' : 'Access denied'}
            </div>
        );
    }
};

UsersComponent.propTypes = {
    serverData: PropTypes.object.isRequired,
    globalEvents:  PropTypes.object.isRequired
};

export default UsersComponent;