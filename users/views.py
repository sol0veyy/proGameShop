from django.shortcuts import render
from core.views import get_user
from core.decorators import is_login

def reg(request):
    args = {}
    
    return render(request, 'pages/reg.html', args)

def login(request):
    return render(request, 'pages/login.html')

@is_login
def profile(request):
    args = {}

    user = get_user(request)
    args['user_info'] = user

    return render(request, 'pages/profile.html', args)