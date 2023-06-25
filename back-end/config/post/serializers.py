from rest_framework import serializers
from .models import Post, PostLikes


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLikes
        fields = ("__all__")