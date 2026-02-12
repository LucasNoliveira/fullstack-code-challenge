import uuid
from django.db import models

class Company(models.Model):
    class Status(models.TextChoices):
        READY = "ready", "Ready"
        IN_PROGRESS = "in_progress", "In Progress"
        DONE = "done", "Done"
        CANCELLED = "cancelled", "Cancelled"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    contact_email = models.EmailField(unique=True)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.READY
    )
    description = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Company"
        verbose_name_plural = "Companies"
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["name"]),
            models.Index(fields=["contact_email"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self):
        return self.name