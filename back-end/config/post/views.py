from django.shortcuts import render
from .serializers import PostSerializer, LikeSerializer
from rest_framework.permissions import SAFE_METHODS, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions, AllowAny, IsAuthenticated
from .permissions import IsAuthorOrReadOnly
from .models import Post, PostLikes
from rest_framework import  generics


class Post_list(generics.ListCreateAPIView):
    premission_classes = [IsAuthorOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class Post_details(generics.RetrieveUpdateDestroyAPIView):
    premission_classes = [IsAuthorOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class Like_list(generics.ListCreateAPIView):
    premission_classes = [IsAuthenticated]
    queryset = PostLikes.objects.all()
    serializer_class = LikeSerializer
