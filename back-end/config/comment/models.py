from django.db import models
from user.models import User
from post.models import Post
from django.urls import reverse
from django.dispatch import receiver
from django .conf import settings
from rest_framework.authtoken.models import Token
from django.db.models import Sum


class Comment(models.Model):
    content = models.TextField(null=True) # The main content of the post
    author = models.ForeignKey(User , on_delete=models.CASCADE, related_name='author_comments') # The author of the post
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='post_comments') # The post
    created_at = models.DateTimeField(auto_now_add=True) # The date and time the post was created
    updated_at = models.DateTimeField(auto_now=True) # The date and time the post was last updated
    score = models.IntegerField(default=0) # score which upvotes - downvotes 

    def get_absolute_url(self):
        return reverse('post_detail', kwargs={'pk': self.pk}) # Returns the URL to the detail view of the post

    def update_score(self):
        # gett the votes related to the post 
        self.score = Comment_Vote.objects.filter(post=self) # => this will result on a queryset of all the votes 
        print(self.score)
        # sum the column value 
        self.score = Comment_Vote.objects.filter(post=self).aggregate(Sum('value')) # => a dictionary of the {'value_sum': sum of the colume}
        print(self.score)
        #to get the value we have to bass the key which is ['value_sum']
        self.score = Comment_Vote.objects.filter(post=self).aggregate(Sum('value'))['value__sum'] or 0
        print(self.score)   
        self.save()


    def get_absolute_url(self):
        return reverse('post_detail', kwargs={'pk': self.pk}) # Returns the URL to the detail view of the post

class Comment_Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name="post_comments")
    value = models.IntegerField(choices=((1, 'Upvote'), (-1, 'Downvote')))
    created_at = models.DateTimeField(auto_now_add=True)


    # setting primary key
    class Meta:
        unique_together = ('user', 'post')

    # overidding the default save to run the post.update_score 
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.post.update_score()

    def __str__(self):
        return f'{self.user.username} {self.value} {self.post}'
    # def __str__(self):
    #     return self.title






# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender, instance, created, **kwargs):
#     if created:
#         Token.objects.create(user=instance)