from django.shortcuts import render, get_object_or_404
from .serializers import PostSerializer, VoteSerializer, PostSerializer2
from rest_framework.permissions import SAFE_METHODS, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions, AllowAny, IsAuthenticated
from .permissions import IsAuthorOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from .models import Post, Vote, User
from rest_framework import  generics
from django.http import Http404
from rest_framework.decorators import api_view,permission_classes

# ListCreateAPIView
class Post_list(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Post.objects.all()
    serializer_class = PostSerializer2

# RetrieveUpdateDestroyAPIView
class Post_details(generics.RetrieveAPIView):
    # premission_classes = [IsAuthorOrReadOnly]
    permission_classes =  (AllowAny, )
    queryset = Post.objects.all()
    serializer_class = PostSerializer2

class PostCreate(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]

class PostUpdate(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    # permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]
    permission_classes = [AllowAny]


class PostDelete(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]

class Like_list(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer


# endpoint to list all tha author posts
@api_view(['GET'])
@permission_classes([IsAuthorOrReadOnly])
def UserPosts(request,pk):
    if request.method == 'GET':
        try:
            owner = User.objects.get(id = pk)
            userPosts = owner.author_posts.all()
            print(request.data)
            serializer = PostSerializer2 (userPosts, many = True)
        except User.DoesNotExist:
            raise Http404("User not found")
    return Response(serializer.data, status=status.HTTP_200_OK)


