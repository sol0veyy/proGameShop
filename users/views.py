from django.shortcuts import render

def reg(request):
    return render(request, 'reg.html')

def login(request):
    return render(request, 'login.html')