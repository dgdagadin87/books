import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class TitleComponent extends BaseComponent {

    constructor(props) {
        super(props);
        
        const {title = ''} = props;
        
        this.state = {
            title: title
        };
    }

    componentWillReceiveProps(props) {
        
        const {title} = props;
        
        this.setState({
            title: title
        });
    }

    render() {

        const {title} = this.state;

        return (
            <div className="main-title">
                Раздел {'"' + title + '"'}
            </div>
        );
    }
};

TitleComponent.propTypes = {
    title: PropTypes.string
};

export default TitleComponent;