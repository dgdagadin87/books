from ...abstract.base_controller import BaseController
from ...miscutils.fbcreator import FbCreator


def api_downloadrawbook_controller(request, id):

    main_controller = DownloadRawBookController('downloadRawBook', request, False)
    return main_controller.run(id)


class DownloadRawBookController(BaseController):

    def run(self, id):
        base_checks = self.base_checks()
        if base_checks is not None:
            return self.response_to_client(base_checks)

        fb_creator = FbCreator()

        # Присваиваем http-ответу необходимые заголовки
        http_response = self._http_response(fb_creator.create_fb2({}), content_type='application/octet-stream; charset=utf-8')
        http_response['Content-Disposition'] = 'attachment; filename="Nesting.fb2"'

        # Возврат, если все нормально
        return http_response