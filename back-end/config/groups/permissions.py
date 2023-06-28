from rest_framework import permissions
from django.shortcuts import get_object_or_404
from .models import Group

class IsAuthenticatedAndGroupOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False
        # Check if the user is the group owner
        group_id = view.kwargs.get('pk')
        if group_id is not None:
            group = Group.objects.get(id=group_id)
            return group.owner == request.user
        return False
    
class IsAuthenticatedAndGroupMember(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False
        # Check if the user is a member of the group
        pk = view.kwargs.get('pk')
        group = get_object_or_404(Group, id=pk)
        return group.members.filter(user_id=request.user).exists()