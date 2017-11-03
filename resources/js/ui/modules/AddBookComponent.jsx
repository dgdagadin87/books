import React from 'react';

import PropTypes from 'prop-types';

import {isEmpty, ajaxQuery, createUrlLink as CUL} from '../../core/coreUtils';
import {defaultSettings, urlSettings, pageSettings} from '../../config/settings';

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
        
        const {collection, filter, paging, sites, isLoaded} = data;
        
        return {
            isLoaded: isLoaded,
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
        
        this.setStats(stateObject);
        
        if (error) {
            return false;
        }
        
        // load data
        this._loadData();
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

    _renderAddBook() {
        
        const {sites, searchTerm} = this.state;
        
        let addBookUI = [];
        
        addBookUI.push(this._renderSearchPanel());
        
        addBookUI.push(this._renderPreloader());
        
        return addBookUI;
    }

    render() {

        const {globalLoading} = this.state;

        return (
            <div className="main-addnewbook__container">
                {globalLoading ? <PreloaderComponent /> : this._renderAddBook()}
            </div>
        );
    }
};

AddBookComponent.propTypes = {
    serverData: PropTypes.object.isRequired,
    globalEvents:  PropTypes.object.isRequired
};

export default AddBookComponent;