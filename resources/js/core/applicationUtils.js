export function getDefaultState(moduleName) {
    switch (moduleName) {
        default:
        case 'mybooks':
            return {
                collection: false,
                filter: {
                    sortField: 'bookName',
                    sortType: 'ASC',
                    page: 1,
                    searchTerm: ''
                },
                paging: {
                    page: 1,
                    pages: 1,
                    totalCount: 0
                }
            };
            
        case 'allbooks':
            return {
                collection: false,
                filter: {
                    sortField: 'bookName',
                    sortType: 'ASC',
                    page: 1,
                    searchTerm: ''
                },
                paging: {
                    page: 1,
                    pages: 1,
                    totalCount: 0
                }
            };
            
        case 'users':
            return {
                collection: false,
                filter: {
                    sortField: 'userName',
                    sortType: 'ASC',
                    page: 1
                },
                paging: {
                    page: 1,
                    pages: 1,
                    totalCount: 0
                }
            };
            
        case 'addbook':
            return {
                isLoaded: false,
                collection: false,
                sites: false,
                isFoundInMy: false,
                isFoundInAll: false,
                filter: {
                    page: 1,
                    searchTerm: '',
                    selectedSiteId: -1
                },
                paging: {
                    page: 1,
                    pages: 1,
                    totalCount: 0
                }
            };
    }
};