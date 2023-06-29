from django.contrib import admin
from .models import Comment, Comment_Vote
# Register your models here.

admin.site.register(Comment)
admin.site.register(Comment_Vote)
