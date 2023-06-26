from rest_framework import serializers
from .models import GroupCategory, Group, UserInGroup

class GroupCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupCategory
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

class UserInGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInGroup
        fields = '__all__'