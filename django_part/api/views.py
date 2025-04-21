from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Car, Rental, RentalRequest
from .serializers import CarSerializer, RentalSerializer, RentalRequestSerializer

# FBV для списка машин
@api_view(['GET'])
def car_list(request):
    cars = Car.objects.filter(is_available=True)
    serializer = CarSerializer(cars, many=True)
    return Response(serializer.data)

# FBV для деталей машины
@api_view(['GET'])
def car_detail(request, pk):
    try:
        car = Car.objects.get(pk=pk)
        serializer = CarSerializer(car)
        return Response(serializer.data)
    except Car.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
# CBV через generics для создания запроса на аренду
class RentalRequestCreateView(generics.CreateAPIView):
    queryset = RentalRequest.objects.all()
    serializer_class = RentalRequestSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# CBV через generics для истории аренды
class RentalHistoryView(generics.ListAPIView):
    serializer_class = RentalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Rental.objects.filter(user=self.request.user)
    
# FBV для удаления аренды (пункт 7 CRUD)
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_rental(request, pk):
    try:
        rental = Rental.objects.get(pk=pk)
        rental.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Rental.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

# Новый CBV для списка всех запросов на аренду (только для админа)
class AdminRentalRequestListView(generics.ListAPIView):
    queryset = RentalRequest.objects.all()
    serializer_class = RentalRequestSerializer
    permission_classes = [IsAdminUser]

# Новый CBV для обновления статуса запроса (только для админа)
class AdminRentalRequestUpdateView(generics.UpdateAPIView):
    queryset = RentalRequest.objects.all()
    serializer_class = RentalRequestSerializer
    permission_classes = [IsAdminUser]
    http_method_names = ['patch']  # Разрешаем только PATCH-запросы

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

# # CBV для создания запроса на аренду
# class RentalRequestCreateView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         data = request.data
#         data['user'] = request.user.id
#         serializer = RentalRequestSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # CBV для истории аренды
# class RentalHistoryView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         rentals = Rental.objects.filter(user=request.user)
#         serializer = RentalSerializer(rentals, many=True)
#         return Response(serializer.data)