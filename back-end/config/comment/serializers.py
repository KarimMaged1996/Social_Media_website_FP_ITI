from rest_framework import serializers
from .models import Comment, Comment_Vote


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

class CommentLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment_Vote
        fields = ("__all__")