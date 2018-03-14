from ...abstract.base_controller import BaseController

from booksapp.models import Sites


def api_addbook_controller(request):

    main_controller = AddBookController('addBook', request, False)
    return main_controller.run()


class AddBookController(BaseController):

    def run(self):
        base_checks = self.base_checks()
        if base_checks is not None:
            return base_checks

        # 0)Получение списка сайтов
        self._get_sites_list()

        # 1)Получение данных пришедших с клиента
        self._get_client_meta_data()

        # 2)Получение данных по запросу из приложения
        self._get_from_app_data()

        # 3)Получение данных по запросу с выбранного сайта
        self._get_from_site_data()

        # 4)Возврат данных
        return self.response_to_client({
            'data': {
                'collection': self._collection,
                'isFoundInMy': self._found_in_app.get('isFoundInMy'),
                'isFoundInAll': self._found_in_app.get('isFoundInAll'),
                'sites': self._sites,
                'filter': self._meta.get('filter'),
                'paging': self._meta.get('paging')
            },
            'message': None,
            'isSuccess': True
        })

    def _get_sites_list(self):

        sites_list = []
        sites_collection = Sites.objects.all()

        for current_site in sites_collection:
            sites_list.append({
                'id': current_site.site_id,
                'name': current_site.site_name,
                'url': current_site.site_url
            })
        self._sites = sites_list

    def _get_client_meta_data(self):

        search_term = str(self._request.GET.get('searchTerm'))
        page = int(self._request.GET.get('page'))
        selected_site_id = int(self._request.GET.get('selectedSiteId'))

        self._meta = {
            'filter': {
                'searchTerm': search_term,
                'page': page,
                'selectedSiteId': selected_site_id
            },
            'paging': {
                'page': 1,
                'pages': 1,
                'totalCount': 0
            }
        }

    def _get_from_app_data(self):
        self._found_in_app = {
            'isFoundInMy': True,
            'isFoundInAll': True,
        }

    def _get_from_site_data(self):
        filter = self._meta.get('filter')
        self._collection = False if filter.get('selectedSiteId') == -1 else []
