import React from 'react';

import PropTypes from 'prop-types';

import BaseModule from '../../base/BaseModule.jsx';

import {ajaxQuery, createUrlLink as CUL} from '../../core/coreUtils';
import {defaultSettings, urlSettings, pageSettings} from '../../config/settings';

import NoAccessModule from '../components/NoAccessComponent.jsx';
import PreloaderComponent from '../components/LargePreloaderComponent.jsx';
import TableComponent from '../components/TableComponent.jsx';
import PagingComponent from '../components/PagingComponent.jsx';

class UsersComponent extends BaseModule {

    constructor(props) {
        super(props);
        
        const {globalEvents, localData} = this.props;
        
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

        globalEvents.trigger('setTitle', 'Пользователи');
    }

    componentWillReceiveProps() {}

    componentDidMount() {
        super.componentDidMount();

        let {collection} = this.state;

        if (collection === false) {
            this.setStats({
                globalLoading: true
            }, this._loadData.bind(this));
        }
    }

    _onSortChange(sortData) {

        this.setStats(sortData, this._loadData.bind(this));
    }
    
    _onPageChange(pageData) {
        
        this.setStats(pageData, this._loadData.bind(this));
    }
    
    _onDeleteUser(userId) {
        
        const {globalEvents} = this.props;
        
        if (!confirm('Вы действительно хотите удалить выбранного пользователя?\nПользователь и его книги будут удалены безвозвратно!')) {
            return;
        }
        
        this.setStats({
            disabled: true
        });
        
        ajaxQuery(
            {
                url: CUL(defaultSettings, urlSettings['deleteUser']) + userId
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
                    alert('Пользователь успешно удален.');
                    this._loadData();
                },
                afterError: (result) => {
                    globalEvents.trigger('showError', result);
                }
            }
        );
    }

    _getStateData(data) {
        
        const {collection, filter, paging} = data;
        
        return {
            collection: collection,
            sortField: filter.sortField,
            sortType: filter.sortType,
            page: paging.page,
            pages: paging.pages,
            totalCount: paging.totalCount
        };
    }

    _loadData() {
        
        const {collection, sortField, sortType, page} = this.state;
        const {globalEvents} = this.props;

        if (collection !== false) {
            this.setStats({
                disabled: true
            });
        }
        

        let queryData = {
            sortField,
            sortType,
            page
        };
        
        ajaxQuery(
            {
                url: CUL(defaultSettings, urlSettings['getUsersData']),
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

                    this.mounted && globalEvents.trigger('setModuleData', result.data, 'users');
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

    _renderUsers() {

        const {history} = this.props;

        const {
            disabled,
            collection = [],
            sortField,
            sortType,
            page,
            pages,
            totalCount,
            globalLoading
        } = this.state;

        let usersArray = [];

        usersArray.push(
            <TableComponent
                key={1}
                routerHistory={history}
                events={this.events}
                items={!collection ? [] : collection}
                showCheckColumn={false}
                totalCount={totalCount}
                controlMode="users"
                onSortChange={this._onSortChange.bind(this)}
                onDeleteUser={this._onDeleteUser.bind(this)}
                sortField={sortField}
                sortType={sortType}
                disabled={disabled}
                columns={[
                    {
                        name: 'userName',
                        title: 'Имя пользователя',
                        sortable: true,
                        type: 'usual'
                    },
                    {
                        name: 'userLogin',
                        title: 'Логин для входа',
                        sortable: true,
                        type: 'usual'
                    },
                    {
                        name: 'userIsAdmin',
                        title: 'Администратор',
                        sortable: false,
                        type: 'bool'
                    }
                ]}
            />
        );

        usersArray.push(
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
        
        return (
            <div>
                {globalLoading ? <PreloaderComponent /> : usersArray}
            </div>
        );
    }

    _renderNoAccess() {
        
        return (<NoAccessModule />);
    }

    render() {

        const {serverData} = this.props;
        const {user} = serverData;

        return (
            <div>
                {user.userIsAdmin ? this._renderUsers() : this._renderNoAccess()}
            </div>
        );
    }
};

UsersComponent.propTypes = {
    serverData: PropTypes.object.isRequired,
    globalEvents:  PropTypes.object.isRequired,
    localData: PropTypes.any.isRequired
};

export default UsersComponent;