from django.urls.conf import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(
    r"tasks",
    views.TaskViewSet,
)

urlpatterns = [
    path(
        "api/",
        include(router.urls),
    ),
    path(
        "todo",
        views.TodoView.as_view()
    )
]
