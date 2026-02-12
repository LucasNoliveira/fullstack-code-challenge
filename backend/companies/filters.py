import django_filters

from .models import Company

class CompanyFilter(django_filters.FilterSet):
    """
    Supported query params:
        ?status=active
        ?name=acme           (case-insensitive contains)
        ?email=acme@test.com (case-insensitive contains)
        ?created_after=2024-01-01
        ?created_before=2025-01-01
    """

    name = django_filters.CharFilter(field_name="name", lookup_expr="icontains")
    email = django_filters.CharFilter(field_name="contact_email", lookup_expr="icontains")
    status = django_filters.ChoiceFilter(choices=Company.Status.choices)
    created_after = django_filters.DateFilter(field_name="created_at", lookup_expr="date__gte")
    created_before = django_filters.DateFilter(field_name="created_at", lookup_expr="date__lte")

    class Meta:
        model = Company
        fields = ["name", "contact_email", "status", "created_after", "created_before"]