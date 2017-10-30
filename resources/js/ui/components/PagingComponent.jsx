import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class PagingComponent extends BaseComponent {

    constructor(props) {
        super(props);
        
        this.state = {
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setStats({
            disabled: nextProps.disabled
        });
    }

    render() {
        
        const {disabled} = this.state;

        return (
            <div className="main-paging__container">
                Пагинация
            </div>
        );
    }
};

PagingComponent.propTypes = {
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

export default PagingComponent;