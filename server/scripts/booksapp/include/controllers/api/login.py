from django.http import JsonResponse


def api_login_controller(books_sessions, request):

    login_response = {
        'success': False,
        'message': 'Не заполнен логин/пароль',
        'data': []
    }

    return JsonResponse(login_response)