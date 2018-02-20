from django.http import JsonResponse
from booksapp.models import Books, Sites
from django.db import OperationalError
from django.db.models import Q
from math import ceil
from .allbooks import api_allbooks_get_filter, api_allbooks_get_correct_sort_field, api_allbooks_get_size


def api_mybooks_controller(sessions, request):

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

    # Объект ответа
    return_data = dict()

    # Получение объекта постраничной навигации
    pagination_data = api_allbooks_get_pagination(request)
    if pagination_data is False:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})
    return_data['paging'] = pagination_data

    # Получение объекта фильтра
    filter_data = api_allbooks_get_filter(request, pagination_data)
    return_data['filter'] = filter_data

    # Получение списка книг
    collection_data = api_allbooks_get_collection(filter_data, pagination_data)
    if collection_data is False:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})
    return_data['collection'] = collection_data

    # Возврат
    return response({
        'data': return_data,
        'message': None,
        'isSuccess': True
    })


def api_allbooks_get_pagination(request):

    search_term = str(request.GET.get('searchTerm'))

    page = request.GET.get('page')
    page = int(page)

    try:
        books_count = Books.objects.filter(
            Q(book_name__icontains=search_term)
            |
            Q(book_author__icontains=search_term)
            |
            Q(book_genre__icontains=search_term)
            |
            Q(book_short_desc__icontains=search_term)
        ).count()
    except OperationalError:
        return False
    except Books.DoesNotExist:
        return False

    books_count = int(books_count)

    num_of_pages = 1 if books_count < 1 else ceil(books_count/10)

    if page < 1:
        page = 1
    elif page > num_of_pages:
        page = num_of_pages

    return {
        'page': page,
        'pages': num_of_pages,
        'totalCount': books_count
    }


def api_allbooks_get_collection(filter, pagination):

    search_term = filter['searchTerm']

    page = pagination['page']

    sites_list = dict()
    sites_collection = Sites.objects.all()
    for current_site in sites_collection:
        sites_list[int(current_site.site_id)] = {
            'site_name': current_site.site_name,
            'site_url': current_site.site_url
        }

    books_list = []

    limit_value = 10*(page - 1)
    offset_value = 10*page

    sort_preffix = '' if filter['sortType'] == 'ASC' else '-'

    correct_sort_field = api_allbooks_get_correct_sort_field(filter['sortField'])

    try:
        books_collection = Books.objects.filter(
            Q(book_name__icontains=search_term)
            |
            Q(book_author__icontains=search_term)
            |
            Q(book_genre__icontains=search_term)
            |
            Q(book_short_desc__icontains=search_term)
        ).order_by(sort_preffix+correct_sort_field)[limit_value:offset_value]
    except OperationalError:
        return  False
    except Books.DoesNotExist:
        return False

    for current_book in books_collection:

        parent_site_id = int(current_book.parent_site_id)
        parent_site = sites_list[parent_site_id]

        books_list.append({
            'bookId': current_book.book_id,
            'bookName': current_book.book_name,
            'bookAuthor': current_book.book_author,
            'bookGenre': current_book.book_genre,
            'bookShortDesc': current_book.book_short_desc,
            'bookSize': api_allbooks_get_size(current_book.book_size),
            'parentSiteUrl': parent_site['site_url'],
            'parentSiteName': parent_site['site_name']
        })

    return books_list

