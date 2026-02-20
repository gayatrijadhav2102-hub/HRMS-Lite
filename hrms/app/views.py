from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Employee
from .serializers import EmployeeSerializer
from app.models import Attendance
from app.serializers import AttendanceSerializer
from app.models import Employee


class EmployeeListCreateView(APIView):

    def get(self, request):
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(
            {"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )


class EmployeeDeleteView(APIView):

    def delete(self, request, employee_id):
        try:
            employee = Employee.objects.get(employee_id=employee_id)
            employee.delete()
            return Response(
                {"message": "Employee deleted successfully."},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Employee.DoesNotExist:
            return Response(
                {"error": "Employee not found."}, status=status.HTTP_404_NOT_FOUND
            )


class AttendanceCreateView(APIView):

    def post(self, request):
        serializer = AttendanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(
            {"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )


class AttendanceByEmployeeView(APIView):

    def get(self, request, employee_id):
        try:
            employee = Employee.objects.get(employee_id=employee_id)
        except Employee.DoesNotExist:
            return Response(
                {"error": "Employee not found."}, status=status.HTTP_404_NOT_FOUND
            )

        records = Attendance.objects.filter(employee=employee)
        serializer = AttendanceSerializer(records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
