# Djnago Imports
from django.db import models
from django.contrib.auth.models import AbstractBaseUser


# Create your models here.

class User(AbstractBaseUser):
    


    username = models.CharField(max_length=20, unique=True)
    email = models.CharField(max_length=80, unique=True)

    USERNAME_FIELD = 'email'


