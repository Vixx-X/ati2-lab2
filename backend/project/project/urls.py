""" Project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import redirect


def redirect_view(request):
    """
    Common redirect view
    """
    return redirect("/todo")


urlpatterns = [
    # admin
    path("admin/", admin.site.urls),
    # todo REST
    path(
        "",
        include(("project.apps.todo.urls", "project.apps.todo")),
    ),
    # redirect
    path(
        "",
        redirect_view,
        name="redirect",
    ),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
