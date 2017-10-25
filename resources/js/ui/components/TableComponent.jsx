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
    disabled: PropTypes.bool,
    columns: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    defaultSort: PropTypes.string,
    loadData: PropTypes.func,
    showCheckColumn: PropTypes.bool,
    totalCount: PropTypes.number
};

export default TableComponent;