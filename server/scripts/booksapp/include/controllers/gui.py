from django.shortcuts import render

def GuiController(BooksSessions, request):
    bookSessions = BooksSessions()
    if bookSessions.checkIfAuthorized(request) == True:
        template = 'main'
    else:
        template = 'login'

    return render(request, 'gui/' + template + '.html', {});