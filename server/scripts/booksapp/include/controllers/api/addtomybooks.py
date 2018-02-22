from django.http import JsonResponse


def api_addtomybooks_controller(sessions, request, book_id):

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

    # Если не авторизованы
    user_info = user_dict['user']
    if user_info is False:
        return response({
            'success': False,
            'message': 'Неизвестная ошибка',
            'data': {
                'errorCode': 'NOT_AUTH'
            }
        })

    # Объект ответа
    return_data = dict()

    # Возврат
    return response({
        'data': return_data,
        'message': None,
        'isSuccess': True
    })
