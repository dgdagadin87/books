from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.gui_central, name='gui_central'),
	url(r'^(allbooks|addbook|users|about)$', views.gui_central, name='gui_central'),

	url(r'^api/login$', views.api_login, name='api_login'),
	url(r'^api/logout$', views.api_logout, name='api_logout'),
	url(r'^api/common', views.api_common, name='api_common'),
	url(r'^api/allbooks', views.api_allbooks, name='api_allbooks'),
]