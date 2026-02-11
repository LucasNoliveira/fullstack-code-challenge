import random
from datetime import timedelta

from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from django.db import transaction

from rest_framework_simplejwt.tokens import RefreshToken

from .models import EmailOTP

from .tasks import send_otp_email

User = get_user_model()

class OTPService:

    OTP_EXPIRATION_MINUTES = 5
    OTP_RATE_LIMIT_MINUTES = 1

    # Request OTP
    @classmethod
    def request_otp(cls, email: str) -> None:
        cls._check_rate_limit(email)

        otp = cls._generate_otp()

        cls._invalidate_previous_otps(email)

        cls._create_otp_record(email, otp)


        send_otp_email.delay(email, otp)


    @classmethod
    def _check_rate_limit(cls, email: str):
        recent = EmailOTP.objects.filter(
            email=email,
            created_at__gte=timezone.now() - timedelta(minutes=cls.OTP_RATE_LIMIT_MINUTES),
        ).exists()

        if recent:
            raise ValueError("rate_limited")

    @staticmethod
    def _generate_otp():
        return f"{random.randint(0, 999999):06d}"

    @staticmethod
    def _invalidate_previous_otps(email):
        EmailOTP.objects.filter(email=email, used=False).update(used=True)

    @classmethod
    def _create_otp_record(cls, email, otp):
        EmailOTP.objects.create(
            email=email,
            otp_hash=make_password(otp),
            expires_at=timezone.now() + timedelta(minutes=cls.OTP_EXPIRATION_MINUTES),
        )

    # Verify OTP
    @classmethod
    def verify_otp(cls, email: str, otp: str) -> dict:
        with transaction.atomic():
            otp_record = (
                EmailOTP.objects
                .select_for_update()
                .filter(
                    email=email,
                    used=False,
                    expires_at__gt=timezone.now(),
                )
                .order_by("-created_at")
                .first()
            )

            if not otp_record:
                raise ValueError("invalid_or_expired")

            if not check_password(otp, otp_record.otp_hash):
                raise ValueError("invalid_otp")

            otp_record.used = True
            otp_record.save(update_fields=["used"])

            user, _ = User.objects.get_or_create(
                username=email,
                defaults={"email": email},
            )

            refresh = RefreshToken.for_user(user)

            return {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
