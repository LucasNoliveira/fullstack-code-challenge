from backend.api.celery import shared_task
from django.core.mail import send_mail
from django.conf import settings

@shared_task(bind=True, max_retries=3)
def send_otp_email(self, email, otp):
    try:
        send_mail(
            subject="Your OTP Code",
            message=f"Your OTP code is: {otp}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
        )
    except Exception as exc:
        self.retry(exc=exc, countdown=5)
