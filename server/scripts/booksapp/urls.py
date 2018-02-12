from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^$', views.central, name='central'),
	#url(r'api/login^$', views.login, name='login'),
	#url(r'api/logout^$', views.logout, name='logout')
]