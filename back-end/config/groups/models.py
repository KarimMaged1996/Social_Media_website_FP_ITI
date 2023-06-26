from django.db import models
import datetime
from user.models import User 

# Create your models here.
class GroupCategory(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField()

class Group(models.Model):
    name = models.CharField(max_length=150, unique=True)
    category = models.ForeignKey(GroupCategory, on_delete=models.CASCADE,
                                  related_name='groups')
    description = models.TextField()
    date_created = models.DateField(datetime.datetime.now())
    min_techbin = models.IntegerField(default=0)
    owner = models.ForeignKey(User, on_delete=models.CASCADE,
                              related_name='groups' )
    

class UserInGroup(models.Model):
    user_id = models.IntegerField()
    group_id = models.IntegerField()

    class Meta:
      unique_together = ['user_id','group_id']