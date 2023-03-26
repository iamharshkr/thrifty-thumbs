from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('available/', views.available, name="available"),
    path('scrape/<str:pk>', views.scrapper, name="scrapper")
]
