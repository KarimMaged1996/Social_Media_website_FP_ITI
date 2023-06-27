from django.urls import path 
from .views import Post_list,Post_details,Like_list,AuthorPost


urlpatterns=[
    
    path('', Post_list.as_view(), name='postInfo'),
    path('<int:pk>', Post_details.as_view(), name='postdetails'),
    path('likes', Like_list.as_view(), name='postlikes'),
    path('user_posts/<int:pk>/', AuthorPost),
]