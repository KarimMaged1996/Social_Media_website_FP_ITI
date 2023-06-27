from django.urls import path
from . import views

urlpatterns = [
    path('categories/',views.ListGroupCategory.as_view()),
    path('single_category/', views.SingleCategory.as_view()),
    path('category_groups/<int:pk>/', views.ListGroupsInCategory.as_view()),
    path('single_group/<int:pk>/',views.SingleGroup.as_view()),
    path('group_members/<int:pk>/', views.groupMembers)
]