from django.views.decorators.csrf import csrf_exempt
from .include.miscutils.sessions import BooksSessions
from .include.miscutils.helpers import BooksHelpers
from .include.controllers.gui.central import gui_central_controller
from .include.controllers.api.login import api_login_controller
from .include.controllers.api.logout import api_logout_controller
from .include.controllers.api.common import api_common_controller
from .include.controllers.api.allbooks import api_allbooks_controller
from .include.controllers.api.users import api_users_controller


def gui_central(request, url=''):
    return gui_central_controller(BooksSessions, request)


@csrf_exempt
def api_login(request):
    return api_login_controller(request, BooksHelpers)


@csrf_exempt
def api_logout(request):
    return api_logout_controller()


@csrf_exempt
def api_common(request):
    return api_common_controller(BooksSessions, request)


@csrf_exempt
def api_allbooks(request):
    return api_allbooks_controller(BooksSessions, request)

@csrf_exempt
def api_users(request):
    return api_users_controller(BooksSessions, request)
