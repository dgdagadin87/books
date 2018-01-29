import React from 'react';

import PropTypes from 'prop-types';

import BaseModule from '../../base/BaseModule.jsx';

class AboutComponent extends BaseModule {

    constructor(props) {
        super(props);
        
        const {globalEvents} = this.props;
        globalEvents.trigger('setTitle', 'О программе');
    }

    componentWillReceiveProps() {}

    render() {

        return (
            <div className="main-about__panel">
                <div className="main-about__title">
                    О программе "Книги"
                </div>
                <div className="main-about__content">
                    О программе
                </div>
            </div>
        );
    }
}

AboutComponent.propTypes = {
    serverData: PropTypes.object.isRequired,
    globalEvents: PropTypes.object.isRequired
};

export default AboutComponent;