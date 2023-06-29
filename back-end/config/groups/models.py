from django.db import models
import datetime
from user.models import User 

# Create your models here.
class GroupCategory(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField()

    def __str__(self):
        return self.name

class Group(models.Model):
    name = models.CharField(max_length=150, unique=True)
    category = models.ForeignKey(GroupCategory, on_delete=models.CASCADE,
                                  related_name='groups')
    description = models.TextField()
    date_created = models.DateField(default=datetime.datetime.now())
    min_techbin = models.IntegerField(default=0)
    owner = models.ForeignKey(User, on_delete=models.CASCADE,
                              related_name='groups' )
    
    def __str__(self):
        return self.name

class UserInGroup(models.Model):
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,related_name='joined_groups')
    group_id = models.ForeignKey(Group,on_delete=models.CASCADE, related_name='members')

    class Meta:
      unique_together = ['user_id','group_id']