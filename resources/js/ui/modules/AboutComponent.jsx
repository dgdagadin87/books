import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class AboutComponent extends BaseComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(props) {}

    render() {

        return (
            <div>
                О программе
            </div>
        );
    }
}

AboutComponent.propTypes = {
    serverData: PropTypes.object.isRequired,
    globalEvents: PropTypes.object.isRequired
};

export default AboutComponent;