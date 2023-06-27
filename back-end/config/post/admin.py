from django.contrib import admin
from .models import Post, Vote
# Register your models here.

admin.site.register(Post)
admin.site.register(Vote)


    #score = models.ManyToManyField(User, through='PostLikes', null=True, blank=True) # A ManyToMany field that tracks which users have liked the post
    # group = models.ForeignKey(Group, null=True, blank=True)
    
    # def likes_count(self):
    #     return self.score.count()
