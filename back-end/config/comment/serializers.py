from rest_framework import serializers
from .models import Comment, Comment_Vote, User, Post

class UserSerializerForcomments(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname', 'avatar', 'username', 'techbin']

class PostSerializerForComments(serializers.ModelSerializer):
    class Meta:
        model = Post 
        fields = ['id', 'title', 'content']

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializerForcomments()
    post = PostSerializerForComments()
    class Meta:
        model = Comment
        fields = "__all__"

class CommentLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment_Vote
        fields = ("__all__")
