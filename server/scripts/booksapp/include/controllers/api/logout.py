class BooksSessions():

    def checkIfAuthorized(self, request):

        # Получаем авторизационую куку
        authCookie = request.COOKIES.get('authCookie')

        # Если ее вообще нет
        if authCookie == None:
            return False

        # Если нет ее элементов
        if authCookie.userName == None or authCookie.secretKey == None:
            return False

        # Проверяем секретный ключ на корректность
        # ...