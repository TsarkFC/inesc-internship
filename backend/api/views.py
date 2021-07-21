from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

def index(request):
    return HttpResponse("Hello, world. You're at the movement analysis index.")

@csrf_exempt
def movement_analysis(request):
    # process request

    return JsonResponse({'test': 123})