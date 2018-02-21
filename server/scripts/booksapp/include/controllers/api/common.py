from django.http import JsonResponse


def api_common_controller(sessions, request):

    # Ответ
    response = JsonResponse

    # Пользователь
    user_dict = sessions.check_if_authorized(request, True)

    # Если ошибка в БД
    user_error = user_dict['user_error']
    if user_error is True:
        return response({
            'success': False,
            'message': 'Произошла непредвиденная ошибка'
        })

    user_info = user_dict['user']

    # Если не авторизованы
    if user_info is False:
        return response({
            'success': False,
            'message': 'Неизвестная ошибка',
            'data': {
                'errorCode': 'NOT_AUTH'
            }
        })

    # объект возврата
    return_object = {
        'data': {
            'user': {
                'userId': user_info.user_id,
                'userLogin': user_info.user_login,
                'userName': user_info.user_name,
                'userIsAdmin': True if user_info.user_is_admin == 'yes' else False
            },
            'title': api_common_get_title(),
            'headers': api_common_get_headers(user_info)
        }
    }

    # Возврат
    return response(return_object)


def api_common_get_headers(user_info):

    headers_list = list()

    headers_list.append({
        'headerId': 1,
        'headerName': 'Мои книги',
        'headerUrl': '/',
        'selected': False,
        'outer': False,
        'admin': False
    })

    headers_list.append({
        'headerId': 2,
        'headerName': 'Все книги',
        'headerUrl': '/allbooks',
        'selected': False,
        'outer': False,
        'admin': False
    })

    headers_list.append({
        'headerId': 3,
        'headerName': 'Добавить книгу',
        'headerUrl': '/addbook',
        'selected': False,
        'outer': False,
        'admin': False
    })

    if user_info.user_is_admin == 'yes':
        headers_list.append({
            'headerId': 5,
            'headerName': 'Пользователи',
            'headerUrl': '/users',
            'selected': False,
            'outer': False,
            'admin': True
        })

    headers_list.append({
        'headerId': 5,
        'headerName': 'О программе',
        'headerUrl': '/about',
        'selected': False,
        'outer': False,
        'admin': False
    })

    return headers_list


def api_common_get_title():
    return 'Приложение "Книги" - начало'