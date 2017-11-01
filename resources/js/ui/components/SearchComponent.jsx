import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

class SearchComponent extends BaseComponent {

    constructor(props) {
        super(props);
        
        this.state = {
            searchTerm: props.searchTerm || '',
            disabled: props.disabled
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setStats({
            searchTerm: nextProps.searchTerm || '',
            disabled: nextProps.disabled
        });
    }

    _onPageClick(pageNumber, event) {
        
        event.preventDefault();

        const {onChange} = this.props;
        const {disabled} = this.state;
        
        if (disabled) {
            return;
        }
        
        if (onChange) {
            onChange({
                page: pageNumber
            });
        }
    }

    _handleInput(event) {

        let value = event.target.value;

        this.setStats({
            searchTerm: value
        });
    }

    _handleKeyPress(event) {
        
        if (event.key === 'Enter') {
            event.preventDefault();
            
            const {onSearch} = this.props;
            const {disabled, searchTerm} = this.state;
            
            if (disabled) {
                return;
            }
            
            if (onSearch) {
                onSearch({
                    searchTerm
                });
            }
        }
    }
    
    _handleClick() {
        
        const {onSearch} = this.props;
        const {disabled, searchTerm} = this.state;

        if (disabled) {
            return;
        }

        if (onSearch) {
            onSearch({
                searchTerm
            });
        }
    }

    render() {
        
        const {disabled, searchTerm} = this.state;

        return (
            <div className="main-search__container">
                <div className="main-search__text-field-container">
                    <input
                        type="text"
                        placeholder="Введите строку поиска..."
                        disabled={disabled}
                        value={searchTerm}
                        onChange={this._handleInput.bind(this)}
                        onKeyPress={this._handleKeyPress.bind(this)}
                        className="main-search__text-field"
                    />
                    <button
                        className="main-search__button"
                        disabled={disabled}
                        onClick={this._handleClick.bind(this)}
                    >
                        Искать
                    </button>
                </div>
            </div>
        );
    }
};

SearchComponent.propTypes = {
    searchTerm: PropTypes.any,
    disabled: PropTypes.bool.isRequired,
    onSearch: PropTypes.func.isRequired
};

export default SearchComponent;