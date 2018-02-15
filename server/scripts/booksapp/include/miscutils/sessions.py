from .helpers import BooksHelpers


class BooksSessions(object):

    @staticmethod
    def check_if_authorized(request):

        # Получаем авторизационую куку
        auth_cookie = request.COOKIES.get('authCookie')

        # Если ее вообще нет
        if auth_cookie is None:
            return False

        # Переводим из json в объект
        parsed_cookie = BooksHelpers.json2object(auth_cookie)

        # Если нет ее элементов
        if parsed_cookie.userName is None or parsed_cookie.secretKey is None:
            return False

        # Проверяем секретный ключ на корректность
        # ...

        # Если все нормально
        return True

