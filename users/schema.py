import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from .models import UserCart
from products.models import Product
from graphql_jwt import ObtainJSONWebToken

class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()

class ProductType(DjangoObjectType):
    class Meta:
        model = Product

class UserCartType(DjangoObjectType):
    class Meta:
        model = UserCart


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = get_user_model()(
            username = username,
            email = email
        )
        user.set_password(password)
        user.save()

        ObtainJSONWebToken.mutate(self, info, username=username, password=password)

        return CreateUser(user=user)

class CreateUserCart(graphene.Mutation):
    user_cart = graphene.Field(UserCartType)

    class Arguments:
        product_id = graphene.ID()

    def mutate(self, info, product_id):
        user = info.context.user

        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided.')

        user_cart = UserCart.objects.create(user=user, product_id=product_id)

        return CreateUserCart(user_cart=user_cart)
    
class DelUserCart(graphene.Mutation):
    user_cart = graphene.Field(UserCartType)

    class Arguments:
        product_id = graphene.ID()

    def mutate(self, info, product_id):
        user = info.context.user

        if not user.is_authenticated:
            raise Exception('Authentication credentials were not provided.')

        user_cart = UserCart.objects.filter(user=user, product_id=product_id)[0]
        user_cart.delete()

        return DelUserCart(user_cart=user_cart)

class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    user_carts = graphene.List(UserCartType)

    def resolve_users(self, info):
        return get_user_model().objects.all()
    
    def resolve_user_carts(self, info):
        return UserCart.objects.all()
    
class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    create_user_cart = CreateUserCart.Field()
    del_user_cart = DelUserCart.Field()