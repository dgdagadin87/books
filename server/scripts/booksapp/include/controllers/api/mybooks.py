from django.http import JsonResponse
from booksapp.models import Books, Sites
from django.db import OperationalError
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
    pagination_data = api_mybooks_get_pagination(request, user_info)
    if pagination_data is False:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})
    return_data['paging'] = pagination_data

    # Получение объекта фильтра
    filter_data = api_allbooks_get_filter(request, pagination_data)
    return_data['filter'] = filter_data

    # Получение списка книг
    collection_data = api_mybooks_get_collection(filter_data, pagination_data, user_info)
    if collection_data is False:
        return response({'success': False, 'message': 'Произошла непредвиденная ошибка'})
    return_data['collection'] = collection_data

    # Возврат
    return response({
        'data': return_data,
        'message': None,
        'isSuccess': True
    })


def api_mybooks_get_pagination(request, user_info):

    search_term = str(request.GET.get('searchTerm'))

    page = request.GET.get('page')
    page = int(page)

    sql_dict = api_mybooks_get_count_sql(user_info, search_term)

    try:
        books_count_raw = Books.objects.raw(sql_dict['sql'], sql_dict['params'])
    except OperationalError:
        return False
    except Books.DoesNotExist:
        return False

    books_count = books_count_raw[0]
    books_count = books_count.book_id
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


def api_mybooks_get_collection(filter, pagination, user_info):

    sites_list = dict()
    sites_collection = Sites.objects.all()
    for current_site in sites_collection:
        sites_list[int(current_site.site_id)] = {
            'site_name': current_site.site_name,
            'site_url': current_site.site_url
        }

    books_list = []

    sql_dict = api_mybooks_get_collection_sql(user_info, filter, pagination)

    try:
        books_collection = Books.objects.raw(sql_dict['sql'], sql_dict['params'])
    except OperationalError:
        return False
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


def api_mybooks_get_count_sql(user_info, search_term):

    sql_string = 'SELECT COUNT(DISTINCT booksapp_books.book_id) AS book_id from booksapp_books LEFT JOIN booksapp_books_2_users ON booksapp_books.book_id = booksapp_books_2_users.book_id WHERE booksapp_books_2_users.user_id = %(userId)s'
    sql_params = {'userId': int(user_info.user_id)}

    if search_term != '':
        sql_string += api_mybooks_get_condition()
        sql_params['searchTerm'] = '%' + search_term + '%'

    return {
        'sql': sql_string,
        'params': sql_params
    }


def api_mybooks_get_collection_sql(user_info, filter, pagination):

    page = pagination['page']
    limit_value = int(10 * (page - 1))
    offset_value = int(10)

    search_term = str(filter['searchTerm'])

    sort_type = 'ASC' if filter['sortType'] == 'ASC' else 'DESC'

    correct_sort_field = api_allbooks_get_correct_sort_field(filter['sortField'])

    sql_string = 'SELECT DISTINCT booksapp_books.* from booksapp_books LEFT JOIN booksapp_books_2_users ON booksapp_books.book_id = booksapp_books_2_users.book_id WHERE booksapp_books_2_users.user_id = %(userId)s'
    sql_params = {'userId': int(user_info.user_id)}

    if search_term != '':
        sql_string += api_mybooks_get_condition()
        sql_params['searchTerm'] = '%' + search_term + '%'

    sql_string += ' ORDER BY %(orderField)s %(orderType)s LIMIT %(limitValue)s, %(offsetValue)s'
    sql_params['orderField'] = correct_sort_field
    sql_params['orderType'] = sort_type
    sql_params['limitValue'] = limit_value
    sql_params['offsetValue'] = offset_value

    return {
        'sql': sql_string,
        'params': sql_params
    }


def api_mybooks_get_condition():

    sql_string = ''
    sql_string += ' AND (booksapp_books.book_name LIKE %(searchTerm)s'
    sql_string += ' OR booksapp_books.book_author LIKE %(searchTerm)s'
    sql_string += ' OR booksapp_books.book_genre LIKE %(searchTerm)s'
    sql_string += ' OR booksapp_books.book_short_desc LIKE %(searchTerm)s)'
    return sql_string
