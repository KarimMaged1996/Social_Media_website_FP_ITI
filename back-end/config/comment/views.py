from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from .serializers import CommentSerializer, CommentLikesSerializer, CommentSerializer2
from rest_framework.permissions import SAFE_METHODS, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions, AllowAny, IsAuthenticated 
from post.permissions import IsAuthorOrReadOnly
from .models import Comment, Comment_Vote, Post, User
from rest_framework import  generics
from django.http import Http404
from rest_framework.decorators import api_view,permission_classes

class Comment_list(generics.ListAPIView):
    permission_classes = [IsAuthorOrReadOnly]
    queryset = Comment.objects.all().order_by('-created_at')
    serializer_class = CommentSerializer

class Comment_details(generics.RetrieveAPIView):
    permission_classes = [IsAuthorOrReadOnly]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentCreate(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer2
    permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated]

class CommentUpdate(generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer2
    permission_classes = [AllowAny]
    # permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]

class CommentDelete(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer2
    permission_classes = [AllowAny]

    # permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]


class CommentLike_list(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Comment_Vote.objects.all()
    serializer_class = CommentLikesSerializer


# endpoint to list the post comments 
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def postcomments(request,pk):
    if request.method == 'GET':
        try:
            post = Post.objects.get(id = pk)
            postcomments = post.post_comments.all().order_by('-created_at')
            print(request.data)
            serializer = CommentSerializer (postcomments, many = True)
        except Post.DoesNotExist:
            raise Http404("User not found")
    return Response(serializer.data, status=status.HTTP_200_OK)


# endpoint to list the user comments 
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def usercomments(request,pk):
    if request.method == 'GET':
        try:
            user = User.objects.get(id = pk)
            usercomments = user.author_comments.all()
            print(request.data)
            serializer = CommentSerializer (usercomments, many = True)
        except User.DoesNotExist:
            raise Http404("User not found")
    return Response(serializer.data, status=status.HTTP_200_OK)

