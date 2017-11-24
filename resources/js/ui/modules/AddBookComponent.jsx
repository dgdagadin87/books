import React from 'react';

import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import $ from 'jquery';

import {isEmpty, ajaxQuery, createUrlLink as CUL} from '../../core/coreUtils';
import {defaultSettings, urlSettings, pageSettings} from '../../config/settings';
import {getDefaultState} from '../../core/applicationUtils';

import BaseModule from '../../base/BaseModule.jsx';

import PreloaderComponent from '../components/LargePreloaderComponent.jsx';
import SelectSiteComponent from '../components/SelectSiteComponent.jsx';
import SearchComponent from '../components/SearchComponent.jsx';

class AddBookComponent extends BaseModule {

    constructor(props) {
        super(props);

        this._moduleName = 'allbooks';

        const {globalEvents, localData} = props;
        
        let dataState = this._getStateData(localData);

        let firstState = Object.assign(
            {},
            dataState,
            {
                disabled: false,
                globalLoading: false,
                isSelectError: false,
                isSearchError: false
            }
        );

        this.state = firstState;
        
        globalEvents.trigger('setTitle', 'Добавление книги');
    }

    componentWillReceiveProps() {}

    componentDidMount() {
        super.componentDidMount();

        let {isLoaded} = this.state;
        
        if (isLoaded === false) {
            this._loadData();
        }
    }

    _loadData() {
        
        const {globalEvents} = this.props;
        const {collection, sites, selectedSiteId, page, searchTerm, isLoaded} = this.state;

        let firstStateData = null;

        if (isLoaded === false) {
            firstStateData = {
                globalLoading: true
            };
        }
        else {
            firstStateData = {
                disabled: true
            };
        }
        this.setStats(firstStateData);

        let queryData = {
            selectedSiteId,
            page,
            searchTerm
        };
        
        ajaxQuery(
            {
                url: CUL(defaultSettings, urlSettings['getAddBookData']),
                data: queryData
            },
            {
                afterSuccess: (result) => {
                    if (!result.isSuccess) {
                        this.setStats({
                            globalLoading: false,
                            disabled: false
                        });
                        globalEvents.trigger('showError', result);
                        return;
                    }
                    
                    this.setStats(
                        Object.assign({}, {
                            globalLoading: false,
                            disabled: false
                        }, this._getStateData(result.data))
                    );

                    let resultData = Object.assign(
                        {},
                        result.data,
                        {
                            isLoaded: true
                        }
                    );

                    this.mounted && globalEvents.trigger('setModuleData', resultData, 'addbook');
                },
                afterError: (result) => {
                    this.setStats({
                        globalLoading: false,
                        disabled: false
                    });
                    globalEvents.trigger('showError', result);
                }
            }
        );
    }

    _getStateData(data) {
        
        const {collection, filter, paging, sites, isFoundInMy, isFoundInAll, isLoaded} = data;
        
        return {
            isLoaded: isLoaded,
            isFoundInMy: isFoundInMy,
            isFoundInAll: isFoundInAll,
            collection: collection,
            selectedSiteId: filter.selectedSiteId,
            searchTerm: filter.searchTerm,
            page: paging.page,
            pages: paging.pages,
            sites: sites
        };
    }
    
    _onSiteChange(siteId) {
        this.setStats({
            isSelectError: parseInt(siteId) === -1 ? true : false,
            selectedSiteId: siteId
        });
    }
    
    _onSiteSearch(searchData) {
        
        const {selectedSiteId} = this.state;
        let {searchTerm} = searchData;
        let stateObject = {};
        let error = false;

        stateObject['searchTerm'] = searchTerm;
        
        if (isEmpty(searchTerm)) {
            error = true;
            stateObject['isSearchError'] = true;
        }
        
        if (parseInt(selectedSiteId) === -1) {
            error = true;
            stateObject['isSelectError'] = true;
        }
        
        if (error) {
            this.setStats(stateObject);
            return;
        }
        else {
            stateObject.isSelectError = false;
            stateObject.isSearchError = false;
            this.setStats(stateObject, this._loadData.bind(this));
        }
    }

    _renderSearchPanel() {
        
        const {sites = [], searchTerm, disabled, selectedSiteId, isSelectError, isSearchError} = this.state;

        return(
            <div key={0} className="main-addbook__search-panel">
                <div className="main-addbook__search-panel-title">
                    Поиск по книгам
                </div>
                <div className="main-addbook__search-panel-content">
                    <div className="main-addbook__search-panel-label">
                        Выбор сайта
                    </div>
                    <SelectSiteComponent
                        disabled={disabled}
                        items={sites}
                        isError={isSelectError}
                        selectedSiteId={selectedSiteId}
                        onChange={this._onSiteChange.bind(this)}
                    />
                    <div className="main-addbook__search-panel-label">
                        Фраза для поиска
                    </div>
                    <SearchComponent
                        key={0}
                        searchTerm={searchTerm}
                        onSearch={this._onSiteSearch.bind(this)}
                        disabled={disabled}
                        mode="strict"
                        isError={isSearchError}
                    />
                </div>
            </div>
        );
    }

    _renderPreloader() {
        
        const {globalLoading, disabled} = this.state;
        
        if (!globalLoading && disabled) {
            return (
                <div  key={1} className="main-addnewbook__preloader">
                    Подождите...
                </div>
            );
        }
        else {
            return null;
        }
    }
    
