from django.shortcuts import render, get_object_or_404
from .serializers import PostSerializer, VoteSerializer
from rest_framework.permissions import SAFE_METHODS, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions, AllowAny, IsAuthenticated
from .permissions import IsAuthorOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from .models import Post, Vote, User
from rest_framework import  generics
from django.http import Http404
from rest_framework.decorators import api_view,permission_classes


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

# endpoint to list the post comments 
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def AuthorPost(request,pk):
    if request.method == 'GET':
        try:
            owner = User.objects.get(id = pk)
            userPosts = owner.author_posts.all()
            print(request.data)
            serializer = PostSerializer (userPosts, many = True)
        except User.DoesNotExist:
            raise Http404("User not found")
    return Response(serializer.data, status=status.HTTP_200_OK)





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


