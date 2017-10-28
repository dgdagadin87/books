import React from 'react';

import PropTypes from 'prop-types';

import {emptyFunction} from '../../core/coreUtils';

import BaseComponent from '../../base/BaseComponent.jsx';

const SORT_ASC = '▲';
const SORT_DESC = '▼';

class TableComponent extends BaseComponent {

    constructor (props) {
        super(props);
        
        this.state = {
            items: props.items || [],
            sortField: props.sortField || 'bookName',
            sortType: props.sortType || 'ASC',
            disabled: props.disabled
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setStats({
            items: nextProps.items || [],
            sortField: nextProps.sortField || 'bookName',
            sortType: nextProps.sortType || 'ASC',
            disabled: nextProps.disabled
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
        const {sortable, name} = columnData;
        
        if (!sortable) {
            return <span className="table__no-sort">{columnData.title}</span>;
        }
        
        let sortTypeBlock = '';
        if (sortField === name) {
            sortTypeBlock = <span className="table__sort-type">{sortType === 'ASC' ? SORT_ASC : SORT_DESC}</span>;
        }
        
        return (
            <div>
                {sortTypeBlock}
                <span className="table__yes-sort">{columnData.title}</span>
            </div>
        );
    }

    _sortHandler(columnData) {

        const {onSortChange} = this.props;
        const {name, sortable} = columnData;
        const {sortField, sortType, disabled} = this.state;
 
        if (!sortable || disabled) {
            return;
        }
        
        if (name === sortField) {
            let newSortType = sortType === 'ASC' ? 'DESC' : 'ASC';
            onSortChange({
                sortField: sortField,
                sortType: newSortType
            });
            return;
        }

        onSortChange({
            sortField: name,
            sortType: sortType
        });
    }
    
    _checkClickHandler() {

        const {disabled} = this.state;
        
        if (disabled) {
            return false;
        }
    }

    _renderTableHeaders () {

        const {columns = [], showCheckColumn} = this.props;
        const {disabled} = this.state;
        const columnNames = this._getColumnNames();

        let columnsArray = [];
        
        if (showCheckColumn) {
            columnsArray.push(
                <td
                    onClick={(event) => this._checkClickHandler(event)}
                    key={-1}
                    className={'table__header-check'}
                >
                    <span className="table__check-span">
                        <input disabled={disabled} type="checkbox" className="header-checkbox" />
                    </span>
                </td>
            );
        }
        
        for (let i = 0; i < columnNames.length; i++) {
            
            let currentColumn = columns[i];
            let isSortable = currentColumn.sortable;
            
            columnsArray.push(
                <td
                    onClick={currentColumn.sortable ? this._sortHandler.bind(this, currentColumn) : emptyFunction}
                    key={i}
                    className={'table__header-cell' + ' header-' + columnNames[i] + (isSortable === true ? ' table__header-sortable' : '') + (disabled ? ' disabled' : '')}
                >
                    {this._renderHeader(currentColumn)}
                </td>
            );
        }

        return <tr>{columnsArray}</tr>;
    }
    
    _renderTableFilters () {

        const {columns = [], showCheckColumn} = this.props;
        const {disabled} = this.state;
        const columnNames = this._getColumnNames();

        let filtersArray = [];
        
        if (showCheckColumn) {
            filtersArray.push(<td key={-1} className={'table__filter-cell'}>&nbsp;</td>);
        }
        
        for (let i = 0; i < columnNames.length; i++) {
            
            filtersArray.push(
                <td key={i} className={'table__filter-cell'}>
                    <input disabled={disabled} type="text" />
                </td>
            );
        }

        return <tr>{filtersArray}</tr>;
    }

    render() {

        return (
            <div className="table__container">
                <table cellSpacing="0" cellPadding="0" className="table">
                    <thead />
                    <tbody>
                        {this._renderTableHeaders()}
                        {this._renderTableFilters()}
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
    onSortChange: PropTypes.func,
    showCheckColumn: PropTypes.bool,
    totalCount: PropTypes.number
};

export default TableComponent;