    _renderFoundInThis() {
        
        const {globalEvents} = this.props;
        const {isFoundInMy, isFoundInAll, searchTerm} = this.state;

        if (isFoundInMy || isFoundInAll) {
            
            let foundInMy = null, foundInAll = null;
            
            if (isFoundInMy) {
                const linkToMyBooks = (
                    <a
                        href='#'
                        onClick={(event) => {
                            event.preventDefault();
                            let linkToMy = $('#addBook-myBooks a:first-child');
                            let defaultMyBooksData = getDefaultState('mybooks');
                            defaultMyBooksData.filter.searchTerm = searchTerm;
                            let callBack = () => {
                                linkToMy[0].click();
                            };
                            globalEvents.trigger('setModuleData', defaultMyBooksData, 'mybooks', callBack.bind(this));
                        }}
                    >
                        Перейти
                    </a>
                );
                foundInMy = (
                    <div className="main-addnewbook__foundin-item">
                        Результаты, содержащие {'"' + searchTerm + '"'}, найдены в разделе "Мои книги". {linkToMyBooks}
                        <div id="addBook-myBooks" style={{display:'none'}}>
                            <Link to={'/'}>{'Мои книги'}</Link>
                        </div>
                    </div>
                );
            }
            
            if (isFoundInAll) {
                const linkToAllBooks = (
                    <a
                        href='#'
                        onClick={(event) => {
                            event.preventDefault();
                            let linkToAll = $('#addBook-allBooks a:first-child');
                            let defaultAllBooksData = getDefaultState('allbooks');
                            defaultAllBooksData.filter.searchTerm = searchTerm;
                            let callBack = () => {
                                linkToAll[0].click();
                            };
                            globalEvents.trigger('setModuleData', defaultAllBooksData, 'allbooks', callBack.bind(this));
                        }}
                    >
                        Перейти
                    </a>
                );
                foundInAll = (
                    <div className="main-addnewbook__foundin-item">
                        Результаты, содержащие {'"' + searchTerm + '"'}, найдены в разделе "Все книги". {linkToAllBooks}
                        <div id="addBook-allBooks" style={{display:'none'}}>
                            <Link to={'/allbooks'}>{'Все книги'}</Link>
                        </div>
                    </div>
                );
            }
            
            return (
                <div  key={2} className="main-addnewbook__foundin-panel">
                    {foundInMy}
                    {foundInAll}
                </div>
            );
        }
        else {
            return null;
        }
    }

    _renderTable() {
        
        const {globalEvents} = this.props;
        const {collection} = this.state;
        
        let rowsArray = [];
        
        for (let i = 0; i < collection.length; i++) {
            let currentItem = collection[i];
            
            rowsArray.push(
                <tr key={i}>
                    <td className="item addnewbook-bookname-cell">
                        {currentItem['name']}
                    </td>
                    <td className="item addnewbook-authorname-cell">
                        {currentItem['author']}
                    </td>
                    <td className="item addnewbook-authorname-cell">
                        {currentItem['genre']}
                    </td>
                    <td className="item addnewbook-panel-cell">
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                            }}
                        >
                            Скачать
                        </a>
                    </td>
                    <td className="item addnewbook-panel-cell">
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                globalEvents.trigger('addInMyBooks', currentItem, 'start');
                            }}
                        >
                            Добавить в "Мои книги"        
                        </a>
                    </td>
                </tr>
            );
        }
        
        return (
            <div className="main-addnewbook__table-container">
                <div className="main-addnewbook__table-head">
                    Результаты, найденные на выбранном сайте
                </div>
                <table cellSpacing="0" cellPadding="0" className="main-addnewbook__table">
                    <thead />
                    <tbody>
                        <tr>
                            <td className="header addnewbook-bookname-head">Название</td>
                            <td className="header addnewbook-authorname-head">Автор</td>
                            <td className="header addnewbook-genre-head">Жанр</td>
                            <td className="header addnewbook-panel-head" colSpan="2"></td>
                        </tr>
                        {rowsArray}
                    </tbody>
                </table>
            </div>
        );
    }

    _renderCollection() {
        
        const {collection} = this.state;

        if (collection === false) {
            return null;
        }
        
        if (Array.isArray(collection)) {
            if (collection.length < 1) {
                return (
                    <div key={3} className="main-addnewbook__collection-container">
                        <div className="main-addnewbook__collection-no-data">
                            Ничего не найдено
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div key={3} className="main-addnewbook__collection-container">
                        {this._renderTable()}
                    </div>
                );
            }
        }
        
        return null;
    }

    _renderAddBook() {

        let addBookUI = [];
        
        addBookUI.push(this._renderSearchPanel());
        
        addBookUI.push(this._renderPreloader());
        
        addBookUI.push(this._renderFoundInThis());
        
        addBookUI.push(this._renderCollection());
        
        return addBookUI;
    }

    render() {

        const {globalLoading, sites} = this.state;

        return (
            <div className="main-addnewbook__container">
                {globalLoading || sites === false ? <PreloaderComponent /> : this._renderAddBook()}
            </div>
        );
    }
};

AddBookComponent.propTypes = {
    serverData: PropTypes.object.isRequired,
    globalEvents:  PropTypes.object.isRequired
};

export default AddBookComponent;