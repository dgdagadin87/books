import React from 'react';

import PropTypes from 'prop-types';

import {ajaxQuery, createUrlLink as CUL} from '../../core/coreUtils';
import {defaultSettings, urlSettings, pageSettings} from '../../config/settings';

import BaseModule from '../../base/BaseModule.jsx';

import PreloaderComponent from '../components/LargePreloaderComponent.jsx';
import SearchComponent from '../components/SearchComponent.jsx';
import TableComponent from '../components/TableComponent.jsx';
import PagingComponent from '../components/PagingComponent.jsx';

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

        this.setStats(sortData, this._loadData.bind(this));
    }
    
    _onPageChange(pageData) {
        
        this.setStats(pageData, this._loadData.bind(this));
    }
    
    _onSearch(searchData) {

        this.setStats(searchData, this._loadData.bind(this));
    }

    _onSendMail(bookId, emailToSend) {
        
        const {globalEvents} = this.props;
        
        ajaxQuery(
            {
                url: CUL(defaultSettings, urlSettings['sendToMail']) + bookId,
                method: 'POST',
                data: JSON.stringify({
                    email: emailToSend
                })
            },
            {
                afterSuccess: (result) => {
                    if (!result.isSuccess) {
                        globalEvents.trigger('showError', result);
                        return;
                    }
                    alert('Книга успешно отправлена по почте.');
                },
                afterError: (result) => {
                    globalEvents.trigger('showError', result);
                }
            }
        );
    }
    
    _onDeleteBook(bookId) {
        
        const {globalEvents} = this.props;
        
        if (!confirm('Вы действительно хотите удалить книгу из раздела "Мои книги"?')) {
            return;
        }
        
        this.setStats({
            disabled: true
        });
        
        ajaxQuery(
            {
                url: CUL(defaultSettings, urlSettings['deleteMyBook']) + bookId
            },
            {
                afterSuccess: (result) => {
                    if (!result.isSuccess) {
                        this.setStats({
                            disabled: false
                        });
                        globalEvents.trigger('showError', result);
                        return;
                    }
                    alert('Книга успешно удалена.');
                    this._loadData();
                },
                afterError: (result) => {
                    globalEvents.trigger('showError', result);
                }
            }
        );
    }

    _renderMyBooks() {
        
        const {serverData, history} = this.props;
        const {user} = serverData;
        const {userIsAdmin} = user;
        
        const {
            disabled,
            collection = [],
            sortField,
            sortType,
            page,
            pages,
            totalCount,
            searchTerm
        } = this.state;

        let myBooksUI = [];

        myBooksUI.push(
            <SearchComponent
                key={0}
                searchTerm={searchTerm}
                onSearch={this._onSearch.bind(this)}
                disabled={disabled}
                mode="simple"
            />
        );

        myBooksUI.push(
            <TableComponent
                key={1}
                routerHistory={history}
                events={this.events}
                isAdmin={userIsAdmin}
                items={!collection ? [] : collection}
                showCheckColumn={true}
                totalCount={totalCount}
                controlMode="mybooks"
                onSortChange={this._onSortChange.bind(this)}
                onSendMail={this._onSendMail.bind(this)}
                onDeleteBook={this._onDeleteBook.bind(this)}
                sortField={sortField}
                sortType={sortType}
                disabled={disabled}
                columns={[
                    {
                        name: 'bookName',
                        title: 'Название',
                        sortable: true,
                        type: 'description'
                    },
                    /*{
                        name: 'bookShortDesc',
                        title: 'О книге',
                        sortable: false,
                        type: 'description'
                    },*/
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
                        title: 'С сайта',
                        sortable: true,
                        type: 'link'
                    }
                ]}
            />
        );

        myBooksUI.push(
            <PagingComponent
                key={2}
                pageSettings={pageSettings}
                page={page}
                pages={pages}
                disabled={disabled}
                onChange={this._onPageChange.bind(this)}
                onRefresh={this._loadData.bind(this)}
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