from django.views.generic.base import TemplateView
from rest_framework import viewsets

from .serializers import TaskSerializer
from project.apps.todo.models import Task


class TaskViewSet(viewsets.ModelViewSet):
    """
    Entrypoint for tasks
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    ordering_fields = "__all__"
    ordering = ["date_created"]


class TodoView(TemplateView):
    """
    React base view
    """

    template_name = "index.html"
