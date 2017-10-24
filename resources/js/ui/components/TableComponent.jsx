import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class TableComponent extends BaseComponent {

    constructor (props) {
        super(props);
        
    }

    componentWillReceiveProps() {}

    render() {

        return (
            <div>
                Таблица
            </div>
        );
    }
};

TableComponent.propTypes = {
    events:  PropTypes.object.isRequired,
    disabled: PropTypes.bool.isReqired,
    columns: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    loadData: PropTypes.function
};

export default TableComponent;