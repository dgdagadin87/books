import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class LinkComponent extends BaseComponent {

    constructor(props) {
        super(props);
        
        this.state = {
            parentSiteUrl: props.parentSiteUrl,
            parentSiteName: props.parentSiteName
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setStats({
            parentSiteUrl: nextProps.parentSiteUrl || '',
            parentSiteName: nextProps.parentSiteName || ''
        });
    }

    render() {
        
        const {parentSiteUrl, parentSiteName} = this.state;

        return (
            <div className="main-parentlink__container">
                <a
                    className="main-parentlink__control"
                    href={parentSiteUrl}
                    target="_blank"
                >
                    {parentSiteName}
                </a>
            </div>
        );
    }
};

LinkComponent.propTypes = {
    parentSiteUrl: PropTypes.string.isRequired,
    parentSiteName: PropTypes.string.isRequired
};

export default LinkComponent;