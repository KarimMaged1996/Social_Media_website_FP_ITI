from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        if validate_password(validated_data['password']) == None:
            password = make_password(validated_data['password'])
            user = User.objects.create(
                firstname=validated_data['firstname'],
                lastname=validated_data['lastname'],
                username=validated_data['username'],
                email=validated_data['email'],
                password=password,
                gender=validated_data['gender'],
                dateofbirth=validated_data['dateofbirth'],

            )
            return user