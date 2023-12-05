from django.shortcuts import render
import requests

def reg(request):
    args = {}
    
    return render(request, 'pages/reg.html', args)

def login(request):
    return render(request, 'pages/login.html')