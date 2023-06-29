from rest_framework import generics,permissions,status
from .models import Group,GroupCategory,UserInGroup
from .serializers import GroupCategorySerializer,GroupSerializer,UserInGroupSerializer,RegUserInGroupSerializer,UserGroupsSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import  Response
from .permissions import IsAuthenticatedAndGroupOwner,IsAuthenticatedAndGroupMember
from user.models import User

# Create your views here.

# endpoint to list all the group categories
class ListGroupCategory(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = GroupCategory.objects.all()
    serializer_class = GroupCategorySerializer

# endpoint for a single category
class SingleCategory(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = GroupCategory.objects.all()
    serializer_class = GroupCategorySerializer

# endpoint to list or add group in a specific category
class ListGroupsInCategory(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = GroupSerializer

    def get_queryset(self):
        category_id = self.kwargs['pk']
        return Group.objects.filter(category = category_id )

#  endpoint to get Update or delete a single group
class SingleGroup(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticatedAndGroupOwner]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def get(self, request, *args, **kwargs):
        print('ggggggggggg')
        return super().get(request, *args, **kwargs)





# endpoint to list all members of a group
@api_view(['GET'])
@permission_classes([IsAuthenticatedAndGroupMember])
def groupMembers(request,pk):
    if request.method == 'GET':
        group = Group.objects.get(id = pk)
        usersingroup = group.members.all()
        print(request.data)
        serializer = UserInGroupSerializer(usersingroup, many = True)
    return Response(serializer.data)
       
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def joinGroup(request,pk):
    if request.method == 'POST':
        group = Group.objects.get(id = pk)
        data = {"user_id":request.user.id, "group_id":group.id}
        serializer = RegUserInGroupSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticatedAndGroupMember])
def leaveGroup(request,pk):
    if request.method == 'DELETE':
        joinRelation = UserInGroup.objects.get(user_id=request.user.id, group_id=pk)
        if joinRelation:
            joinRelation.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    

# endpoint to list all groups of a member
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def userGroups(request,pk):
    if request.method == 'GET':
        user = User.objects.get(id = pk)
        usergroups = user.joined_groups.all()
        serializer = UserGroupsSerializer(usergroups, many=True)
    return Response(serializer.data)