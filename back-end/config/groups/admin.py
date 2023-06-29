from django.contrib import admin
from .models import GroupCategory,Group,UserInGroup
# Register your models here.
admin.site.register(GroupCategory)
admin.site.register(Group)
admin.site.register(UserInGroup)