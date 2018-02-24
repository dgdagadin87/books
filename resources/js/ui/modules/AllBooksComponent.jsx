import React from 'react';

import PropTypes from 'prop-types';

import {ajaxQuery, createUrlLink as CUL} from '../../core/coreUtils';
import {defaultSettings, urlSettings, pageSettings} from '../../config/settings';

import {getDefaultState} from '../../core/applicationUtils';

import BaseModule from '../../base/BaseModule.jsx';

import PreloaderComponent from '../components/LargePreloaderComponent.jsx';
import SearchComponent from '../components/SearchComponent.jsx';
import TableComponent from '../components/TableComponent.jsx';
import PagingComponent from '../components/PagingComponent.jsx';

class AllBooksComponent extends BaseModule {

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

        globalEvents.trigger('setTitle', 'Все книги');
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
                url: CUL(defaultSettings, urlSettings['getAllBooksData']),
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

                    this.mounted && globalEvents.trigger('setModuleData', result.data, 'allbooks');
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
    
    _onAddBook(bookId) {
        
        const {globalEvents} = this.props;

        if (!confirm('Вы действительно хотите добавить книгу в раздел "Мои книги"?')) {
            return;
        }

        this.setStats({
            disabled: true
        });

        ajaxQuery(
            {
                url: CUL(defaultSettings, urlSettings['addToMyBooks']) + bookId,
                method: 'GET'
            },
            {
                afterSuccess: (result) => {

                    this.setStats({
                        disabled: false
                    });
                    
                    if (!result.isSuccess) {
                        globalEvents.trigger('showError', result);
                        return;
                    }
                    // Перезагружаем модуль "Мои книги", чтоб увидеть изменения
                    globalEvents.trigger('setModuleData', getDefaultState('mybooks'), 'mybooks');
                    
                    // Выводим сообщение об успешности операции
                    alert('Книга успешно добавлена в раздел "Мои книги".');
                },
                afterError: (result) => {
                    globalEvents.trigger('showError', result);
                }
            }
        );
    }
    
    _onDeleteBook(bookId) {
        
        const {globalEvents} = this.props;
        
        if (!confirm('Вы действительно хотите удалить книгу из раздела "Все книги"?\nКнига будет удалена безвозвратно и ее нельзя будет скачать.')) {
            return;
        }
        
        this.setStats({
            disabled: true
        });
        
        ajaxQuery(
            {
                url: CUL(defaultSettings, urlSettings['deleteBook']) + bookId
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

    _renderAllBooks() {
        
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

        let allBooksUI = [];

        allBooksUI.push(
            <SearchComponent
                key={0}
                searchTerm={searchTerm}
                onSearch={this._onSearch.bind(this)}
                disabled={disabled}
                mode="simple"
            />
        );

        allBooksUI.push(
            <TableComponent
                key={1}
                routerHistory={history}
                isAdmin={userIsAdmin}
                events={this.events}
                items={!collection ? [] : collection}
                showCheckColumn={true}
                totalCount={totalCount}
                controlMode="allbooks"
                onSortChange={this._onSortChange.bind(this)}
                onSendMail={this._onSendMail.bind(this)}
                onDeleteBook={this._onDeleteBook.bind(this)}
                onAddBook={this._onAddBook.bind(this)}
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

        allBooksUI.push(
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

        return allBooksUI;
    }

    render() {

        const {globalLoading} = this.state;

        return (
            <div>
                {globalLoading ? <PreloaderComponent /> : this._renderAllBooks()}
            </div>
        );
    }
};

AllBooksComponent.propTypes = {
    serverData: PropTypes.object.isRequired,
    globalEvents:  PropTypes.object.isRequired,
    localData: PropTypes.any.isRequired
};

export default AllBooksComponent;