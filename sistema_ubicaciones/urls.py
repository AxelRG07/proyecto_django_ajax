from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('estados/', views.estados, name='estados'),
    path('municipios/<int:estado_id>/', views.municipios, name='municipios'),
]
