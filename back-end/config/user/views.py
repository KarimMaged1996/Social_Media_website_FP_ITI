# Django imports
from django.forms import ValidationError
from django.shortcuts import render
from django.contrib.auth.hashers import make_password, check_password


# DRF imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import SignupSerializer, UserSerializer, PasswordUpdateSerializer
from rest_framework.decorators import api_view
from django.contrib.sites.shortcuts import get_current_site  

from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string  
from .tokens import account_activation_token  , password_reset_token
from django.core.mail import EmailMessage 

from .models import User
# Create your views here.


class HomePage(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        content = {'msg': f"Authenticatied user {request.user}?P<uid>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20}"}

        return Response(content)



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
    
        email.send()
    
        
        
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


    
    id = urlsafe_base64_decode(uid).decode('utf-8')
 
    try:
        user = User.objects.get(pk=id)   
        passowrd = request.data.get('password', None)
        confrim_password = request.data.get('confirm_password', None)
        print(password_reset_token.check_token(user, token))
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
    
