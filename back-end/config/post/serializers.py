from rest_framework import serializers
from .models import Post, Vote
from comment.serializers import CommentSerializer
from comment.models import Comment


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ("__all__")
