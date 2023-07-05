from django.urls import path
from .views import (
    Post_list,
    Post_details,
    Like_list,
    UserPosts,
    PostCreate,
    PostUpdate,
    PostDelete,
    PostLikeCreate,
    PostLikeUpdate,
    PostLikeDelete,
    GroupPosts,
    check_post_vote,
    CurrentUserGroupsPosts,
    ListGroupPosts,
)


urlpatterns = [
    path("", Post_list.as_view(), name="postInfo"),
    path("<int:pk>", Post_details.as_view(), name="postdetails"),
    path("create", PostCreate.as_view(), name="postcreate"),
    path("update/<int:pk>", PostUpdate.as_view(), name="postupdate"),
    path("delete/<int:pk>", PostDelete.as_view(), name="postdelete"),
    path("likes", Like_list.as_view(), name="postlikes"),
    path("like/check/<int:post_id>/<int:user_id>", check_post_vote),
    path("like/create", PostLikeCreate.as_view(), name="postlikecreate"),
    path("like/update/<int:pk>", PostLikeUpdate.as_view(), name="postlikeupdate"),
    path("like/delete/<int:pk>", PostLikeDelete.as_view(), name="postlikedelete"),
    path("user_posts/<int:pk>/", UserPosts),
    path("group_posts/<int:pk>/", GroupPosts),
    path("user_groups_posts/", CurrentUserGroupsPosts),
    path("group_posts2/<int:pk>/", ListGroupPosts.as_view()),
]
