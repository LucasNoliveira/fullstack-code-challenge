from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .filters import CompanyFilter
from .models import Company
from .serializers import CompanySerializer
from .tasks import send_company_created_email, send_company_updated_email

class CompanyViewSet(viewsets.ModelViewSet):
    """
    CRUD for Company.

    list     GET    /companies/          → paginated, filterable
    create   POST   /companies/
    retrieve GET    /companies/{id}/
    update   PUT    /companies/{id}/
    partial  PATCH  /companies/{id}/
    destroy  DELETE /companies/{id}/
    """

    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = CompanyFilter
    search_fields = ["name", "contact_email", "description"]
    ordering_fields = ["name", "created_at", "status"]
    ordering = ["-created_at"]

    def get_queryset(self):
        return Company.objects.all().only(
            "id", "name", "contact_email", "status", "description", "created_at"
        )

    def get_serializer_class(self):
        return CompanySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        company = serializer.save()

        send_company_created_email.delay(
            company_id=str(company.id),
            company_name=company.name,
            recipient_email=company.contact_email,
        )

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers,
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        company = serializer.save()

        send_company_updated_email.delay(
            company_id=str(company.id),
            company_name=company.name,
            recipient_email=company.contact_email,
        )

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)