from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class UserCart(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    product = models.ForeignKey('products.Product', on_delete=models.CASCADE)
