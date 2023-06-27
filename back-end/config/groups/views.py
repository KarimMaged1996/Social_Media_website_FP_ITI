from rest_framework import generics
from .models import Group,GroupCategory,UserInGroup
from .serializers import GroupCategorySerializer,GroupSerializer,UserInGroupSerializer,UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import  Response
from user.models import User
# Create your views here.

# endpoint to list all the group categories
class ListGroupCategory(generics.ListAPIView):
    queryset = GroupCategory.objects.all()
    serializer_class = GroupCategorySerializer

# endpoint for a single category
class SingleCategory(generics.RetrieveAPIView):
    queryset = GroupCategory.objects.all()
    serializer_class = GroupCategorySerializer

# endpoint to list or add group in a specific category
class ListGroupsInCategory(generics.ListCreateAPIView):
    serializer_class = GroupSerializer

    def get_queryset(self):
        category_id = self.kwargs['pk']
        return Group.objects.filter(category = category_id )

#  endpoint to get Update or delete a single group
class SingleGroup(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

# endpoint to list all members of a group
@api_view(['GET'])
def groupMembers(request,pk):
    if request.method == 'GET':
        group = Group.objects.get(id = pk)
        usersingroup = group.members.all()
        print(usersingroup.__dict__)
        serializer = UserInGroupSerializer(usersingroup, many = True)
    return Response(serializer.data)
       

    
    

