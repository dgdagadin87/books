import json
from collections import namedtuple


# json_decode
def _json_object_hook(d):
    return namedtuple('X', d.keys())(*d.values())


def json2obj(data):
    return json.loads(data, object_hook=_json_object_hook)


class BooksSessions(object):

    @staticmethod
    def check_if_authorized(request):

        # Получаем авторизационую куку
        auth_cookie = request.COOKIES.get('authCookie')

        # Если ее вообще нет
        if auth_cookie is None:
            return False

        # Переводим из json в объект
        parsed_cookie = json2obj(auth_cookie)

        # Если нет ее элементов
        if parsed_cookie.userName is None or parsed_cookie.secretKey is None:
            return False

        # Проверяем секретный ключ на корректность
        # ...

        # Если все нормально
        return True

