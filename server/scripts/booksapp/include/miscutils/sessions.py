from .helpers import BooksHelpers
from booksapp.models import Users


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
        cookie_user_name = parsed_cookie.userName
        cookie_secret_key = parsed_cookie.secretKey

        # Если нет ее элементов
        if cookie_user_name is None or cookie_secret_key is None:
            return False

        # Проверяем секретный ключ на корректность
        try:
            user = Users.objects.get(user_login=cookie_user_name, user_secret_key=cookie_secret_key)
        except Users.DoesNotExist:
            user = False

        if user is False:
            return False

        # Если все нормально
        return True

