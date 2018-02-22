from django.http import JsonResponse
from booksapp.models import Books_2_users, Books


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

    # Проверка, существует ли пользователь
    # Не нужно, т.к. выше это уже проверяется

    # Проверка, существует ли книга, которую собираемся добавлять
    try:
        book_to_add = Books.objects.get(book_id=book_id)
    except Books.DoesNotExist:
        return response({'success': False, 'message': 'Выбранной книги не существует'})
    except Exception:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})

    book_to_add_id = int(book_to_add.book_id)

    # Проверка, существует ли кнмга в разделе "Мои книги"
    try:
        book_count = Books_2_users.objects.filter(book_id=book_to_add_id).filter(user_id=user_info.user_id).count()
        books_count = int(book_count)
    except Exception:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})

    if books_count > 0:
        return response({'success': False, 'message': 'Выбранная книга уже находится в разделе "Мои книги"'})

    # Если все нормально, добавляем книгу
    book_for_adding = Books_2_users(book_id=book_to_add_id, user_id=user_info.user_id)
    try:
        book_for_adding.save()
    except Exception:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})

    # Возврат, если все нормально
    return response({
        'data': dict(),
        'message': None,
        'isSuccess': True
    })
