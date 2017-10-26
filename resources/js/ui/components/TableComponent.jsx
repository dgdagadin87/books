import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class TableComponent extends BaseComponent {

    constructor (props) {
        super(props);
        
        this.state = {
            items: props.items || [],
            sortField: props.sortField || 'bookName',
            sortType: props.sortType || 'ASC'
        };
    }

    componentWillReceiveProps(nextProps) {
        
        this.setStats({
            items: nextProps.items || [],
            sortField: nextProps.sortField || 'bookName',
            sortType: nextProps.sortType || 'ASC'
        });
    }

    _getColumnNames() {
        
        const {columns = []} = this.props;
        let columnNames = [];
        
        for (let i = 0; i < columns.length; i++) {
            columnNames.push(columns[i].name);
        }
        
        return columnNames;
    }

    _renderHeader(columnData) {
        
        const {sortField, sortType} = this.state;
        const {sortable} = columnData;
        
        if (!sortable) {
            return columnData.title;
        }
        
        
    }

    _renderTableHeaders () {

        const {columns = []} = this.props;
        const {items = []} = this.state;
        const columnNames = this._getColumnNames();
        let columnsArray = [];
        
        for (var i = 0; i < columnNames.length; i++) {
            columnsArray.push(
                <td
                    key={i}
                    className={'table__header-cell' + ' header-' + columnNames[i]}
                >
                    {this._renderHeader(columns[i])}
                </td>
            );
        }
    }

    render() {

        return (
            <div>
                <table cellSpacing="0" cellPadding="0">
                    <thead />
                    <tbody>
                        {this._renderTableHeaders()}
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