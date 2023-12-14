from django.shortcuts import render
from core.views import get_user
from core.decorators import is_login
from users.models import UserCart

@is_login
def profile(request):
    args = {}

    user = get_user(request)
    args['user_info'] = user

    user_carts_count = UserCart.objects.filter(user=user['user']).count()
    args['user_carts_count'] = user_carts_count

    return render(request, 'pages/profile.html', args)