import React from 'react';

import PropTypes from 'prop-types';

import BaseComponent from '../../base/BaseComponent.jsx';

import {pageSettings as currentSettings} from '../../config/settings';

class PagingComponent extends BaseComponent {

    constructor(props) {
        super(props);
        
        this.state = {
            page: props.page || 1,
            pages: props.pages || 1,
            disabled: props.disabled
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setStats({
            page: nextProps.page || 1,
            pages: nextProps.pages || 1,
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
                page:pageNumber
            });
        }
    }

    _renderPage(pageNumber, keyNumber) {
        
        const {disabled} = this.state;
        
        return (
            <a
                key={keyNumber}
                href="#"
                className={'main-paging__page' + ( disabled ? ' disabled' : '' )}
                onClick={this._onPageClick.bind(this, pageNumber)}
            >
                {pageNumber}
            </a>
        );
    }

    _renderNumbers() {

        let {pageSettings} = this.props;
        const {page, pages, disabled} = this.state;

        if (!page)  {
            pageSettings = currentSettings;
        }
        
        const {start, end, left, right} = pageSettings;

        let keyNumber = 0;
        let numbersElement = [];
        
        let leftRest = page - 1;
        let restCurrentNum = pages - page;
        let nextCurPage = page + 1;
        
        // left part
        if (leftRest >= 1 && leftRest < (start + left + 1)) {
            for (let i = 1; i < page; i++) {
                keyNumber++;
                numbersElement.push(this._renderPage(i, keyNumber));
            }
        }
        else if (leftRest >= (start + left + 1)) {
            for (let c = 1; c <= start; c++) {
                keyNumber++;
                numbersElement.push(this._renderPage(c, keyNumber));
            }
            numbersElement.push(
                <span className={'main-paging__dotted'} key={-1}>...</span>
            );
            for (let d = (page - left);  d < page; d++) {
                keyNumber++;
                numbersElement.push(this._renderPage(d, keyNumber));
            }
        }
        
        // current page
        keyNumber++;
        numbersElement.push(
            <span className={'main-paging__current-page'} key={-3}>
                {page}
            </span>
        );

        // right part
        if (restCurrentNum >= 1 && restCurrentNum < (end + right + 1)) {
            for (let j = nextCurPage; j <= pages; j++) {
                keyNumber++;
                numbersElement.push(this._renderPage(j, keyNumber));
            }
        }
        else if (restCurrentNum >= (end + right + 1)) {
            for (let n = nextCurPage;  n <= (page + right); n++) {
                keyNumber++;
                numbersElement.push(this._renderPage(n, keyNumber));
            }
            numbersElement.push(
                <span className={'main-paging__dotted'} key={-2}>...</span>
            );

            for (let m = (pages - end + 1); m <= pages; m++) {
                keyNumber++;
                numbersElement.push(this._renderPage(m, keyNumber));
            }
        }

        return numbersElement;
    }

    _renderPrevPage() {
        
        const {page, disabled} = this.state;
        
        
        if (page > 1) {
            
            let prevPage = page - 1;
            return (
                <a
                    key={-7}
                    href="#"
                    className={'main-paging__page' + ( disabled ? ' disabled' : '' )}
                    onClick={this._onPageClick.bind(this, prevPage)}
                >
                    {'<'}
                </a>
            );
        }
        
        return (
            <span key={-7}>{'<'}</span>
        );
    }
    
    _renderNextPage() {
        
        const {page, pages, disabled} = this.state;
        
        if (page < pages) {
            
            let nextPage = page + 1;
            return (
                <a
                    key={-8}
                    href="#"
                    className={'main-paging__page' + ( disabled ? ' disabled' : '' )}
                    onClick={this._onPageClick.bind(this, nextPage)}
                >
                    {'>'}
                </a>
            );
        }
        
        return (
            <span key={-8}>{'>'}</span>
        );
    }

    render() {
        
        const {disabled} = this.state;

        return (
            <div className="main-paging__container">
                {this._renderPrevPage()}
                {this._renderNumbers()}
                {this._renderNextPage()}
            </div>
        );
    }
};

PagingComponent.propTypes = {
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    pageSettings: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
};

export default PagingComponent;