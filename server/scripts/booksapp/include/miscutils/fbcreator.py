import xml.etree.ElementTree as xml


class FbCreator(object):

    def create_fb2(self, config):

        self._add_root_element()
        self._add_description_element()
        self._add_body_element()

        return xml.tostring(self._root, encoding='UTF-8', method='xml')

    def _add_root_element(self):

        self._root = xml.Element('FictionBook')
        self._root.attrib['xmlns'] = 'http://www.gribuser.ru/xml/fictionbook/2.0'
        self._root.attrib['xmlns:l'] = 'http://www.w3.org/1999/xlink'

    def _add_description_element(self):

        description = xml.SubElement(self._root, 'description')
        title_info = xml.SubElement(description, 'title-info')

        genre = xml.SubElement(title_info, 'genre')
        genre.text = 'Тестовый жанр'

        author = xml.SubElement(title_info, 'author')
        first_name = xml.SubElement(author, 'first-name')
        first_name.text = 'Тестовое имя'
        last_name = xml.SubElement(author, 'last-name')
        last_name.text = 'Тестовая фамилия'
        identifier = xml.SubElement(author, 'id')
        identifier.text = '777'

        book_title = xml.SubElement(title_info, 'book-title')
        book_title.text = 'Тестовый тайтл книги'

        annotation = xml.SubElement(title_info, 'annotation')
        annotation_content = xml.SubElement(annotation, 'p')
        annotation_content.text = 'Тестовая аннотация к книге. Приятного прочтения, однако!'

        date = xml.SubElement(title_info, 'date')
        date.attrib['value'] = '2004-01-01'
        date.text = '2004'

        lang = xml.SubElement(title_info, 'lang')
        lang.text = 'ru'

        sequence = xml.SubElement(title_info, 'sequence')
        sequence.attrib['name'] = 'Тестовый сиквенс'
        sequence.attrib['number'] = '14'

        xml.SubElement(description, 'document-info')

        publish_info = xml.SubElement(description, 'publish-info')

        book_name = xml.SubElement(publish_info, 'book-name')
        book_name.text = 'Тестовый текст книги'

        publisher = xml.SubElement(publish_info, 'publisher')
        publisher.text = 'Тестовый publisher книги'

        city = xml.SubElement(publish_info, 'city')
        city.text = 'Тестовый city книги'

        year = xml.SubElement(publish_info, 'year')
        year.text = 'Тестовый year книги'

        isbn = xml.SubElement(publish_info, 'isbn')
        isbn.text = 'Тестовый isbn книги'

        sequence = xml.SubElement(publish_info, 'sequence')
        sequence.attrib['sequence'] = 'Тестовый sequence книги'

    def _add_body_element(self):

        body = xml.SubElement(self._root, 'body')

        title = xml.SubElement(body, 'title')
        title_content = xml.SubElement(title, 'p')
        title_content.text = 'Тестовое заглавие книги'

        section = xml.SubElement(body, 'section')
        section_title = xml.SubElement(section, 'title')
        section_title_content = xml.SubElement(section_title, 'p')
        section_title_content.text = 'Тестовая Глава 1'
        section_content = xml.SubElement(section, 'p')
        section_content.text = 'Тестовое начало и пока завершение книги. Это всего лишь тест! Не читать!!!!!!!'
