from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views as user_views

urlpatterns = [
    path('token/', user_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', user_views.Register.as_view(), name='register'),
    path('logout/', user_views.Logout.as_view(), name='logout'),
    path('activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/',  
        user_views.activate.as_view(), name='activate'),
    path('home/', user_views.HomePage.as_view(), name='homepage'),
    path('resetpassword/(?P<uid>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/', user_views.resetPassword, name='resetpassword'),
    path('resetpasswordlink/', user_views.getResetPasswordLink, name='resetpasswordlink'),
    path('myProfile/', user_views.myProfile, name='myProfile'),
    path('search/', user_views.search, name='search'),
    
]