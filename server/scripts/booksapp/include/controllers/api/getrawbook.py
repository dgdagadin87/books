from booksapp.models import Cached_books
from ...abstract.base_controller import BaseController
from ...sites.ubooki.controller import UbookiCacheBook


def api_getrawbook_controller(request):

    main_controller = GetRawBookController('getRawBook', request, False)
    return main_controller.run()


class GetRawBookController(BaseController):

    def run(self):
        base_checks = self.base_checks()
        if base_checks is not None:
            return self.response_to_client(base_checks)

        # 0) Если метод не POST
        if self._request.method != 'POST':
            return self.standart_error()

        # 1)Данные из POST
        book_link = str(self._request.POST.get('bookLink'))

        # 1) Проверяем, есть ли закэшированная книга с такой ссылкой
        try:
            cached_book_object = Cached_books.objects.get(book_link=book_link)
            return self._return_data(cached_book_object.book_id)
        except Cached_books.DoesNotExist:
            controller = UbookiCacheBook(book_link)
            return self._return_data(controller.cache_book())
        except Exception:
            return self.standart_error()

    def _return_data(self, book_id):
        return self.response_to_client({
            'data': {
                'bookId': book_id
            },
            'message': None,
            'isSuccess': True
        })