class BooksSessions(object):

    @staticmethod
    def check_if_authorized(request):

        # Получаем авторизационую куку
        auth_cookie = request.COOKIES.get('authCookie')

        # Если ее вообще нет
        if auth_cookie is None:
            return False

        # Если нет ее элементов
        if auth_cookie.userName is None or auth_cookie.secretKey is None:
            return False

        # Проверяем секретный ключ на корректность
        # ...

        # Если все нормально
        return True

