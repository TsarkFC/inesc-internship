from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    url(r'^process/$', views.movement_analysis, name='movement_analysis')
]