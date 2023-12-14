from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView 
from . import views
from graphql_jwt.decorators import jwt_cookie
from users import views as user_views

urlpatterns = [
    path('', views.home, name='home'),

    path('user/', include('users.urls')),

    path('admin/', admin.site.urls),
    path('graphql/', jwt_cookie(csrf_exempt(GraphQLView.as_view(graphiql=True))))
]
