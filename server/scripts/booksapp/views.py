from .include.miscutils.sessions import BooksSessions
from .include.controllers.central import central_controller


def central(request):
    return central_controller(BooksSessions, request)
