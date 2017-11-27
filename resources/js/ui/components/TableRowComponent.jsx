import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

import DescriptionComponent from './DescriptionComponent.jsx';
import SendToMailComponent from './SendToMailComponent.jsx';
import LinkComponent from './LinkComponent.jsx';
import AddBookComponent from './AddBookComponent.jsx';
import DeleteBookComponent from './DeleteBookComponent.jsx';

class TableRowComponent extends BaseComponent {

    constructor(props) {
        
        super(props);
        
        this.state = {
            itemData: props.itemData,
            disabled: props.disabled
        };
    }

    componentWillReceiveProps(nextProps) {
        
        this.setStats({
            itemData: nextProps.itemData,
            disabled: nextProps.disabled
        });
    }

    _renderCell(columnData) {
        
        const {itemData} = this.state;
        const {name, type = 'usual'} = columnData;
        let columnValue;
        
        if (type === 'usual') {
            columnValue = itemData[name] || '';
            return (
                <span className="table__content-span">
                    {columnValue}
                </span>
            );
        }
        
        if (type === 'description') {
            columnValue = itemData[name] || '';
            return (
                <DescriptionComponent
                    value={columnValue}
                />
            );
        }
        
        if (type === 'link') {
            return (
                <LinkComponent
                    parentSiteUrl={itemData['parentSiteUrl'] || ''}
                    parentSiteName={itemData['parentSiteName'] || ''}
                />
            );
        }
    }

    _renderRow() {
        
        const {showCheckColumn, columns, controlMode, onSendMail, onDeleteBook, onAddBook} = this.props;
        const {disabled, itemData} = this.state;
        
        let columnsArray = [];
        
        if (showCheckColumn) {
            columnsArray.push(
                <td
                    key={-1}
                    className={'table__content-check'}
                >
                    <span className="table__check-span">
                        <input disabled={disabled} type="checkbox" className="content-checkbox" />
                    </span>
                </td>
            );
        }
        
        for (let i = 0; i < columns.length; i++) {
            
            const currentColumn = columns[i];
            const {name, type} = currentColumn;
            
            columnsArray.push(
                <td
                    key={i}
                    className="table__content-cell"
                >
                {this._renderCell(currentColumn)}
                </td>
            );
        }
        
        if (controlMode === 'mybooks') {
            columnsArray.push(
                <td key={columns.length} className="table__content-cell">
                    <a onClick={(ev)=>{
                        ev.preventDefault();
                        window.location.href = '/downloadmybook/' + itemData['bookId'];
                    }} href="#">С.</a>
                </td>
            );
            columnsArray.push(
                <td key={columns.length + 1} className="table__content-cell">
                    <SendToMailComponent
                        bookId={itemData['bookId']}
                        sendMail={onSendMail}
                        disabled={disabled}
                    />
                </td>
            );
            columnsArray.push(
                <td key={columns.length + 2} className="table__content-cell">
                    <DeleteBookComponent
                        bookId={itemData['bookId']}
                        deleteBook={onDeleteBook}
                        disabled={disabled}
                    />
                </td>
            );
        }
        
        if (controlMode === 'allbooks') {
            const {isAdmin} = this.props;
            columnsArray.push(
                <td key={columns.length} className="table__content-cell">
                    <a onClick={(ev)=>{
                        ev.preventDefault();
                        window.location.href = '/downloadallbook/' + itemData['bookId'];
                    }} href="#">С.</a>
                </td>
            );
            columnsArray.push(
                <td key={columns.length + 1} className="table__content-cell">
                    <SendToMailComponent
                        bookId={itemData['bookId']}
                        sendMail={onSendMail}
                        disabled={disabled}
                    />
                </td>
            );
            columnsArray.push(
                <td key={columns.length + 2} className="table__content-cell">
                    <AddBookComponent
                        bookId={itemData['bookId']}
                        addBook={onAddBook}
                        disabled={disabled}
                    />
                </td>
            );
            if (isAdmin) {
                columnsArray.push(
                    <td key={columns.length + 3} className="table__content-cell">
                        <DeleteBookComponent
                            bookId={itemData['bookId']}
                            deleteBook={onDeleteBook}
                            disabled={disabled}
                        />
                    </td>
                );
            }
            
        }
        
        return columnsArray;
    }

    render() {

        return (
            <tr>{this._renderRow()}</tr>
        );
    }
};

TableRowComponent.propTypes = {
    controlMode: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    isAdmin: PropTypes.bool,
    columns: PropTypes.array.isRequired,
    itemData: PropTypes.object.isRequired,
    showCheckColumn: PropTypes.bool,
    onSendMail: PropTypes.func,
    onAddBook: PropTypes.func,
    onDeleteBook: PropTypes.func
};

export default TableRowComponent;