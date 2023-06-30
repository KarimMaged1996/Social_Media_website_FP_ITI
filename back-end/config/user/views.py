# Django imports
from django.forms import ValidationError
from django.shortcuts import render
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.sites.shortcuts import get_current_site  
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string  
from .tokens import account_activation_token  , password_reset_token
from django.core.mail import EmailMessage 
from django.db.models import Q


# DRF imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes


# JWT imports
from rest_framework_simplejwt.views import TokenObtainPairView


# app Imports
from .models import User
from .serializers import SignupSerializer, UserSerializer, PasswordUpdateSerializer, MyTokenObtainPairSerializer
from post.models import Post
from post.serializers import PostSerializer
from groups.models import Group
from groups.serializers import GroupSerializer



# Create your views here.

class HomePage(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        user = User.objects.get(pk=request.user.pk)
        print(user)
        content = {
            "avatar": f"{get_current_site(request)}{user.avatar.url}"
        }

        return Response(content)

    def post(self, request):
        print(request.data['image'])
    
        user = User.objects.get(pk=request.user.id)
        print(user)
        user.avatar = request.FILES['image']
        user.save()
        return Response({"msg": "done"})



class Register(APIView):

    def post(self, request):
        password = request.data.get('password', None)
        confirm_password = request.data.get('confirm_password', None)
        if not password == confirm_password:
            return Response({'password_mismatch': 'Password fields did not match'}, status.HTTP_400_BAD_REQUEST)

        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = serializer.data
        
        current_site = get_current_site(request)  
        mail_subject = 'account activation'  
        message = render_to_string('acc_active_email.html', {  
            'user': user,  
            'domain': current_site.domain,  
            'uid':urlsafe_base64_encode(bytes(str(user.pk),'utf-8')),  
            'token':account_activation_token.make_token(user),  
        })  
        to_email = [user.email]
        email = EmailMessage(mail_subject, message, to=to_email)
        # email.send()
    
        return Response(data, status=status.HTTP_201_CREATED)



class Logout(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        


class activate(APIView):
    def get(self, request, uidb64, token):
        id = urlsafe_base64_decode(uidb64)
        id = id.decode('utf-8')
        try:
            user = User.objects.get(pk=id)
            if account_activation_token.check_token(user, token):
                user.is_active = True
                user.save()
                return Response({"msg": "Account Activated"}, status.HTTP_200_OK)

            
            return Response({"msg": "Account is already Activated"}, status.HTTP_200_OK)
            
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"msg": "Activation link is invalid"}, status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def getResetPasswordLink(request):

    email = request.data.get('email', None)

    if not email:
        return Response({"msg": "no email was provided"}, status.HTTP_400_BAD_REQUEST)
    
    try:
        user = User.objects.get(email=request.data['email'])
        user.is_reset = True
        user.save()
        token = password_reset_token.make_token(user)
        
        current_site = get_current_site(request)  
        mail_subject = 'Password Reset'  
        message = render_to_string('password_reset.html', {  
            'user': user,
            'domain': current_site.domain,  
            'uid':urlsafe_base64_encode(bytes(str(user.pk),'utf-8')),  
            'token': token  
        })  
        to_email = [user.email]
        email = EmailMessage(mail_subject, message, to=to_email)

        email.send()
        print(user.pk)
        uid = urlsafe_base64_encode(bytes(str(7),'utf-8'))
        print(uid, urlsafe_base64_decode(uid).decode('utf-8'))
        return Response({"msg": f"we have sent an reset link to {user.email}"})
    except Exception as e:
        return Response({"msg": f"{e}"}, status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['POST', 'GET'])
def resetPassword(request, uid, token):
    
    try:
        id = urlsafe_base64_decode(uid).decode('utf-8')

        user = User.objects.get(pk=id)   
        passowrd = request.data.get('password', None)
        confrim_password = request.data.get('confirm_password', None)
    
        if not password_reset_token.check_token(user, token):
            return Response({'msg': 'invalid link'}, status.HTTP_400_BAD_REQUEST)
        if not passowrd or not confrim_password:
            return Response({'msg': 'missing data'}, status.HTTP_400_BAD_REQUEST)
        if not passowrd == confrim_password:
            return Response({'msg': 'passowrds did not match'}, status.HTTP_400_BAD_REQUEST)
        
        serializer = PasswordUpdateSerializer(instance=user, data=request.data , partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response({"msg":"password was reset"})
        
    except Exception as e:
        return Response({"msg": e}, status.HTTP_500_INTERNAL_SERVER_ERROR)
    

    
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def myProfile(request):
    if request.method == 'GET':

        user = User.objects.get(pk=request.user.pk)
        serializer = UserSerializer(user)
        data = {
            "stauts" : 'Success',
            "data": serializer.data,
            'msg': 'The Requested User data'
        }
        return Response(data, status.HTTP_200_OK)
    
    if request.method == 'PUT':
        try:
            user = User.objects.get(pk=request.user.pk)
            print(request.data)
            serializer = UserSerializer(instance=user, data=request.data, partial=True, 
                    context={'current_site': get_current_site(request), 'request': request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            
            data = {
                "msg": 'success',
                'data': serializer.data
            }
            return Response(data, status.HTTP_200_OK)

        except Exception as e:
            return Response({"status": "fail", "msg": e}, status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def search(request):
    
    param = request.query_params.get('s')

    if param == None:
        return Response({'status': 'fail', 'msg': 'no params where sent'}, status.HTTP_204_NO_CONTENT)

    try:
        usersList = User.objects.filter(Q(username__icontains=param))
        users = UserSerializer(usersList, many=True)

        postList = Post.objects.filter(Q(title__icontains=param) | Q(content__icontains=param))
        posts = PostSerializer(postList, many=True)

        groupList = Group.objects.filter(Q(name__icontains=param))
        groups = GroupSerializer(groupList, many=True)

        result = {
            'status': 'success',
            'users': users.data,
            'posts': posts.data,
            'groups': groups.data
        }

        return Response({"msg":result})
    except Exception as e:
        return Response({'msg': e}, status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer