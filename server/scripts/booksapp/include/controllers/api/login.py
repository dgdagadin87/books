from django.http import JsonResponse
import hashlib


def api_login_controller(request):

    if request.method != 'POST':
        return JsonResponse({
            'success': False,
            'message': 'Неизвестная ошибка',
            'data': []
        })

    post_values = request.POST
    login_value = post_values.get('login')
    password_value = post_values.get('pass')

    if not login_value or not password_value:
        return JsonResponse({
            'success': False,
            'message': 'Не заполнены логин/пароль',
            'data': []
        })

    encoded_password = password_value.encode('utf-8')
    hashed_object = hashlib.sha1(encoded_password)
    hashed_password = hashed_object.hexdigest()

    if login_value != 'Medved' or hashed_password != '38b83c928065fff501bb2cdf1275faba7ea498cf':
        return JsonResponse({
            'success': False,
            'message': 'Неправильно заполнены логин/пароль',
            'data': []
        })

    return JsonResponse({
        'success': True,
        'message': '',
        'data': []
    })
