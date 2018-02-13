from .include.miscutils.sessions import BooksSessions
from .include.controllers.gui.central import gui_central_controller
from .include.controllers.api.login import api_login_controller


def gui_central(request):
    return gui_central_controller(BooksSessions, request)


def api_login(request):
    return api_login_controller(BooksSessions, request)
