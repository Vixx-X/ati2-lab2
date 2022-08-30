from datetime import datetime
from typing import Union
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from project.apps.todo.models import Task


class TaskSerializer(serializers.ModelSerializer):
    """
    Task serializer
    """

    date_completed = serializers.SerializerMethodField()

    def get_date_completed(self, obj) -> Union[datetime, None]:
        return obj.date_completed if obj.marked else None

    class Meta:
        model = Task
        fields = "__all__"
