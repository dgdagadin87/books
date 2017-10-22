import React from 'react';

import PropTypes from 'prop-types';

import BaseModule from '../../base/BaseModule.jsx';

class AboutComponent extends BaseModule {

    constructor(props) {
        super(props);
        
        const {globalEvents} = this.props;
        globalEvents.trigger('setTitle', 'О программе');
        
        setTimeout(()=>{this.setState({qqq:'www'})}, 5000);
    }

    componentWillReceiveProps() {}

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