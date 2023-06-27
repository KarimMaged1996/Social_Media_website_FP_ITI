from rest_framework import serializers
from .models import GroupCategory, Group, UserInGroup
from user.models import User

class GroupCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupCategory
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email','username','password']

class UserInGroupSerializer(serializers.ModelSerializer):
    user_id = UserSerializer()
    
    class Meta:
        model = UserInGroup
        fields = ['user_id']