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

        this.state = {
            moduleData: localData,
            disabled: false,
            globalLoading: false
        };

        globalEvents.trigger('setTitle', 'Мои книги');
    }

    componentDidMount() {
        super.componentDidMount();

        let {moduleData} = this.state;
        
        if (!moduleData.data) {
            this._loadData();
        }
    }

    _loadData() {
        
        const {moduleData} = this.state;
        const {globalEvents} = this.props;

        let firstStateData = null;
        
        if (!moduleData.data) {
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
        
        ajaxQuery(
            {
                url: CUL(defaultSettings, urlSettings['getMyBooksData'])
            },
            {
                afterSuccess: (result) => {
                    if (!result.isSuccess) {
                        this.setStats({
                            globalLoading: false,
                            dsabled: false
                        });
                        globalEvents.trigger('showError', result);
                        return;
                    }
                    
                    this.setStats({
                        globalLoading: false,
                        dsabled: false,
                        moduleData: result
                    });
                    
                    globalEvents.trigger('setModuleData', result, 'mybooks');
                },
                afterError: (result) => globalEvents.trigger('showError', result)
            }
        );
    }

    componentWillReceiveProps() {}

    _renderMyBooks() {
        
        const {disabled, moduleData} = this.state;
        const {collection = [], paging = {}} = moduleData;
        const {totalCount = 0} = paging;
        
        let myBooksUI = [];

        myBooksUI.push(
            <TableComponent
                events={this.events}
                items={collection}
                showCheckColumn={true}
                totalCount={parseInt(totalCount)}
                loadData={this._loadData.bind(this)}
                defaultSort="bookName"
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
                        type: 'click',
                        symbolsToShow: 30
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
                        sortable: true,
                        type: 'usual'
                    },
                    {
                        name: 'bookSize',
                        title: 'Размер',
                        sortable: true,
                        type: 'numeric'
                    },
                    {
                        name: 'bookParentSite',
                        title: 'С сайта',
                        sortable: true,
                        type: 'link',
                        linkData: {
                            url: 'parentSiteUrl',
                            caption: 'parentSiteName'
                        }
                    }
                ]}
            />
        );
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