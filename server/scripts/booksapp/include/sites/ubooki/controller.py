import requests
from urllib.parse import unquote
from lxml.html.soupparser import fromstring
from ...miscutils.fbcreator import FbCreator
from ...miscutils.helpers import BooksHelpers
from booksapp.models import Cached_books
from bs4 import BeautifulSoup


class UbookiCacheBook(object):

    def __init__(self, config):

        self._host = 'https://ubooki.ru'
        self._link = config['link']
        self._author = config['author']
        self._name = config['name']
        self._genre = config['genre']

    def cache_book(self):
        try:
            # response = requests.get('http://127.0.0.1:8000/test/gettestbook')
            response = requests.get(self._link)
        except Exception as e:
            print(e)
            return False

        config = dict()

        config['author'] = self._author
        config['genre'] = self._genre
        config['bookTitle'] = self._name
        config['authorId'] = BooksHelpers.get_author_id()
        config['annotation'] = BooksHelpers.get_annotation(self._name, self._author, self._genre)

        soup = BeautifulSoup(response.text)
        lines = soup.find('div', {'class','entry-content'})

        sections = list()

        section_data = {
            'title': None,
            'content': []
        }
        counter = 0
        section_counter = 1

        for current_paragraph in lines.findAll('p'):

            if counter == 50:
                sections.append(section_data)

                section_data = {
                    'title': None,
                    'content': []
                }

                counter = 0
                section_counter += 1

            if counter == 0:
                str_section_number = str(section_counter)
                section_data['title'] = 'Глава ' + str_section_number

            section_data['content'].append(current_paragraph.text)

            counter += 1

        if len(section_data['content']) > 0:
            sections.append(section_data)

        config['content'] = sections

        fb_creator = FbCreator()
        encoded_xml_file = str(fb_creator.create_fb2(config), 'utf-8')

        book_for_adding = Cached_books(book_link=self._link, book_content=encoded_xml_file)
        try:
            book_for_adding.save()
            latest_cached = Cached_books.objects.latest('cached_book_id')
            return latest_cached.cached_book_id
        except Exception as e:
            print (e)
            return False


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
        tree = fromstring(response.text)

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
        if book_link[0] != '/':
            book_link = '/' + book_link
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
