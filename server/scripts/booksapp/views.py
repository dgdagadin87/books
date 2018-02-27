from django.views.decorators.csrf import csrf_exempt
from .include.miscutils.sessions import BooksSessions
from .include.miscutils.helpers import BooksHelpers
from .include.controllers.gui.central import gui_central_controller
from .include.controllers.api.login import api_login_controller
from .include.controllers.api.logout import api_logout_controller
from .include.controllers.api.common import api_common_controller
from .include.controllers.api.allbooks import api_allbooks_controller
from .include.controllers.api.mybooks import api_mybooks_controller
from .include.controllers.api.users import api_users_controller
from .include.controllers.api.addtomybooks import api_addtomybooks_controller
from .include.controllers.api.deletemybook import api_deletemybook_controller
from .include.controllers.api.deletebook import api_deletebook_controller
from .include.controllers.api.downloadbook import api_downloadbook_controller
from .include.controllers.api.adduser import api_adduser_controller
from .include.controllers.api.getuser import api_getuser_controller


def gui_central(request, url='', id=None):
    return gui_central_controller(BooksSessions, request)


@csrf_exempt
def api_login(request):
    return api_login_controller(request, BooksHelpers)


@csrf_exempt
def api_logout(request):
    return api_logout_controller()


@csrf_exempt
def api_common(request):
    return api_common_controller(BooksHelpers, BooksSessions, request)


@csrf_exempt
def api_allbooks(request):
    return api_allbooks_controller(BooksHelpers, BooksSessions, request)


@csrf_exempt
def api_mybooks(request):
    return api_mybooks_controller(BooksHelpers, BooksSessions, request)


@csrf_exempt
def api_users(request):
    return api_users_controller(BooksHelpers, BooksSessions, request)


@csrf_exempt
def api_addtomybooks(request, id):
    return api_addtomybooks_controller(BooksHelpers, BooksSessions, request, id)


@csrf_exempt
def api_adduser(request):
    return api_adduser_controller(BooksHelpers, BooksSessions, request)


@csrf_exempt
def api_getuser(request, id):
    return api_getuser_controller(BooksHelpers, BooksSessions, request, id)


@csrf_exempt
def api_deletemybook(request, id):
    return api_deletemybook_controller(BooksHelpers, BooksSessions, request, id)


@csrf_exempt
def api_deletebook(request, id):
    return api_deletebook_controller(BooksHelpers, BooksSessions, request, id)


@csrf_exempt
def api_downloadbook(request, id):
    return api_downloadbook_controller(BooksHelpers, BooksSessions, request, id)
