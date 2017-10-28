import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

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
    }

    _renderRow() {
        
        const {showCheckColumn, columns, controlMode} = this.props;
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
                    <a onClick={(ev)=>{ev.preventDefault();}} href="#">С.</a>
                </td>
            );
            columnsArray.push(
                <td key={columns.length + 1} className="table__content-cell">
                    <a style={{color:'green'}} onClick={(ev)=>{ev.preventDefault();}} href="#">О.</a>
                </td>
            );
            columnsArray.push(
                <td key={columns.length + 2} className="table__content-cell">
                    <a style={{color:'red'}} onClick={(ev)=>{ev.preventDefault();}} href="#">У.</a>
                </td>
            );
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
    columns: PropTypes.array.isRequired,
    itemData: PropTypes.object.isRequired,
    showCheckColumn: PropTypes.bool
};

export default TableRowComponent;