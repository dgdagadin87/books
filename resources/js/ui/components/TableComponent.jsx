import React from 'react';

import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import {emptyFunction} from '../../core/coreUtils';

import BaseComponent from '../../base/BaseComponent.jsx';

import RowComponent from './TableRowComponent.jsx';
import PreloaderComponent from './SmallPreloaderComponent.jsx';

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
            return <div className="table__no-sort">{columnData.title}</div>;
        }
        
        let sortClass = '';

        if (sortField === name) {
            sortClass = sortType === 'ASC' ? 'table-sort-asc' : 'table-sort-desc';
        }
        else {
            sortClass = 'table-sort-empty';
        }
        
        return (
            <div className={sortClass}>
                {columnData.title}
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

        const {columns = [], showCheckColumn, controlMode} = this.props;
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
        
        if (controlMode === 'users') {
            columnsArray.push(
                <td key={-7} className={'table__header-cell'}>&nbsp;</td>
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
        
        if (controlMode === 'mybooks') {
            columnsArray.push(
                <td key={columnNames.length} colSpan="3" className={'table__header-cell users_header-avatar'}>&nbsp;</td>
            );
        }
        if (controlMode === 'allbooks') {
            const {isAdmin = false} = this.props;
            let allColSpan = isAdmin ? 4 : 3;
            columnsArray.push(
                <td key={columnNames.length} colSpan={allColSpan} className={'table__header-cell'}>&nbsp;</td>
            );
        }
        if (controlMode === 'users') {
            columnsArray.push(
                <td key={columnNames.length} colSpan="2" className={'table__header-cell'}>&nbsp;</td>
            );
        }

        return <tr>{columnsArray}</tr>;
    }
    
    _renderTableFilters () {

        const {columns = [], showCheckColumn, controlMode} = this.props;
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

        if (controlMode === 'mybooks') {
            filtersArray.push(
                <td key={columnNames.length} colSpan="3" className={'table__filter-cell'}>&nbsp;</td>
            );
        }
        if (controlMode === 'allbooks') {
            const {isAdmin = false} = this.props;
            let allColSpan = isAdmin ? 4 : 3;
            filtersArray.push(
                <td key={columnNames.length} colSpan={allColSpan} className={'table__header-cell'}>&nbsp;</td>
            );
        }

        return <tr>{filtersArray}</tr>;
        
    }
    
    _renderTableRows () {

        const {
            items = [],
            columns = [],
            routerHistory,
            showCheckColumn,
            controlMode,
            onSendMail,
            onAddBook,
            onDeleteBook,
            onDeleteUser,
            isAdmin
        } = this.props;
        const {disabled} = this.state;

        let rowsArray = [];
        
        for (let i = 0; i < items.length; i++) {
            
            let currentItem = items[i];
            
            rowsArray.push(
                <RowComponent
                    key={i}
                    routerHistory={routerHistory}
                    isAdmin={isAdmin}
                    itemData={currentItem}
                    showCheckColumn={showCheckColumn}
                    columns={columns}
                    controlMode={controlMode}
                    disabled={disabled}
                    onSendMail={onSendMail}
                    onAddBook={onAddBook}
                    onDeleteBook={onDeleteBook}
                    onDeleteUser={onDeleteUser}
                />
            );
        }
        
        return (rowsArray);
    }
    
    _renderTableTotal () {

        const {controlMode, columns, showCheckColumn, totalCount} = this.props;

        if (controlMode === 'users') {
            return null;
        }

        let colSpan = 0;
        
        colSpan += columns.length;
        
        if (showCheckColumn) {
            colSpan += 1;
        }

        if (controlMode === 'mybooks') {
            colSpan += 3;
        }
        if (controlMode === 'allbooks') {
            const {isAdmin = false} = this.props;
            let allColSpan = isAdmin ? 4 : 3;
            colSpan += allColSpan;
        }

        return (
            <tr>
                <td colSpan={colSpan} className="table__total-cell">
                    Всего книг: {totalCount}
                </td>
            </tr>
        );
    }
    
    _renderTablePanel () {

        const {controlMode, columns, showCheckColumn, totalCount, routerHistory} = this.props;

        if (controlMode === 'users') {
            return (
                <tr>
                    <td colSpan={11} className="table__panel-cell">
                        <Link to={'/users/adduser'}>{'Добавить пользователя'}</Link>
                    </td>
                </tr>
            );
        }

        let colSpan = 0;
        let text = '';
        
        colSpan += columns.length;
        
        if (showCheckColumn) {
            colSpan += 1;
        }

        if (controlMode === 'mybooks') {
            colSpan += 3;
            text = 'Список раздела "Мои книги"';
        }
        if (controlMode === 'allbooks') {
            const {isAdmin = false} = this.props;
            let allColSpan = isAdmin ? 4 : 3;
            colSpan += allColSpan;
            text = 'Список раздела "Все книги"';
        }

        return (
            <tr>
                <td colSpan={colSpan} className="table__panel-cell">
                    <div className="table__panel-cell-left">
                        {text}
                    </div>
                    <div className="table__panel-cell-right">
                        <button type="button" className={'main-download__control'} onClick={()=>{
                            routerHistory.push('/addbook');
                        }}>Добавить книгу</button>
                    </div>
                </td>
            </tr>
        );
    }
    
    _renderPreloader () {

        const {disabled} = this.state;

        return disabled ? (<PreloaderComponent />) : (null);
    }

    render() {

        const {items = []} = this.state;

        return (
            <div className="table__container">
                {this._renderPreloader()}
                <table cellSpacing="0" cellPadding="0" className="table">
                    <thead />
                    <tbody>
                        {this._renderTablePanel()}
                        {this._renderTableHeaders()}
                        {this._renderTableRows()}
                        {this._renderTableTotal()}
                    </tbody>
                </table>
                {items.length === 0 ? <div className="table__no-data">Нет данных</div> : null}
            </div>
        );
    }
};

TableComponent.propTypes = {
    controlMode: PropTypes.string.isRequired,
    events:  PropTypes.object.isRequired,
    routerHistory: PropTypes.any,
    disabled: PropTypes.bool,
    columns: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    defaultSort: PropTypes.string,
    onSortChange: PropTypes.func,
    onSendMail: PropTypes.func,
    onDeleteUser: PropTypes.func,
    onAddBook: PropTypes.func,
    onDeleteBook: PropTypes.func,
    showCheckColumn: PropTypes.bool,
    isAdmin: PropTypes.bool
};

export default TableComponent;