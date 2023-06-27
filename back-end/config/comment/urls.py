from django.urls import path 
from .views import Comment_list,Comment_details,CommentLike_list, postcomments,usercomments


urlpatterns=[
    path('', Comment_list.as_view(), name='postInfo'),
    path('<int:pk>', Comment_details.as_view(), name='postdetails'),
    path('likes', CommentLike_list.as_view(), name='postlikes'),
    path('post_comments/<int:pk>/', postcomments),
    path('user_comments/<int:pk>/', usercomments),
]