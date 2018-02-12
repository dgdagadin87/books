import os
import sys
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '/' + 'include'))
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '/' + 'include/controllers'))

from sessions import BooksSessions
from gui import GuiController

def gui(request):
	return GuiController(BooksSessions, request)
