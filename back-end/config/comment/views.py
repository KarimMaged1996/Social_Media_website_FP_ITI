from django.shortcuts import render
from django.shortcuts import get_object_or_404
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
    # permission_classes = [AllowAny]
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]

class CommentDelete(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer2
    # permission_classes = [AllowAny]
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]

class CommentLike_list(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    # permission_classes = [AllowAny]
    queryset = Comment_Vote.objects.all()
    serializer_class = CommentLikesSerializer

class CommentLikeCreate(generics.CreateAPIView):
    queryset = Comment_Vote.objects.all()
    serializer_class = CommentLikesSerializer
    # permission_classes = [AllowAny]
    permission_classes = [IsAuthenticated]

class CommentLikeUpdate(generics.UpdateAPIView):
    queryset = Comment_Vote.objects.all()
    serializer_class = CommentLikesSerializer
    # permission_classes = [AllowAny]
    permission_classes = [IsAuthenticated]

class CommentLikeDelete(generics.DestroyAPIView):
    queryset = Comment_Vote.objects.all()
    serializer_class = CommentLikesSerializer
    # permission_classes = [AllowAny]
    permission_classes = [IsAuthenticated]


# endpoint to list the comment votes 


# endpoint to list the post comments 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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


# @api_view(['GET'])
# def check_comment_vote(request, comment_id, user_id):
#     try:
#         # Try to retrieve the Comment_Vote record for the specified comment and user
#         vote = Comment_Vote.objects.get(comment_id=comment_id, user_id=user_id)

#         # If the value is 1, return 1 (upvote)
#         if vote.value == 1:
#             return Response({'result': 1})

#         # If the value is -1, return -1 (downvote)
#         elif vote.value == -1:
#             return Response({'result': -1})

#     except Comment_Vote.DoesNotExist:
#         # If the record doesn't exist, return 0
#         return Response({'result': 0})
    
@api_view(['GET'])
def check_comment_vote(request, comment_id, user_id):
    comment_vote = get_object_or_404(Comment_Vote, comment_id=comment_id, user_id=user_id)
    data = {
        'id': comment_vote.id,
        'user': comment_vote.user.id,
        'comment': comment_vote.comment.id,
        'value': comment_vote.value,
        'created_at': comment_vote.created_at
    }
    return Response(data)