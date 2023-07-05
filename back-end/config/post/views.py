from django.shortcuts import render, get_object_or_404
from .serializers import PostSerializer, VoteSerializer, PostSerializer2
from rest_framework.permissions import (
    SAFE_METHODS,
    IsAuthenticatedOrReadOnly,
    BasePermission,
    IsAdminUser,
    DjangoModelPermissions,
    AllowAny,
    IsAuthenticated,
)
from .permissions import IsAuthorOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from .models import Post, Vote, User, Group
from rest_framework import generics
from django.http import Http404
from rest_framework.decorators import api_view, permission_classes
from groups.models import UserInGroup


# ListCreateAPIView
class Post_list(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer2


# RetrieveUpdateDestroyAPIView
class Post_details(generics.RetrieveAPIView):
    premission_classes = [IsAuthorOrReadOnly]
    # permission_classes = (AllowAny,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer2


class PostCreate(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [AllowAny]


class PostUpdate(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]
    # permission_classes = [AllowAny]


class PostDelete(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]


class Like_list(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer


class PostLikeCreate(generics.CreateAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticated]
    # permission_classes = [IsAuthenticated]


class PostLikeUpdate(generics.UpdateAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    # permission_classes = [AllowAny]
    permission_classes = [IsAuthenticated]


class PostLikeDelete(generics.DestroyAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [AllowAny]
    permission_classes = [IsAuthenticated]


# endpoint to list all tha author posts
@api_view(["GET"])
@permission_classes([IsAuthorOrReadOnly])
def UserPosts(request, pk):
    if request.method == "GET":
        try:
            owner = User.objects.get(id=pk)
            userPosts = owner.author_posts.all().order_by("-created_at")
            print(request.data)
            serializer = PostSerializer2(userPosts, many=True)
        except User.DoesNotExist:
            raise Http404("User not found")
    return Response(serializer.data, status=status.HTTP_200_OK)


class ListGroupPosts(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer2

    def get_queryset(self):
        group_id = self.kwargs["pk"]
        return Post.objects.filter(group=group_id).order_by("-created_at")


# endpoint to list all tha group posts
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def GroupPosts(request, pk):
    if request.method == "GET":
        try:
            group = Group.objects.get(id=pk)
            groupPosts = group.group_posts.all().order_by("-created_at")
            print(request.data)
            serializer = PostSerializer2(groupPosts, many=True)
        except User.DoesNotExist:
            raise Http404("User not found")
    return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['GET'])
# def check_post_vote(request, post_id, user_id):
#     try:
#         # Try to retrieve the Comment_Vote record for the specified comment and user
#         vote = Vote.objects.get(post_id=post_id, user_id=user_id)

#         # If the value is 1, return 1 (upvote)
#         if vote.value == 1:
#             return Response({'result': 1})

#         # If the value is -1, return -1 (downvote)
#         elif vote.value == -1:
#             return Response({'result': -1})

#     except Vote.DoesNotExist:
#         # If the record doesn't exist, return 0
#         return Response({'result': 0})


@api_view(["GET"])
def check_post_vote(request, post_id, user_id):
    post_vote = get_object_or_404(Vote, post_id=post_id, user_id=user_id)
    data = {
        "id": post_vote.id,
        "user": post_vote.user.id,
        "post": post_vote.post.id,
        "value": post_vote.value,
        "created_at": post_vote.created_at,
    }
    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def CurrentUserGroupsPosts(request):
    if request.method == "GET":
        try:
            user = request.user
            user_member_groups = UserInGroup.objects.filter(user_id=user.id)
            user_groups = [group.group_id for group in user_member_groups]
            user_groups_posts = Post.objects.filter(group__in=user_groups).order_by(
                "-created_at"
            )
            serializer = PostSerializer2(user_groups_posts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            raise Http404("User not found")
