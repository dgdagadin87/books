from django.shortcuts import render


def central_controller(books_sessions, request):

    if books_sessions.check_if_authorized(request):
        template = 'main'
    else:
        template = 'login'

    return render(request, 'central/' + template + '.html', {})
