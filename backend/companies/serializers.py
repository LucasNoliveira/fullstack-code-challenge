from rest_framework import serializers

from .models import Company

class CompanySerializer(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = [
            "id",
            "name",
            "contact_email",
            "status",
            "description",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate_name(self, value: str) -> str:
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError(
                "Company name must be at least 2 characters."
            )
        return value

    def validate_contact_email(self, value: str) -> str:
        return value.lower().strip()