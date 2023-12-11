from django.db import models
from users.models import UserCart
from django.contrib.auth import get_user_model
from typing import Type

# Create your models here.
class Product(models.Model):
    photo = models.ImageField()
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.CharField(max_length=255)

    def product_user_carts(self, user):
        return UserCart.objects.filter(user=user, product=self).count()

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'