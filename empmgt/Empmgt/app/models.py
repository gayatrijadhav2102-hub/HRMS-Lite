from django.db import models


# Create your models here.
class Employee(models.Model):
    employeeid = models.CharField(max_length=20, unique=True)
    fullname = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employeeid} - {self.fullname}"


class Attendance(models.Model):

    STATUS_CHOICES = [("Present", "Present"), ("Absent", "Absent")]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)

    class Meta:
        unique_together = ("employee", "date")

    def __str__(self):
        return f"{self.employee.employeeid} - {self.date}"
