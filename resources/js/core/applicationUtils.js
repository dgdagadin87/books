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
    }
};