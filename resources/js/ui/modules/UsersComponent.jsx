import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class UsersComponent extends BaseComponent {

    constructor(props) {
        super(props);
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
    serverData: PropTypes.object.isRequired
};

export default UsersComponent;