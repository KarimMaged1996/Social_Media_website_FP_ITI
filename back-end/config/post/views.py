from django.shortcuts import render, get_object_or_404
from .serializers import PostSerializer, VoteSerializer
from rest_framework.permissions import SAFE_METHODS, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions, AllowAny, IsAuthenticated
from .permissions import IsAuthorOrReadOnly
from .models import Post, Vote
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
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer


# def add_vote(request, post_id):
#     post = get_object_or_404(Post, pk=post_id)
#     value = int(request.POST.get('value', 0))
#     vote = Vote.objects.filter(user=request.user, post=post).first()

#     if vote:
#         if vote.value == value:
#             vote.delete()
#         else:
#             vote.value = value
#             vote.save()
#     else:
#         Vote.objects.create(user=request.user, post=post, value=value)

#     post.update_score()


