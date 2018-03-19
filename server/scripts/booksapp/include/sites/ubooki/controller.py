from lxml import html
import urllib
import requests


class UbookiCollection(object):

    def __init__(self, search_term):
        self._host = 'https://ubooki.ru'
        self._search_term = search_term

    def get_collection(self):

        # Запрос на сайт
        try:
            response = requests.post('https://ubooki.ru/', data={'s': self._search_term})
        except Exception as e:
            print(e)
            return False

        # Начало парсинга
        tree = html.fromstring(response.text)

        # Если ничего не найдено
        not_found = tree.xpath(".//*[@class='entry-content']")
        is_not_found = True if len(not_found) > 0 else False
        if is_not_found:
            return []

        # Получение тегов списка книг
        book_list = tree.xpath(".//a[@class='books-list-link']")
        prepared_list = self._prepare_raw_list(book_list)
        print(prepared_list)

        return prepared_list

    def _prepare_raw_list(self, cell_list):

        prepared_list = []

        count = 0
        item_dict = {}
        for cell in cell_list:
            print(cell)
            if count == 0:
                item_dict['name'] = cell.text
                item_dict['link'] = self._host + '/' + urllib.urldecode(cell.attrib.get('href'))
                item_dict['genre'] = 'Просто жанр'
                count += 1
            elif count == 1:
                item_dict['author'] = cell.text
                prepared_list.append(item_dict)
                count = 0
                item_dict = {}

        return prepared_list
