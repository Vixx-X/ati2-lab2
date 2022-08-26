from django_filters import rest_framework as filters
from django_filters.filters import BaseInFilter, ChoiceFilter

from .models import Task


class ImportanceFilter(BaseInFilter, ChoiceFilter):
    pass


class TaskFilter(filters.FilterSet):

    date_start = filters.DateFilter(
        field_name="date_created",
        lookup_expr="gte",
    )
    date_end = filters.DateFilter(
        field_name="date_created",
        lookup_expr="lte",
    )
    importance = ImportanceFilter(
        field_name="importance",
        lookup_expr="in",
        choices=Task.importance_choices,
    )

    class Meta:
        model = Task
        fields = ["marked"]
