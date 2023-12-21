from django.db import models
from users.models import UserCart

# Create your models here.
class Product(models.Model):
    photo = models.ImageField(upload_to='products/')
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'