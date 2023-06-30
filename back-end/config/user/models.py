from django.db import models
from django.contrib.auth.models import AbstractBaseUser

from .manager import CustomUserManager

class User(AbstractBaseUser):
    

    TYPE_CHOICES = [
        ('admin', 'Admin'),
        ('customer', 'Customer')
    ]
    GENDER_CHOICES = [
        ('m', 'Male'),
        ('f', 'Female'),
        ('notsay', 'Prefer Not to say')
    ]
 
    firstname = models.CharField(max_length=20)
    lastname = models.CharField(max_length=20)
    username = models.CharField(max_length=20, unique=True)
    email = models.EmailField(max_length=90, unique=True)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    dateofbirth = models.DateField(null = True, blank=True)
    techbin = models.IntegerField(default=0)
    bio = models.TextField(default="", null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_reset = models.BooleanField(default=False)


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    objects = CustomUserManager()


    def get_full_name(self):
        return self.email
    def get_short_name(self):
        return self.email
    def has_perm(self, perm, obj=None):
        return True
    def has_module_perms(self, app_label):
        return True
   



