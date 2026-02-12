from celery import shared_task
from django.conf import settings
from django.core.mail import send_mail

@shared_task(
    bind=True,
    max_retries=3,
    default_retry_delay=60,
)
def send_company_created_email(self, company_id: str, company_name: str, recipient_email: str) -> None:
    try:
        send_mail(
            subject=f"Company '{company_name}' has been created",
            message=(
                f"Hello,\n\n"
                f"The company '{company_name}' (ID: {company_id}) has been successfully registered.\n\n"
                f"Best regards,\nThe Platform Team"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[recipient_email],
            fail_silently=False,
        )
    except Exception as exc:

        raise self.retry(exc=exc, countdown=2 ** self.request.retries * 60)


@shared_task(
    bind=True,
    max_retries=3,
    default_retry_delay=60,
)
def send_company_updated_email(self, company_id: str, company_name: str, recipient_email: str) -> None:
    try:
        send_mail(
            subject=f"Company '{company_name}' has been updated",
            message=(
                f"Hello,\n\n"
                f"The company '{company_name}' (ID: {company_id}) has been updated.\n\n"
                f"Best regards,\nThe Platform Team"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[recipient_email],
            fail_silently=False,
        )
    except Exception as exc:
        raise self.retry(exc=exc, countdown=2 ** self.request.retries * 60)
    
@shared_task(
    bind=True,
    max_retries=3,
    default_retry_delay=60,
)
def send_company_status_email(
    self,
    company_name: str,
    company_status: str,
    recipient_email: str,
) -> None:
    status_display = {
        "ready": "Ready",
        "in_progress": "In Progress",
        "done": "Done",
        "cancelled": "Cancelled",
    }.get(company_status, company_status)

    try:
        send_mail(
            subject=f"Status update for '{company_name}'",
            message=(
                f"Hello,\n\n"
                f"The current status of '{company_name}' is: {status_display}.\n\n"
                f"Best regards,\nThe Platform Team"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[recipient_email],
            fail_silently=False,
        )
    except Exception as exc:
        raise self.retry(exc=exc, countdown=2 ** self.request.retries * 60)