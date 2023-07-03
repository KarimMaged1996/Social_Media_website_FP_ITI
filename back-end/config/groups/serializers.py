from rest_framework import serializers
from .models import GroupCategory, Group, UserInGroup
from user.serializers import UserSerializer

class GroupCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupCategory
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class UserInGroupSerializer(serializers.ModelSerializer):
    user_id = UserSerializer()
    
    class Meta:
        model = UserInGroup
        fields = ['user_id']

class RegUserInGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInGroup
        fields = '__all__'

class UserGroupsSerializer(serializers.ModelSerializer):
    group_id = GroupSerializer()
    
    class Meta:
        model = UserInGroup
        fields = ['group_id']