import json

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

        elif request.method == "POST":
            data = json.loads(request.body)
            estado = Estado.objects.create(nombre=data.get("nombre"))
            return JsonResponse({"id": estado.id, "nombre": estado.nombre})
        return HttpResponseBadRequest({'status': 'Invalid Request'}, status=400)

    else: return HttpResponseBadRequest('Invalid Request')

def municipios(request, estado_id):
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    if is_ajax:
        if request.method == "GET":
            municipios = list(Municipio.objects.filter(estado_id=estado_id).values())
            return JsonResponse({'context':municipios})

    else: return HttpResponseBadRequest('Invalid Request')
