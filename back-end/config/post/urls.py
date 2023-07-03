from django.urls import path 
from .views import Post_list,Post_details,Like_list,UserPosts, PostCreate, PostUpdate, PostDelete,PostLikeCreate,PostLikeUpdate,PostLikeDelete


urlpatterns=[
    
    path('', Post_list.as_view(), name='postInfo'),
    path('<int:pk>', Post_details.as_view(), name='postdetails'),
    path('create', PostCreate.as_view(), name='postcreate'),
    path('update/<int:pk>', PostUpdate.as_view(), name='postupdate'),
    path('delete/<int:pk>', PostDelete.as_view(), name='postdelete'),
    path('likes', Like_list.as_view(), name='postlikes'),

    path('like/create', PostLikeCreate.as_view(), name='commentlikecreate'),
    path('like/update/<int:pk>', PostLikeUpdate.as_view(), name='commentlikeupdate'),
    path('like/delete/<int:pk>', PostLikeDelete.as_view(), name='commentlikedelete'),


    path('user_posts/<int:pk>/', UserPosts),
]