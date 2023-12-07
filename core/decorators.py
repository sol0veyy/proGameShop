from .views import get_user
from django.shortcuts import render

def is_login(func):
    def wrapper(request):
        user = get_user(request)

        if user['isAuth']:
            return func(request)
        else:
            return render(request, 'pages/login.html')
        
    return wrapper