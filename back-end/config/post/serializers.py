from rest_framework import serializers
from .models import Post, Vote, User, Group
from comment.serializers import CommentSerializer
from user.serializers import UserSerializer


class UserSerializerForPosts(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname', 'avatar', 'username', 'techbin']

class GroupSerializerForPosts(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"

class PostSerializer2(serializers.ModelSerializer):
    author = UserSerializerForPosts()
    group = GroupSerializerForPosts()
    class Meta:
        model = Post
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ("__all__")
