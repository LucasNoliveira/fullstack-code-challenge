from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .services import OTPService

from .serializers import RequestOTPSerializer, VerifyOTPSerializer

class RequestOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RequestOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            OTPService.request_otp(serializer.validated_data["email"])
        except ValueError as e:
            if str(e) == "rate_limited":
                return Response(
                    {"detail": "Please wait before requesting another OTP."},
                    status=status.HTTP_429_TOO_MANY_REQUESTS,
                )
            raise

        return Response(
            {"detail": "OTP sent successfully."},
            status=status.HTTP_200_OK,
        )
        
class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            tokens = OTPService.verify_otp(
                serializer.validated_data["email"],
                serializer.validated_data["otp"],
            )
        except ValueError as e:
            if str(e) in ["invalid_or_expired", "invalid_otp"]:
                return Response(
                    {"detail": "Invalid or expired OTP."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            raise

        return Response(tokens, status=status.HTTP_200_OK)

