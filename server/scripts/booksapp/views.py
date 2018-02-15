from django.views.decorators.csrf import csrf_exempt
from .include.miscutils.sessions import BooksSessions
from .include.miscutils.helpers import BooksHelpers
from .include.controllers.gui.central import gui_central_controller
from .include.controllers.api.login import api_login_controller
from .include.controllers.api.logout import api_logout_controller


def gui_central(request):
    return gui_central_controller(BooksSessions, request)


@csrf_exempt
def api_login(request):
    return api_login_controller(request, BooksHelpers)


@csrf_exempt
def api_logout(request):
    return api_logout_controller()
