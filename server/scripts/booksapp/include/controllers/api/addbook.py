from ...abstract.base_controller import BaseController


def api_addbook_controller(request):

    main_controller = AddBookController('addBook', request, False)
    return main_controller.run()


class AddBookController(BaseController):

    def run(self):
        base_checks = self.base_checks()
        if base_checks is not None:
            return base_checks

        return self.response_to_client({
            'data': {
                'collection': False,
                'isFoundInMy': False,
                'isFoundInAll': False,
                'sites': [
                    {
                        'id': 1,
                        'name': "knijki.ru",
                        'url': "http://knijki.ru"
                    }
                ],
                'filter': {
                    'page': 1,
                    'searchTerm': "",
                    'selectedSiteId': -1
                },
                'paging': {
                    'page': 1,
                    'pages': 1,
                    'totalCount': 0
                }
            },
            'message': None,
            'isSuccess': True
        })
