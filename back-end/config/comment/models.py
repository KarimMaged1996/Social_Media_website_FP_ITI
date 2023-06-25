from django.db import models
from user.models import User
from post.models import Post
from django.urls import reverse
from django.dispatch import receiver
from django .conf import settings
from rest_framework.authtoken.models import Token

class Comment(models.Model):
    content = models.TextField(null=True) # The main content of the post
    author = models.ForeignKey(User , on_delete=models.CASCADE, related_name='posts') # The author of the post
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments') # The post
    created_at = models.DateTimeField(auto_now_add=True) # The date and time the post was created
    updated_at = models.DateTimeField(auto_now=True) # The date and time the post was last updated
    score = models.ManyToManyField(User, related_name='upvoted_posts', null=True, blank=True) # A ManyToMany field that tracks which users have liked the post

    def get_absolute_url(self):
        return reverse('post_detail', kwargs={'pk': self.pk}) # Returns the URL to the detail view of the post

class CommentLikes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} likes {self.comment.content}'
    # def __str__(self):
    #     return self.title






# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender, instance, created, **kwargs):
#     if created:
#         Token.objects.create(user=instance)