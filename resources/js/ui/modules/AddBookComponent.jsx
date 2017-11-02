import React from 'react';

import PropTypes from 'prop-types';

import {ajaxQuery, createUrlLink as CUL} from '../../core/coreUtils';
import {defaultSettings, urlSettings, pageSettings} from '../../config/settings';

import BaseModule from '../../base/BaseModule.jsx';

import PreloaderComponent from '../components/LargePreloaderComponent.jsx';
import SelectSiteComponent from '../components/SelectSiteComponent.jsx';

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
                globalLoading: false
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
        
        console.log(siteId);
    }

    _renderSearchPanel() {
        
        const {sites = [], searchTerm, disabled, selectedSiteId} = this.state;

        return(
            <div key={0} className="main-addbook__search-panel">
                <div className="main-addbook__search-panel-title">
                    Поиск по книгам
                </div>
                <div className="main-addbook__search-panel-content">
                    {sites !== false ?
                        <SelectSiteComponent
                            disabled={disabled}
                            items={sites}
                            selectedSiteId={selectedSiteId}
                            onChange={this._onSiteChange.bind(this)}
                        /> :
                        null
                    }
                </div>
            </div>
        );
    }

    _renderAddBook() {
        
        const {sites, searchTerm} = this.state;
        
        let addBookUI = [];
        
        addBookUI.push(this._renderSearchPanel());
        
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