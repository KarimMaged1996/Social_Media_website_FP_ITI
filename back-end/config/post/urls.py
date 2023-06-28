from django.urls import path 
from .views import Post_list,Post_details,Like_list,UserPosts, PostCreate, PostUpdate, PostDelete


urlpatterns=[
    
    path('', Post_list.as_view(), name='postInfo'),
    path('<int:pk>', Post_details.as_view(), name='postdetails'),
    path('create', PostCreate.as_view(), name='postcreate'),
    path('update/<int:pk>', PostUpdate.as_view(), name='postupdate'),
    path('delete/<int:pk>', PostDelete.as_view(), name='postdelete'),
    path('likes', Like_list.as_view(), name='postlikes'),
    path('user_posts/<int:pk>/', UserPosts),
]