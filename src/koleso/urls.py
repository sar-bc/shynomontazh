from django.urls import path, re_path
from django.views.generic.base import TemplateView
from .views import *


urlpatterns = [
    path("robots.txt",TemplateView.as_view(template_name="koleso/robots.txt", content_type="text/plain"),
    ),
    path('', index, name='home'),
    path('services/', services, name='services'),
    path('price/', price, name='price'),
    path('contact/', contact, name='contact'),
    path('time_admin/', time_admin, name='time'),
    path('api/client/', CustAPIView.as_view()),
    re_path(r"^api/client/del/(?P<year>[0-9]{4})-(?P<month>[0-9]{2})-(?P<day>[0-9]{2})/(?P<del_id>[0-9]+)/$", CustAPIDel.as_view()),
    re_path(r"^api/client/(?P<year>[0-9]{4})-(?P<month>[0-9]{2})-(?P<day>[0-9]{2})/$", CustAPIView.as_view()),

    # re_path(r"^api/client/(?P<year>[0-9]{4})-(?P<month>[0-9]{2})-(?P<day>[0-9]{2})/<int:delete>/", CustAPIView.as_view()),
]
# [\w-]