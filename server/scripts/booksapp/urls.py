from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.gui_central, name='gui_central'),
	url(r'^(allbooks|addbook|users|about)$', views.gui_central, name='gui_central'),
	url(r'^(users/adduser)$', views.gui_central, name='gui_central'),

	url(r'^api/login$', views.api_login, name='api_login'),
	url(r'^api/logout$', views.api_logout, name='api_logout'),
	url(r'^api/common$', views.api_common, name='api_common'),
	url(r'^api/allbooks$', views.api_allbooks, name='api_allbooks'),
	url(r'^api/mybooks$', views.api_mybooks, name='api_mybooks'),
	url(r'^api/users$', views.api_users, name='api_users'),
	url(r'^api/deletemybook/(?P<id>\d+)$', views.api_deletemybook, name='api_deletemybook'),
	url(r'^api/adduser$', views.api_adduser, name='api_adduser'),
	url(r'^api/addtomybooks/(?P<id>\d+)$', views.api_addtomybooks, name='api_addtomybooks'),
]