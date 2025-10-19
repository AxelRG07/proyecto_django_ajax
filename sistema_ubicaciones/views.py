from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest
from .models import Estado, Municipio

def index(request):
    return render(request, 'index.html')


def estados(request):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    if is_ajax:
        if request.method == "GET":
            estados = list(Estado.objects.all().values())
            return JsonResponse({'context':estados})
    else: return HttpResponseBadRequest('Invalid Request')