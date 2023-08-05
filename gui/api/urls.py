from django.urls import path
from .views import *

urlpatterns = [
    path('upload/', upload),
    path('hw/', holtWinters),
    path('view/', viewOnly)
]