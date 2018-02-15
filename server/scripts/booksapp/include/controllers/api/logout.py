from django.http import JsonResponse


def api_logout_controller():

    # Корректный результат
    response = JsonResponse({
        'success': True,
        'message': '',
        'data': []
    })

    # Удаление авторизационной куки
    response.delete_cookie('authCookie')

    return response
