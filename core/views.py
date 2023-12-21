from django.shortcuts import render
from django.http import HttpResponse
from .settings import SECRET_KEY
from django.contrib.auth import get_user_model
import jwt
from products.models import Product
from users.models import UserCart

def home(request):
    args = {}

    # pages
    page = int(request.GET.get('page', 1))

    colProducts = 20
    skipProducts = (page - 1) * colProducts
    viewProducts = skipProducts + colProducts

    all_products = Product.objects.all().values()
    products = all_products[skipProducts:viewProducts]

    pages = [page - 1, page]
    is_products = (all_products.count() - skipProducts) - colProducts

    if is_products > 0:
        pages.append(page + 1)
    
    args['pages'] = pages

    # user
    user = get_user(request)
    args['user_info'] = user

    user_carts = UserCart.objects.filter(user=user['user'])
    args['user_carts_count'] = user_carts.count()
    args['user_carts_product'] = user_carts.values_list('product', flat=True)
    
    for product in products:
        product['user_count'] = UserCart.objects.filter(user=user['user'], product=product['id']).count()
        
    args['products'] = products

    return render(request, 'pages/home.html', args)


def get_user(request):
    try:
        token = request.COOKIES['JWT']
        payload = jwt.decode(token, SECRET_KEY, algorithms='HS256')
        
        user = get_user_model().objects.get(username=payload['username'])

        return { 'user': user, 'isAuth': True }
    except Exception as e:
        print('ERROR GET USER', e) 

        return { 'user': None, 'isAuth': False }