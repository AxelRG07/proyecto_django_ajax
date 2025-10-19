from django.contrib import admin
from .models import Estado, Municipio

# Register your models here.
admin.site.register(Municipio)
admin.site.register(Estado)