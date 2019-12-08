from django.conf.urls import url

from . import views, ajax

app_name = 'game'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<episode>[0-9]+)/$', views.detail, name='detail'),
    url(r'^ajax/$', ajax.getEpisodesFromDatabase),
]
