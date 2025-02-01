
from django.contrib import admin
from django.urls import path,include
from gestion import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home , name="home"),
    path('register/', views.register , name="register"),
]
