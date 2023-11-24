from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def item(request):
    return render(request, 'item.html')