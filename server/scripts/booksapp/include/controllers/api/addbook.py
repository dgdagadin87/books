from django.http import JsonResponse


def api_addbook_controller(helpers, sessions, request):

    # Ответ
    response = JsonResponse

    # Пользователь
    user_dict = sessions.check_if_authorized(request, True)

    # Базовые проверки
    base_checks = helpers.base_auth_checks(user_dict, response)
    if base_checks is not None:
        return base_checks

    # Возврат
    return response({
        'data': {
            'collection': False,
            'isFoundInMy': False,
            'isFoundInAll': False,
            'sites': [
                {
                    'id': 1,
                    'name': 'knijki.ru',
                    'url': 'http://knijki.ru'
                }
            ],
            'filter': {
                'page': 1,
                'searchTerm': '',
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
