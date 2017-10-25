import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class TableComponent extends BaseComponent {

    constructor (props) {
        super(props);
        
    }

    componentWillReceiveProps() {}

    _getColumns() {
        
        const {columns = []} = this.props;
        return columns;
    }

    _renderRow(item, rowIndex) {
        
        let columnsArray = [];
        let count = 0;
        
        for (let index in item) {
            count++;
            columnsArray.push(
                <td key={count}>
                    {item[index]}
                </td>
            );
        }
        
        return <tr key={rowIndex}>{columnsArray}</tr>;
    }

    _renderTableRows () {

        const {items = []} = this.props;
        let rowsArray = [];
        console.log(items);
        for (let i = 0; i < items.length; i++) {
            let currentItem = items[i];
            rowsArray.push(this._renderRow(currentItem, i));
        }
        
        return rowsArray;
    }

    render() {

        return (
            <div>
                <table cellSpacing="0" cellPadding="0">
                    <thead />
                    <tbody>
                        {this._renderTableRows()}
                    </tbody>
                </table>
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