from django.db import models
from user.models import User
from group.models import Group
from django.urls import reverse
from django.db.models.signals import post_save
from django.dispatch import receiver
from django .conf import settings
from rest_framework.authtoken.models import Token

class Post(models.Model):
    title = models.CharField(max_length=255,null=True,blank=True) # The title of the post
    content = models.TextField(null=True) # The main content of the post
    author = models.ForeignKey(User , on_delete=models.CASCADE, related_name='posts') # The author of the post
    created_at = models.DateTimeField(auto_now_add=True) # The date and time the post was created
    updated_at = models.DateTimeField(auto_now=True) # The date and time the post was last updated
    image1 = models.ImageField(upload_to='media/post_images/', null=True, blank=True) # An optional image for the post
    image2 = models.ImageField(upload_to='media/post_images/', null=True, blank=True) # An optional image for the post
    image3 = models.ImageField(upload_to='media/post_images/', null=True, blank=True) # An optional image for the post
    image4 = models.ImageField(upload_to='media/post_images/', null=True, blank=True) # An optional image for the post
    video = models.FileField(upload_to='media/post_videos/', null=True, blank=True) # An optional video for the post
    score = models.ManyToManyField(User, related_name='upvoted_posts', null=True, blank=True) # A ManyToMany field that tracks which users have liked the post
    group = models.ForeignKey(Group, null=True, blank=True)

    def get_absolute_url(self):
        return reverse('post_detail', kwargs={'pk': self.pk}) # Returns the URL to the detail view of the post

class PostLikes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} likes {self.post.title}'
    # def __str__(self):
    #     return self.title






# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender, instance, created, **kwargs):
#     if created:
#         Token.objects.create(user=instance)