from django.http import JsonResponse
from booksapp.models import Books, Books_2_users, Cached_books
from django.db import IntegrityError, transaction


def api_deletebook_controller(helpers, sessions, request, book_id):

    # Ответ
    response = JsonResponse

    # Пользователь
    user_dict = sessions.check_if_authorized(request, True)

    # Базовые проверки
    base_checks = helpers.base_auth_checks(user_dict, response, True)
    if base_checks is not None:
        return base_checks

    # Удаляем книгу отовсюду
    try:
        with transaction.atomic():
            Books_2_users.objects.filter(book_id=int(book_id)).delete()
            Cached_books.objects.filter(cached_book_id=int(book_id)).delete()
            Books.objects.filter(book_id=int(book_id)).delete()
    except IntegrityError:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка (при удалении книги)'})

    # Возврат, если все нормально
    return response({
        'data': dict(),
        'message': None,
        'isSuccess': True
    })
