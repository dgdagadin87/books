import React from 'react';

import PropTypes from 'prop-types';

import {ajaxQuery, createUrlLink as CUL} from '../../core/coreUtils';
import {defaultSettings, urlSettings} from '../../config/settings';

import BaseModule from '../../base/BaseModule.jsx';

import PreloaderComponent from '../components/LargePreloaderComponent.jsx';
import TableComponent from '../components/TableComponent.jsx';

class MyBooksComponent extends BaseModule {

    constructor(props) {
        super(props);
        
        this._moduleName = 'mybooks';
        
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

        globalEvents.trigger('setTitle', 'Мои книги');
    }

    componentDidMount() {
        super.componentDidMount();

        let {collection} = this.state;
        
        if (collection === false) {
            this._loadData();
        }
    }

    _getStateData(data) {
        
        const {collection, filter, paging} = data;
        
        return {
            collection: collection,
            sortField: filter.sortField,
            sortType: filter.sortType,
            searchTerm: filter.searchTerm,
            page: paging.page,
            pages: paging.pages,
            totalCount: paging.totalCount
        };
    }

    _loadData() {
        
        const {collection, sortField, sortType, page, searchTerm} = this.state;
        const {globalEvents} = this.props;

        let firstStateData = null;

        if (collection === false) {
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
            sortField,
            sortType,
            page,
            searchTerm
        };
        
        ajaxQuery(
            {
                url: CUL(defaultSettings, urlSettings['getMyBooksData']),
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

                    this.mounted && globalEvents.trigger('setModuleData', result.data, 'mybooks');
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

    componentWillReceiveProps() {}

    _onSortChange(sortData) {

        this.setStats(sortData, this._loadData());
    }

    _renderMyBooks() {
        
        const {disabled, collection = [], sortField, sortType} = this.state;

        let myBooksUI = [];

        myBooksUI.push(
            <TableComponent
                key={1}
                events={this.events}
                items={!collection ? [] : collection}
                showCheckColumn={true}
                controlMode="mybooks"
                onSortChange={this._onSortChange.bind(this)}
                sortField={sortField}
                sortType={sortType}
                disabled={disabled}
                columns={[
                    {
                        name: 'bookName',
                        title: 'Название',
                        sortable: true,
                        type: 'usual'
                    },
                    {
                        name: 'bookShortDesc',
                        title: 'О книге',
                        sortable: false,
                        type: 'description'
                    },
                    {
                        name: 'bookAuthor',
                        title: 'Автор',
                        sortable: true,
                        type: 'usual'
                    },
                    {
                        name: 'bookGenre',
                        title: 'Жанр',
                        sortable: false,
                        type: 'usual'
                    },
                    {
                        name: 'bookSize',
                        title: 'Размер',
                        sortable: true,
                        type: 'usual'
                    },
                    {
                        name: 'bookParentSite',
                        title: 'Взято с сайта',
                        sortable: true,
                        type: 'link'
                    }
                ]}
            />
        );

        return myBooksUI;
    }

    render() {

        const {globalLoading} = this.state;

        return (
            <div>
                {globalLoading ? <PreloaderComponent /> : this._renderMyBooks()}
            </div>
        );
    }
};

MyBooksComponent.propTypes = {
    serverData: PropTypes.object.isRequired,
    globalEvents:  PropTypes.object.isRequired,
    localData: PropTypes.any.isRequired
};

export default MyBooksComponent;