
import datetime
from django.contrib.auth.models import BaseUserManager


class CustomUserManager(BaseUserManager):

    def create_user(self, firstname, lastname, username, email, gender, is_active, dateofbirth, password=None):
        if not email:
            raise ValueError('User must have an email')
        
        user = self.model(email=self.normalize_email(email), 
                firstname=firstname,
                lastname=lastname,
                username=username, 
                dateofbirth=dateofbirth, 
                gender=gender, 
                is_active=is_active)
        user.set_password(password)
        user.save(using=self._db)

        return user
    

    def create_superuser(self, email, username, password=None):
        user = self.create_user(
            firstname='admin',
            lastname=username,
            username=username, 
            email=email, 
            gender='m', 
            is_active=True, 
            dateofbirth=datetime.datetime.now(), password=password)
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)

        return user