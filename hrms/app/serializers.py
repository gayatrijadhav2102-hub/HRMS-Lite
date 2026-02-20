from rest_framework import serializers
from .models import Employee
from .models import Attendance


class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = "__all__"

    def validate_employee_id(self, value):
        if Employee.objects.filter(employee_id=value).exists():
            raise serializers.ValidationError("Employee ID already exists.")
        return value

    def validate_email(self, value):
        if Employee.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def validate(self, data):
        required_fields = ["employeeid", "fullname", "email", "department"]

        for field in required_fields:
            if not data.get(field):
                raise serializers.ValidationError({field: "This field is required."})

        return data


class AttendanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attendance
        fields = "__all__"

    def validate(self, data):
        if not data.get("employee"):
            raise serializers.ValidationError({"employee": "Employee is required."})

        if not data.get("date"):
            raise serializers.ValidationError({"date": "Date is required."})

        return data

    def create(self, validated_data):
        employee = validated_data["employee"]
        date = validated_data["date"]

        if Attendance.objects.filter(employee=employee, date=date).exists():
            raise serializers.ValidationError(
                "Attendance already marked for this employee on this date."
            )

        return super().create(validated_data)
