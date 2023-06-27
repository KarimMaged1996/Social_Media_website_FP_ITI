from django.shortcuts import render
from .serializers import CommentSerializer, CommentLikesSerializer
from rest_framework.permissions import SAFE_METHODS, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions, AllowAny, IsAuthenticated
from post.permissions import IsAuthorOrReadOnly
from .models import Comment, Comment_Vote
from rest_framework import  generics


class Comment_list(generics.ListCreateAPIView):
    premission_classes = [IsAuthorOrReadOnly]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class Comment_details(generics.RetrieveUpdateDestroyAPIView):
    premission_classes = [IsAuthorOrReadOnly]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentLike_list(generics.ListCreateAPIView):
    premission_classes = [IsAuthenticated]
    queryset = Comment_Vote.objects.all()
    serializer_class = CommentLikesSerializer
