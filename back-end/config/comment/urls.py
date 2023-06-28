from django.urls import path 
from .views import Comment_list,Comment_details,CommentLike_list, postcomments,usercomments, CommentCreate, CommentUpdate, CommentDelete


urlpatterns=[
    path('', Comment_list.as_view(), name='commentInfo'),
    path('<int:pk>', Comment_details.as_view(), name='commentdetails'),
    path('create', CommentCreate.as_view(), name='commentcreate'),
    path('update/<int:pk>', CommentUpdate.as_view(), name='commentupdate'),
    path('delete/<int:pk>', CommentDelete.as_view(), name='commentdelete'),
    path('likes', CommentLike_list.as_view(), name='commentlikes'),
    path('post_comments/<int:pk>/', postcomments),
    path('user_comments/<int:pk>/', usercomments),
]