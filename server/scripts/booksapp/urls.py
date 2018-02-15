from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.gui_central, name='gui_central'),
	url(r'^api/login$', views.api_login, name='api_login'),
	url(r'^api/logout$', views.api_logout, name='api_logout')
]