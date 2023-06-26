# Djnago Imports
from typing import Optional
from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager

# Create your models here.
class UserProfileManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        user =self.model(email=self.normalize_email(email),
        username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_staffuser(self, email,username, password=None):
        user = self.create_user(email,
        password=password,
        username=username
        )
        user.is_staff = True
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, username, password=None):
        user = self.create_user(email,
            password=password,
            username=username
            )
        user.is_staff =True
        user.is_admin =True
        user.is_active =True
        user.save(using=self._db)
        return user
 
    
class User(AbstractBaseUser):
    
    username = models.CharField(max_length=20, unique=True)
    email = models.CharField(max_length=80, unique=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['username',]
    objects = UserProfileManager()

    def get_full_name(self):
        return self.email
    def get_short_name(self):
        return self.email
    def has_perm(self, perm, obj=None):
        return True
    def has_module_perms(self, app_label):
        return True
   




