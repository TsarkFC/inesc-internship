from django.shortcuts import render

from django.http import HttpResponse, JsonResponse

def index(request):
    return HttpResponse("Hello, world. You're at the movement analysis index.")

def movement_analysis(request):
    # process request

    return JsonResponse({'test': 123})