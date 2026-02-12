import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService, type ApiError } from "../services/authService";
import { useAuth } from "../context/authContext";

interface UseVerifyOtpReturn {
  isLoading: boolean;
  error: string | null;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
}

export function useVerifyOtp(): UseVerifyOtpReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { saveTokens } = useAuth();
  const navigate = useNavigate();

  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const tokens = await authService.verifyOtp({ email, otp });
      saveTokens(tokens);
      navigate("/");
      return true;
    } catch (err) {
      const apiError = err as ApiError;
      setError(
        apiError.message ?? "Não foi possível verificar o código. Tente novamente.",
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, verifyOtp };
}