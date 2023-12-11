from django.shortcuts import render
from django.http import HttpResponse
from .settings import SECRET_KEY
from django.contrib.auth import get_user_model
import jwt
from products.models import Product
from users.models import UserCart

def home(request):
    args = {}

    user = get_user(request)
    args['user_info'] = user

    products = Product.objects.all()

    user_carts = UserCart.objects.filter(user=user['user'])
    args['user_carts_count'] = user_carts.count()
    args['user_carts_product'] = user_carts.values_list('product', flat=True)
    
    user_products_count = []
    for product in products:
        user_products_count.append(product.product_user_carts(user['user']))

    args['products'] = list(zip(products, user_products_count))

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