from django.views.generic.base import TemplateView
from rest_framework import viewsets

from .serializers import TaskSerializer
from .models import Task
from .filters import TaskFilter


class TaskViewSet(viewsets.ModelViewSet):
    """
    Entrypoint for tasks
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    ordering_fields = "__all__"
    ordering = ["date_created"]
    filterset_class = TaskFilter
    search_fields = ["name", "description", "responsable"]


class TodoView(TemplateView):
    """
    React base view
    """

    template_name = "index.html"
