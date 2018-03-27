from lxml import html
from lxml.html.soupparser import fromstring
from urllib.parse import unquote
from ...miscutils.fbcreator import FbCreator
from ...miscutils.helpers import BooksHelpers
import requests

from ...miscutils.helpers import BooksHelpers


class UbookiCacheBook(object):

    def __init__(self, config):

        self._host = 'https://ubooki.ru'
        self._link = config['link']
        self._author = config['author']
        self._name = config['name']
        self._genre = config['genre']

    def cache_book(self):
        try:
            response = requests.get('http://127.0.0.1:8000/test/gettestbook')
        except Exception as e:
            print(e)
            return False

        config = dict()

        config['author'] = self._author
        config['genre'] = self._genre
        config['bookName'] = self._name
        config['authorId'] = BooksHelpers.get_author_id()
        config['annotation'] = BooksHelpers.get_annotation(self._name, self._author, self._genre)

        # Начало парсинга
        tree = fromstring(response.text)

        # Получение списка секций
        section_list = tree.xpath(".//section")

        sections = list()

        for current_section in section_list:
            section_data = {
                'title': None,
                'content': []
            }
            children = current_section.getchildren()
            for item in children:
                if item.tag == 'h3':
                    title_children = item.getchildren()
                    p_tag = title_children[0]
                    section_data['title'] = p_tag.text
                elif item.tag == 'p':
                    section_data['content'].append(item.text)

            sections.append(section_data)

        config['content'] = sections

        return 777


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

        return prepared_list

    def _prepare_raw_list(self, cell_list):

        prepared_list = []

        count = 0
        item_dict = {}
        for cell in cell_list:
            if count == 0:
                item_dict['name'] = self._get_book_name(cell)
                item_dict['link'] = self._get_book_url(cell)
                item_dict['genre'] = self._get_book_genre(cell)
                count += 1
            elif count == 1:
                item_dict['author'] = cell.text
                prepared_list.append(item_dict)
                count = 0
                item_dict = {}

        return prepared_list

    def _get_book_name(self, cell):
        return cell.text

    def _get_book_url(self, cell):
        book_link = cell.attrib.get('href')
        return self._host + unquote(book_link)

    def _get_book_genre(self, cell):

        book_link = unquote(cell.attrib.get('href'))

        link_items = book_link.split('/')

        correct_items = []
        for item in link_items:
            if not item:
                continue
            else:
                correct_items.append(item)

        if len(correct_items) < 1:
            return 'Нет жанра'

        return BooksHelpers.get_correct_genre(correct_items[0])
