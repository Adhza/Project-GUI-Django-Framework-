from django.urls import re_path, path, include
from .views import *

urlpatterns = [
    re_path(r'^$', index),
    path('api/', include('api.urls'))
]