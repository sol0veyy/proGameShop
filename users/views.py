from django.shortcuts import render
from core.views import get_user
from core.decorators import is_login
from users.models import UserCart
from products.models import Product

@is_login
def profile(request):
    args = {}

    user = get_user(request)
    args['user_info'] = user

    user_carts_count = UserCart.objects.filter(user=user['user']).count()
    args['user_carts_count'] = user_carts_count

    return render(request, 'pages/profile.html', args)


@is_login
def cart(request):
    args = {}

    user = get_user(request)
    args['user_info'] = user

    user_cart = UserCart.objects.filter(user=user['user'])
    user_carts_count = user_cart.count()
    args['user_carts_count'] = user_carts_count

    user_cart_products = Product.objects.filter(id__in=user_cart.values_list('product', flat=True)).values()

    for product in user_cart_products:
        product['user_count'] = UserCart.objects.filter(user=user['user'], product=product['id']).count()

        product_price = int(product['price'].replace(' ', ''))
        user_price = product['user_count'] * product_price
        formatted_price = '{:,}'.format(user_price).replace(',', ' ')

        product['user_price'] = formatted_price


    args['user_cart_products'] = user_cart_products

    return render(request, 'pages/cart.html', args)